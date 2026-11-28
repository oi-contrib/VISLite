const { join } = require("path");
const { readdirSync, existsSync } = require("fs");
const { copyDisk } = require("oipage/nodejs/disk/index");

module.exports = function (config) {
    let isForce = false;

    // 判断是否开启强制执行
    for (let i = 0; i < config.value.length; i++) {
        if (config.value[i].name === "--force") isForce = true;
    }

    // 执行一个个任务
    for (let i = 0; i < config.value.length; i++) {

        // 复制
        if (config.value[i].name === "--copy") {

            for (let skillName of readdirSync(join(__dirname, "../skills"))) {
                copyDisk(join(__dirname, "../skills", skillName), join(process.cwd(), config.value[i].value[0], skillName), isForce);
            }

        }

    }

};