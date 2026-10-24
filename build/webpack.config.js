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
    watchOptions: {
        // 彻底忽略不需要监听的目录
        ignored: [
            'node_modules',
            'dist',
            '.git',
            'build'
        ],
        aggregateTimeout: 500, // 延迟编译，减少频繁触发
        poll: false
    },
    devServer: {
        static: {
            directory: join(__dirname, '../'),
            watch: false
        },
        port: 20000,
        hot: true,
        compress: true,
        // 只监听业务代码目录，不监听根目录所有文件
        watchFiles: [
            join(__dirname, '../src'),
            join(__dirname, '../test/example'),
            join(__dirname, '../test/benchmark')
        ],
        // 关闭 devMiddleware 多余文件监听
        devMiddleware: {
            stats: 'errors-warnings'
        }
    }
};