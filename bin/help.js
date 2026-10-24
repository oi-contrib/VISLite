const packageValue = require("../package.json");

module.exports = function () {
    console.log(`\x1b[36m
@vislite/cli@v${packageValue.version}

可以使用的命令如下：

【1】vislite-cli skills 关于内置skills相关操作
    --force|-f
        强制执行，如果目标地址已有内容，会直接强制删除已有内容
    --copy|-c [文件夹地址]
        复制到的skills文件夹地址
    （eg: vislite-cli skills --copy ./skills -f ）

\x1b[0m`);

};