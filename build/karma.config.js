
// 下列配置项解释：
// https://zxl20070701.github.io/notebook/#/program/course/test/karma/config

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../test/unit/**/*.spec.ts'
        ],
        exclude: [
            '../test/data/**/*',
            '../docs/**/*',
            '../uni-app/**/*',
            '../miniprogram/**/*',
            './**/*',
            '../types/**/*'
        ],
        preprocessors: {
            '../**/*.ts': ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: require('./webpack.config.js')
    })
}