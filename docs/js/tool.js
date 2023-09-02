//当前正在运动的动画的tick函数堆栈
var $timers = [];
//唯一定时器的定时间隔
var $interval = 13;
//指定了动画时长duration默认值
var $speeds = 400;
//定时器ID
var $timerId = null;

// 动画轮播
function animation(doback, duration, callback) {

    // 如果没有传递时间，使用内置默认值
    if (arguments.length < 2) duration = $speeds;

    var clock = {
        //把tick函数推入堆栈
        "timer": function (tick, duration, callback) {
            if (!tick) {
                throw new Error('Tick is required!');
            }
            var id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
            $timers.push({
                "id": id,
                "createTime": new Date(),
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            clock.start();
            return id;
        },

        //开启唯一的定时器timerId
        "start": function () {
            if (!$timerId) {
                $timerId = setInterval(clock.tick, $interval);
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function () {
            var createTime, flag, tick, callback, timer, duration, passTime, needStop,
                timers = $timers;
            $timers = [];
            $timers.length = 0;
            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag];
                createTime = timer.createTime;
                tick = timer.tick;
                duration = timer.duration;
                callback = timer.callback;
                needStop = false;

                //执行
                passTime = (+new Date() - createTime) / duration;
                if (passTime >= 1) {
                    needStop = true;
                }
                passTime = passTime > 1 ? 1 : passTime;
                tick(passTime);
                if (passTime < 1 && timer.id) {
                    //动画没有结束再添加
                    $timers.push(timer);
                } else if (callback) {
                    callback(passTime);
                }
            }
            if ($timers.length <= 0) {
                clock.stop();
            }
        },

        //停止定时器，重置timerId=null
        "stop": function () {
            if ($timerId) {
                clearInterval($timerId);
                $timerId = null;
            }
        }
    };

    var id = clock.timer(function (deep) {
        //其中deep为0-1，表示改变的程度
        doback(deep);
    }, duration, callback);

    // 返回一个函数
    // 用于在动画结束前结束动画
    return function () {
        var i;
        for (i in $timers) {
            if ($timers[i].id == id) {
                $timers[i].id = undefined;
                return;
            }
        }
    };

}

// 在新页签打开
function openBlankPage(url) {
    var el = document.createElement('a');
    el.setAttribute("target", "_blank");
    el.setAttribute("href", url);
    el.click();
}

// 请求数据
function fetchData(url) {
    return new Promise(function (resolve, reject) {
        var cacheData = sessionStorage.getItem("cache://" + url);
        if (window.needCache && cacheData) {
            resolve(cacheData);
        } else {
            fetch(url, {
                method: "GET"
            }).then(function (res) {
                if (res.status === 200) {
                    return res.text();
                } else {
                    return Promise.reject(res.json());
                }
            }).then(function (res) {

                if (window.needCache) {
                    sessionStorage.setItem("cache://" + url, res);
                }

                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        }
    });
}

// 复制到剪切板
function execCopy(source) {
    var textareaEl = document.createElement('textarea');
    textareaEl.innerHTML = source;

    document.body.appendChild(textareaEl);
    textareaEl.select();

    try {
        var result = window.document.execCommand("copy", false, null);

        if (result) {
            alert('复制成功');
        } else {
            alert('复制失败');
        }
    } catch (e) {
        alert('复制失败');
        console.error(e);
    }

    document.body.removeChild(textareaEl);
}

function compilerImport(source, isOnline) {
    var execResult = /import *\{([^}]+)\} *from *(["'])vislite\2;?/.exec(source);
    if (!execResult) {
        return source;
    }

    // 根据开发环境和生产环境区别lib地址
    var libSrc = isOnline ? "https://unpkg.com/vislite@" + window.VISLite_system.version + "/lib/" : "../lib/";

    var items = execResult[1].trim().split(","), item, index, importCode = "";
    for (index = 0; index < items.length; index++) {
        item = items[index].trim();

        importCode += "import '" + libSrc + item + "/index.umd.js';var " + item + " = window.VISLite_" + item + ";\n"
    }

    return source.replace(execResult[0], importCode);
}

// 生成底部统一内容
function getFooterTemplate(path) {
    path = "https://github.com/oi-contrib/VISLite/edit/master/" + path;
    return '<br /><a class="to-editor-btn" href="' + path + '" target="_blank"><svg fill="currentColor" height="20" width="20" viewBox="0 0 40 40" class="iconEdit_Z9Sw" aria-hidden="true"><g><path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path></g></svg>在 GitHub 上编辑此页</a>';
}