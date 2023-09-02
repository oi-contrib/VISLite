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
                loader: 'ts-loader'
            }, {
                test: /\.c$/,
                loader: './build/shader-loader.js'
            }
        ]
    },
    cache: false,
    entry: {

        // 用例测试
        canvas: './test/canvas/index.ts',
        svg: './test/svg/index.ts',
        eoap: './test/eoap/index.ts',
        animation: './test/animation/index.ts',
        cardinal: './test/cardinal/index.ts',
        help: './test/help/index.ts',
        webgl: './test/webgl/index.ts',
        "webgl-single": './test/webgl-single/index.ts',
        mercator: './test/mercator/index.ts',
        resizeObserver: './test/resizeObserver/index.ts',
        tree: './test/tree/index.ts',
        treeLayout: './test/treeLayout/index.ts',
        'webgl-shader': './test/webgl-shader/index.ts',

        // 基准测试
        benchmark: './test/benchmark/index.ts'

    },
    output: {
        filename: pathData => './test/' + pathData.chunk.name + '/dist.js'
    },
    devServer: {
        static: './',
        port: 20000
    }
}