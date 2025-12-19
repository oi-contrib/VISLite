const fs = require("fs")
const path = require("path")
const { rollup } = require('rollup')
const { minify } = require("terser")
const rollupConfig = require('./rollup.config.js')
const package = require("../package.json")

let getFormat = (filename, format) => {
    if (filename == "index.ts") {
        return format
    } else {
        return "es"
    }
}

fs.writeFileSync(path.join("./types/module.d.ts"), `// VISLite 模块定义 （程序自动生成，请勿修改）
`);
function createModule(bundlename, filename) {
    fs.appendFileSync(path.join("./types/module.d.ts"), `
declare module "vislite/lib/${bundlename}/${filename}.js"{
    import ${bundlename} from "vislite/lib/${bundlename}/${filename}"
    export default ${bundlename}
}
`);
}

fs.writeFileSync("./docs/js/system.js", `window.VISLite_system = {
    "version": "${package.version}"
};`)

let banner = (bundleName) => `/*!
* ${bundleName}VISLite JavaScript Library v${package.version}
* ${package.repository.url}
*/`

console.log(`\x1b[31m
> Rollup 打包
\x1b[0m`)

let sourceFiles = fs.readdirSync("./package")
new Promise((resolve, reject) => {
    (function doRollup(index) {
        if (index >= sourceFiles.length) {
            resolve()
            return
        }
        let folder = sourceFiles[index]

        let isMainBundle = folder == 'index.ts'
        let folderPath = isMainBundle ? "" : (folder + "/")

        let sourceFile = "./package/" + folderPath + "index.ts"
        let targetFile = "./lib/" + folderPath + "index." + getFormat(folder, rollupConfig.output.format) + ".js"

        rollup({
            input: sourceFile,
            plugins: rollupConfig.plugins
        }).then(bundle => {
            bundle.write({
                name: "VISLite",
                format: getFormat(folder, rollupConfig.output.format),
                banner: banner(isMainBundle ? "" : (folder + " of ")),
                file: targetFile
            }).then(() => {
                console.log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
                doRollup(index + 1)
            }).catch((e) => {
                console.log(e)
                reject(`✘ [${index}] ${sourceFile} → ${targetFile} [2]`)
            })
        }).catch((e) => {
            console.log(e)
            reject(`✘ [${index}] ${sourceFile} → ${targetFile} [1]`)
        })
    })(0)
}).then((msg) => {

    console.log(`\x1b[31m
> Terser 压缩混淆
\x1b[0m`)

    new Promise((resolve, reject) => {

        (function doTerser(index) {
            if (index >= sourceFiles.length) {
                resolve()
                return
            }

            let folder = sourceFiles[index]

            let folderPath = folder == 'index.ts' ? "" : (folder + "/")

            let sourceFile = "./lib/" + folderPath + "index." + getFormat(folder, rollupConfig.output.format) + ".js"
            let targetFile = "./lib/" + folderPath + "index." + getFormat(folder, rollupConfig.output.format) + ".min.js"

            // 准备types文件
            if (folder != 'index.ts') {

                let typesCode = `import { ${folder} } from "../../types/index"

export default ${folder}`

                fs.writeFileSync("./lib/" + folderPath + "index." + getFormat(folder, rollupConfig.output.format) + ".d.ts", typesCode)
                fs.writeFileSync("./lib/" + folderPath + "index." + getFormat(folder, rollupConfig.output.format) + ".min.d.ts", typesCode)

                createModule(folder, "index.es")
                createModule(folder, "index.es.min")
            }

            minify(fs.readFileSync(sourceFile, "utf-8"), {
                toplevel: true,
            }).then((data) => {
                fs.writeFileSync(targetFile, data.code)

                console.log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
                doTerser(index + 1)
            }).catch((e) => {
                console.log(e)
                error(`\x1b[31m✘ [${index}] ${sourceFile} → ${targetFile} [3]\x1b[0m`)
                reject()
            })

        })(0)

    }).then(() => {

        console.log(`
✔ 完毕
`)

    }).catch((e) => {
        console.log(`\x1b[31m
✘ 失败
\x1b[0m`)
        console.log(e)
    })

}).catch((e) => {
    console.log(e)
})
