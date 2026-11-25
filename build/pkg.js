const fs = require("fs")
const path = require("path")
const { rollup } = require('rollup')
const { minify } = require("terser")
const rollupConfig = require('./rollup.config.js')
const packageJson = require("../package.json")

let banner = (bundleName) => `/*!
* ${bundleName}VISLite JavaScript Library v${packageJson.version}
* ${packageJson.repository.url}
*/`

// package/ 下每个子目录是一个对外模块；index.ts 与 index.esm.ts 是两个入口文件
const moduleDirs = fs.readdirSync("./package", { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()

// 两个入口：index.ts 只导出默认聚合对象（UMD 全局必须是 VISLite.Canvas 这种结构），
// index.esm.ts 追加具名导出，供 `import { Canvas } from "vislite"` 与摇树使用
const entries = [
    {
        input: "./package/index.ts",
        file: "./lib/index.umd.js",
        format: "umd",
        name: "VISLite",
        banner: banner("")
    },
    {
        input: "./package/index.esm.ts",
        file: "./lib/index.es.js",
        format: "es",
        exports: "named",
        banner: banner("")
    }
]

// 生成 types/module.d.ts（供 "vislite/lib/xxx/index.es.js" 这种单独引入时使用）
fs.writeFileSync(path.join("./types/module.d.ts"), `// VISLite 模块定义 （程序自动生成，请勿修改）
`)
function createModule(bundlename, filename) {
    fs.appendFileSync(path.join("./types/module.d.ts"), `
declare module "vislite/lib/${bundlename}/${filename}.js"{
    import ${bundlename} from "vislite/lib/${bundlename}/${filename}"
    export default ${bundlename}
}
`)
}

fs.writeFileSync("./docs/js/system.js", `window.VISLite_system = {
    "version": "${packageJson.version}"
};`)

console.log(`\x1b[31m
> Rollup 打包
\x1b[0m`)

async function buildEntry(entry) {
    const bundle = await rollup({
        input: entry.input,
        plugins: rollupConfig.plugins
    })

    await bundle.write({
        name: entry.name,
        format: entry.format,
        exports: entry.exports,
        banner: entry.banner,
        file: entry.file
    })

    console.log(`✔ ${entry.input} → ${entry.file}`)
}

async function buildModule(folder, index) {
    let sourceFile = "./package/" + folder + "/index.ts"
    let targetFile = "./lib/" + folder + "/index.es.js"

    const bundle = await rollup({
        input: sourceFile,
        plugins: rollupConfig.plugins
    })

    await bundle.write({
        name: "VISLite",
        format: "es",
        banner: banner(folder + " of "),
        file: targetFile
    })

    console.log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
}

async function build() {
    for (let index = 0; index < moduleDirs.length; index++) {
        await buildModule(moduleDirs[index], index)
    }

    for (let index = 0; index < entries.length; index++) {
        await buildEntry(entries[index])
    }
}

async function compress() {
    console.log(`\x1b[31m
> Terser 压缩混淆
\x1b[0m`)

    for (let index = 0; index < moduleDirs.length; index++) {
        let folder = moduleDirs[index]
        let sourceFile = "./lib/" + folder + "/index.es.js"
        let targetFile = "./lib/" + folder + "/index.es.min.js"

        // 准备types文件
        let typesCode = `import { ${folder} } from "../../types/index"

export default ${folder}`

        fs.writeFileSync("./lib/" + folder + "/index.es.d.ts", typesCode)
        fs.writeFileSync("./lib/" + folder + "/index.es.min.d.ts", typesCode)

        createModule(folder, "index.es")
        createModule(folder, "index.es.min")

        const data = await minify(fs.readFileSync(sourceFile, "utf-8"), {
            toplevel: true,
        })

        fs.writeFileSync(targetFile, data.code)

        console.log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
    }

    // 主入口只压缩 UMD；index.es.js 保持可读，交给使用方构建工具处理
    const umdData = await minify(fs.readFileSync("./lib/index.umd.js", "utf-8"), {
        toplevel: true,
    })
    fs.writeFileSync("./lib/index.umd.min.js", umdData.code)
    console.log(`✔ ./lib/index.umd.js → ./lib/index.umd.min.js`)
}

build().then(compress).then(() => {
    console.log(`
✔ 完毕
`)
}).catch((e) => {
    console.log(`\x1b[31m
✘ 失败
\x1b[0m`)
    console.error(e)
    process.exitCode = 1
})
