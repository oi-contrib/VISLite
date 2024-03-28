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
        example_canvas: './test/example/canvas/index.ts',
        example_svg: './test/example/svg/index.ts',
        example_eoap: './test/example/eoap/index.ts',
        example_animation: './test/example/animation/index.ts',
        example_cardinal: './test/example/cardinal/index.ts',
        example_help: './test/example/help/index.ts',
        "example_webgl-single": './test/example/webgl-single/index.ts',
        example_mercator: './test/example/mercator/index.ts',
        example_resizeObserver: './test/example/resizeObserver/index.ts',
        example_tree: './test/example/tree/index.ts',
        example_treeLayout: './test/example/treeLayout/index.ts',
        'example_webgl-shader': './test/example/webgl-shader/index.ts',

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
}