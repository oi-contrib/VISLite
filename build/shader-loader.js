// 着色器加载程序
module.exports = function (source) {
    return `export default ${JSON.stringify(source)}`
}