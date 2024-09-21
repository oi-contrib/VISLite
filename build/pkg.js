const fs = require("fs")
const { rollup } = require('rollup')
const { minify } = require("terser")
const rollupConfig = require('./rollup.config.js')
const { error, log, warn } = require('oipage')
const package = require("../package.json")

let getFormat = (filename, format) => {
    if (filename == "index.ts") {
        return format
    } else {
        return "es"
    }
}

fs.writeFileSync("./docs/js/system.js", `window.VISLite_system = {
    "version": "${package.version}"
};`)

let banner = (bundleName) => `/*!
* ${bundleName}VISLite JavaScript Library v${package.version}
* ${package.repository.url}
*/`

error(`
> Rollup 打包
`)

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
                log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
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

    error(`
> Terser 压缩混淆
`)

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
            }

            minify(fs.readFileSync(sourceFile, "utf-8"), {
                toplevel: true,
            }).then((data) => {
                fs.writeFileSync(targetFile, data.code)

                log(`✔ [${index}] ${sourceFile} → ${targetFile}`)
                doTerser(index + 1)
            }).catch((e) => {
                console.log(e)
                error(`✘ [${index}] ${sourceFile} → ${targetFile} [3]`)
                reject()
            })

        })(0)

    }).then(() => {

        warn(`
✔ 完毕
`)

    }).catch((e) => {
        error(`
✘ 失败
`)
        console.log(e)
    })

}).catch((e) => {
    console.log(e)
})
