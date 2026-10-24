// 命令行参数解析
module.exports = function (argvs, shorts, isArray) {
    let result = {}, keyName = "args", value = [];
    if (isArray) result["value"] = [];

    let pushValue = function () {
        if (isArray && keyName !== "args") {
            result["value"].push({
                name: keyName,
                value
            });
        } else {
            result[keyName] = value;
        }
    };

    for (let index = 3; index < argvs.length; index++) {
        let argv = argvs[index];

        if (/^\-/.test(argv)) {
            pushValue();
            keyName = shorts[argv] || argv;
            value = [];
        } else {
            value.push(argv);
        }
    }
    pushValue();

    return result;
};