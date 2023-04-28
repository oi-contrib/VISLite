const typescript = require('@rollup/plugin-typescript')
const tsconfig = require('../tsconfig.json')

tsconfig.compilerOptions.sourceMap = false
tsconfig.compilerOptions.removeComments = true

module.exports = {
    output: {
        format: "umd"
    },
    plugins: [
        typescript(tsconfig)
    ]
};
