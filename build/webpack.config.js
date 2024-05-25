const { readdirSync } = require('fs');
const { join } = require("path");

// 用例测试
let example = {};
for (let item of readdirSync(join(__dirname, '../test/example'))) {
    example["example_" + item] = './test/example/' + item + '/index.ts';
}

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader'
                }]
            }, {
                test: /\.c$/,
                loader: './build/shader-loader.js'
            }
        ]
    },
    cache: false,
    entry: {

        // 用例测试
        ...example,

        // 基准测试
        benchmark: './test/benchmark/index.ts'

    },
    output: {
        filename: pathData => './test/' + pathData.chunk.name.replace(/\_/g, '/') + '/dist.js',

        // https://webpack.js.org/configuration/output/#outputenvironment
        environment: {
            arrowFunction: false, // 箭头函数
            const: false,
            optionalChaining: false, // obj?.a or obj?.()
            destructuring: false, // { a, b } = obj
            forOf: false, // for (const x of array) { ... }
        },
    },
    devServer: {
        static: './',
        port: 20000
    }
};