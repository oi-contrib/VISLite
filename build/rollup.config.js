const typescript = require('@rollup/plugin-typescript')
const tsconfig = require('../tsconfig.json')
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")

tsconfig.compilerOptions.sourceMap = false
tsconfig.compilerOptions.removeComments = true

module.exports = {
    output: {
        format: "umd"
    },
    plugins: [
        typescript(tsconfig),
        pluginNodeResolve(),
        pluginCommonjs(),
        (function () {
            return {
                transform(source, path) {
                    if (/\.c$/.test(path)) {
                        return require('./shader-loader.js')(source)
                    } return
                }
            }
        })()
    ]
}
