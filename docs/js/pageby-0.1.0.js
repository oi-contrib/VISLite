(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.pageby = factory());
})(this, (function () { 'use strict';

    // 等待DOM加载完毕执行
    function onReady (callback) {
        var readyState = document.readyState;
        if (readyState === 'interactive' || readyState === 'complete') {
            callback();
        } else {
            window.addEventListener("DOMContentLoaded", callback);
        }
    }

    var normalize = "/* 统一不同浏览器的基础样式 *//* 防止iPhone在坚屏转向横屏时放大文字 */\n html{\n\n-ms-text-size-adjust: 100%;\n\n-webkit-text-size-adjust: 100%;\n/* 统一行高 */\nline-height: 1.15;\n\n}\n/* 兼容部分手机下border不显示问题 */\n button, input{\n\nborder: 1px solid #b2b2bd;\n\n}\n/* 修正旧浏览器未定义的块级元素 */\n article, footer, header, nav, section{\n\ndisplay: block;\n\n}\n/* 修正旧浏览器未定义的行内块元素 */\n canvas, svg{\n\ndisplay: inline-block;\n\n}\n/* 统一不同浏览器盒子尺寸计算方法 */\n *{\n\nbox-sizing: border-box;\n\n}\n/* 去掉IE浏览器输入框叉叉和眼睛 */\n ::-ms-clear, ::-ms-reveal{\n\ndisplay: none;\n\n}\n/* 针对火狐浏览器在img标签没有src时候的差异修复 */\n img{\n\ndisplay: inline-block;\n\n}\n/* 设置默认字体为统一的安全字体 */\n html{\n\nfont-family: sans-serif;\n\n}\n/* 默认去掉下划线 */\n a{\n\ntext-decoration: none;\n\n}\n/* 去掉前置索引 */\n li{\n\nlist-style-type: none;\n\n}\n/* 去掉不喜欢的间距 */\n ul, ol, li, p, h1, h2, h3, h4, h5, h6{\n\n-webkit-margin-before: 0;\n\n-webkit-margin-after: 0;\n\n-webkit-padding-start: 0;\n/* 去掉不喜欢的间距，针对火狐浏览器等 */\nmargin-block-end: 0;\n\nmargin-block-start: 0;\n\npadding-inline-start: 0;\n/* 修改IE和其它浏览器不一致问题 */\npadding: 0;\n\nmargin: 0;\n\n}\n/* 去掉默认的8px */\n body{\n\nmargin: 0;\n\n}\n/* 设置默认表格边框合并为一个单一的边框 */\n table{\n\nborder-collapse: collapse;\n\n}\n";

    var style = "\n/* // 代码着色器\r */\n\n .pageby-pre{\n\noutline: 1px solid #d3d3d4;\n\n}\n\n .pageby-pre:hover{\n\noutline-color: black;\n\n}\n\n/* // 复制按钮\r */\n\n .pageby-pre>.copy-icon{\n\noutline: none;\n\n}\n\n .pageby-pre>.copy-icon[copied]{\n\noutline: 1px solid #343848;\n\nborder-radius: 0 4px 4px 0;\n\n}\n\n .pageby-pre>.copy-icon[copied]:before{\n\nposition: absolute;\n\nleft: -64px;\n\ntop: -1px;\n\ndisplay: block;\n\nborder-radius: 4px 0 0 4px;\n\nwidth: 64px;\n\ntext-align: center;\n\nfont-size: 12px;\n\nfont-weight: 500;\n\ncolor: #ffffff;\n\nbackground-color: #343848;\n\nwhite-space: nowrap;\n\ncontent: attr(data-before);\n\nheight: 32px;\n\nline-height: 32px;\n\n}\n\n .pageby-pre>.copy-icon[copied='no']{\n\noutline: 1px solid #ff0000;\n\n}\n\n .pageby-pre>.copy-icon[copied='no']:before{\n\nbackground-color: #ff0000;\n\n}\n";

    onReady(function () {
        var styleEl = document.createElement("style");
        styleEl.innerHTML = normalize + "\n" + style;

        var headEl = document.getElementsByTagName("head")[0];
        headEl.insertBefore(styleEl, headEl.childNodes[0]);
    });

    var colors$2 = {
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#9e9e9e",/*符号颜色*/
        "selector": "#1e50b3",/*选择器*/
        "attrKey": "#1e83b1",/*属性名称颜色*/
        "attrValue": "#ac4c1e"/*属性值颜色*/
    };

    function cssShader (textString) {
        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 1:选择器 tag
        // 2:属性名 attr
        // 3:属性值 string
        var state = "tag";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {
                shaderArray.push({
                    color: {
                        tag: colors$2.selector,
                        attr: colors$2.attrKey,
                        string: colors$2.attrValue
                    }[state],
                    content: template
                });
            }

            template = "";
        };

        while (true) {

            /* 1.注释 */

            if (nextNValue(2) == '/*') {

                initTemplate();
                while (nextNValue(2) !== '*/' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors$2.annotation,
                    content: template + nextNValue(2)
                });
                i += 2;
                template = "";

            }

            /* 2.字符串 */

            else if (["'", '"'].indexOf(nextNValue(1)) > -1) {

                var strBorder = nextNValue(1);
                initTemplate();

                do {
                    template += textString[i++];
                } while (nextNValue(1) != strBorder && i < textString.length)

                // 因为可能是没有字符导致的结束
                if (nextNValue(1) != strBorder) {
                    strBorder = "";
                } else {
                    i += 1;
                }

                shaderArray.push({
                    color: colors$2.attrValue,
                    content: template + strBorder
                });
                template = "";

            }

            /* 3.边界 */

            else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {

                initTemplate();
                shaderArray.push({
                    color: colors$2.insign,
                    content: nextNValue(1)
                });
                template = "";

                if (nextNValue(1) == '{' || nextNValue(1) == ';') {
                    state = 'attr';
                } else if (nextNValue(1) == '}') {
                    state = 'tag';
                } else {
                    state = 'string';
                }

                i += 1;
            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }
        return shaderArray;
    }

    var colors$1 = {
        "text": "#000000",/*文本颜色*/
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#9e9e9e",/*符号颜色*/
        "key": "#ff0000",/*关键字颜色*/
        "string": "#ac4c1e",/*字符串颜色*/
        "funName": "#1e50b3",/*函数名称颜色*/
        "execName": "#1e83b1"/*执行方法颜色*/
    };

    // JS关键字
    var keyWords = [
        "abstract", "arguments", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "debugger", "default", "delete", "do",
        "double", "else", "enum", "eval", "export",
        "extends", "false", "final", "finally", "float",
        "for", "function", "goto", "if", "implements",
        "import", "in", "instanceof", "int", "interface",
        "let", "long", "native", "new", "null",
        "package", "private", "protected", "public", "return",
        "short", "static", "super", "switch", "synchronized",
        "this", "throw", "throws", "transient", "true",
        "try", "typeof", "var", "void", "volatile",
        "while", "with", "yield"
    ];

    function javascriptShader (textString) {
        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {

                // 考虑开始的(
                if (template[0] == '(') {
                    shaderArray.push({
                        color: colors$1.insign,
                        content: "("
                    });
                    template = template.substring(1);
                }

                shaderArray.push({
                    color: colors$1.text,
                    content: template
                });
            }

            template = "";
        };

        while (true) {

            /* 1.注释1 */

            if (nextNValue(2) == '/*') {

                initTemplate();
                while (nextNValue(2) !== '*/' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors$1.annotation,
                    content: template + nextNValue(2)
                });
                i += 2;
                template = "";

            }

            /* 2.注释2 */

            else if (nextNValue(2) == '//') {
                initTemplate();
                while (nextNValue(1) !== '\n' && i < textString.length) {
                    template += textString[i++];
                }
                shaderArray.push({
                    color: colors$1.annotation,
                    content: template
                });
                template = "";
            }

            /* 3.字符串 */

            else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

                var strBorder = nextNValue(1);
                initTemplate();

                do {
                    template += textString[i++];
                } while (nextNValue(1) != strBorder && i < textString.length)

                // 因为可能是没有字符导致的结束
                if (nextNValue(1) != strBorder) {
                    strBorder = "";
                } else {
                    i += 1;
                }

                shaderArray.push({
                    color: colors$1.string,
                    content: template + strBorder
                });
                template = "";

            }


            /* 4.函数定义 */

            else if (nextNValue(1) == '(' && (template[0] == ' ' || (i - template.length - 1 >= 0 && textString[i - template.length - 1] == " "))) {
                shaderArray.push({
                    color: colors$1.funName,
                    content: template
                });
                i += 1;
                template = "(";

            }

            /* 5.方法调用 */

            else if (nextNValue(1) == '(') {

                shaderArray.push({
                    color: colors$1.execName,
                    content: template
                });
                i += 1;
                template = "(";
            }

            /* 6.边界 */

            else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {

                initTemplate();
                shaderArray.push({
                    color: colors$1.insign,
                    content: nextNValue(1)
                });
                template = "";
                i += 1;
            }

            /* 7.关键字 */

            else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {

                shaderArray.push({
                    color: colors$1.key,
                    content: template + " "
                });
                template = "";
                i += 1;

            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }

        return shaderArray;
    }

    var colors = {
        "text": "#000000",/*文本颜色*/
        "annotation": "#6a9955",/*注释颜色*/
        "insign": "#9e9e9e",/*符号颜色*/
        "node": "#1e50b3",/*结点颜色*/
        "attrKey": "#1e83b1",/*属性名称颜色*/
        "attrValue": "#ac4c1e"/*属性值颜色*/
    };

    function htmlShader (textString) {
        textString = textString.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var shaderArray = [];

        // 当前面对的
        var i = 0;

        // 获取往后n个值
        var nextNValue = function (n) {
            return textString.substring(i, n + i > textString.length ? textString.length : n + i);
        };

        var template = "";

        // 初始化模板，开始文本捕获
        var initTemplate = function () {
            if (template != "") {
                shaderArray.push({
                    color: colors.text,
                    content: template
                });
            }

            template = "";
        };

        // 匹配属性值模板
        var getAttrValueTemplate = function () {
            var endStr = " ";
            // 寻找属性值边界
            if (nextNValue(1) == '"') endStr = '"';
            if (nextNValue(1) == "'") endStr = "'";

            // 到达边界前一直寻找下一个
            do {
                template += textString[i++];
            } while (nextNValue(1) != endStr && i < textString.length);

            // 如果是匹配成功而不是匹配到末尾
            if (endStr != " " && i < textString.length) {
                template += endStr;
                i += 1;
            }

            shaderArray.push({
                color: colors.attrValue,
                content: template
            });
            template = "";
        };

        while (true) {

            /* 1.注释 */

            if (nextNValue(4) == '<!--') {

                initTemplate();
                while (nextNValue(3) !== '-->' && i < textString.length) {
                    template += textString[i++];
                }

                shaderArray.push({
                    color: colors.annotation,
                    content: template + nextNValue(3)
                });
                i += 3;
                template = "";

            }

            /* 2.</ */

            else if (nextNValue(2) == '</') {

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "</"
                });
                i += 2;

                while (nextNValue(1) !== '>' && i < textString.length) {
                    template += textString[i++];
                }

                if (template != "") {
                    shaderArray.push({
                        color: colors.node,
                        content: template
                    });
                    template = "";

                    if (i < textString.length) {
                        shaderArray.push({
                            color: colors.insign,
                            content: ">"
                        });
                        i += 1;
                    }

                }
            }

            /* 3.< */

            else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

                var specialTag = "";

                initTemplate();
                shaderArray.push({
                    color: colors.insign,
                    content: "<"
                });
                i += 1;

                // 寻找标签名称
                while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                    template += textString[i++];
                }
                if (template != '') {

                    // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
                    if (template == "style" || template == 'script') {
                        specialTag = "</" + template + ">";
                    }

                    shaderArray.push({
                        color: colors.node,
                        content: template
                    });

                    template = '';
                    if (i < textString.length) {

                        // 寻找标签属性
                        while (i < textString.length) {

                            // 遇到这个表示标签结束了
                            // 也就意味着标签匹配结束
                            if (nextNValue(1) == ">") {

                                initTemplate();
                                shaderArray.push({
                                    color: colors.insign,
                                    content: ">"
                                });
                                i += 1;
                                break;
                            }

                            // 如果是空格，表示是属性之间，接着查看下一个即可
                            else if (nextNValue(1) != ' ') {

                                initTemplate();

                                // 匹配属性名称
                                if (nextNValue(1) != '"' && nextNValue(1) != "'") {

                                    // 如果不是=或>和空格就继续
                                    while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                                        template += textString[i++];
                                    }
                                    if (template != "") {
                                        shaderArray.push({
                                            color: colors.attrKey,
                                            content: template
                                        });
                                        template = "";

                                        // 如果下一个是=，就接着找属性值
                                        if (nextNValue(1) == '=') {
                                            shaderArray.push({
                                                color: colors.insign,
                                                content: "="
                                            });
                                            i += 1;


                                            if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                                                // 寻找属性值
                                                getAttrValueTemplate();

                                            }
                                        }
                                    } else {
                                        template += textString[i++];
                                    }
                                } else if (nextNValue(1) == '=') {
                                    shaderArray.push({
                                        color: colors.insign,
                                        content: "="
                                    });
                                    i += 1;
                                } else {
                                    if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                        getAttrValueTemplate();

                                    }
                                }

                            } else {
                                template += textString[i++];
                            }

                        }

                    }

                }

                if (specialTag != "") {

                    var oldI = i, oldTemplate = template, langHelp, innerShaderArray;
                    while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                        template += textString[i++];
                    }

                    if (i < textString.length) {

                        langHelp = specialTag.replace(/<\//, '');

                        innerShaderArray = {
                            "style>": cssShader,
                            "script>": javascriptShader
                        }[langHelp](template);

                        innerShaderArray.forEach(function (innerShader) {
                            shaderArray.push(innerShader);
                        });

                        template = "";
                    } else {
                        template = oldTemplate;
                        i = oldI;
                    }

                }

            }

            /* 追加字符 */

            else {
                if (i >= textString.length) {
                    initTemplate();
                    break;
                } else {
                    template += textString[i++];
                }
            }

        }

        for (i = 0; i < shaderArray.length; i++) {
            shaderArray[i].content = shaderArray[i].content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        return shaderArray;
    }

    var copyImage = "data:image/png;base64,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";

    // 修改样式
    function setStyle (el, styles) {
        for (var key in styles) {
            el.style[key] = styles[key];
        }
    }

    var copyString = function (source, prompt) {
        var textareaEl = document.createElement('textarea');
        textareaEl.innerHTML = source;

        document.body.appendChild(textareaEl);
        textareaEl.select();

        try {
            var result = window.document.execCommand("copy", false, null);

            if (result) {
                prompt(true);
            } else {
                prompt(false);
            }
        } catch (e) {
            prompt(false);
            console.error(e);
        }

        document.body.removeChild(textareaEl);
    };

    // 对特殊转义符号等进行校对
    var replaceCode = function (source) {
        return source
            .replace(/\&amp;/g, '&')
            .replace(/\&lt;/g, '<')
            .replace(/\&gt;/g, '>');
    };

    function doShader (el) {
        var preEls = el.getElementsByTagName('pre');
        for (var i = preEls.length - 1; i > -1; i--) {
            (function (i) {
                var shaderJSON = null;
                var source = replaceCode(preEls[i].innerHTML.trim());

                switch (preEls[i].getAttribute('tag')) {
                    case "html": {
                        shaderJSON = htmlShader(source);
                        break
                    }
                    case "css": {
                        shaderJSON = cssShader(source);
                        break
                    }
                    case "javascript": {
                        shaderJSON = javascriptShader(source);
                        break
                    }
                    default: {
                        shaderJSON = [{
                            color: "black",
                            content: source
                        }];
                    }
                }

                if (shaderJSON) {
                    var targetEl = document.createElement("div");
                    preEls[i].parentNode.replaceChild(targetEl, preEls[i]);

                    setStyle(targetEl, {
                        padding: "10px",
                        fontSize: "13px",
                        fontFamily: "monospace",
                        fontWeight: "400",
                        lineHeight: "20px",
                        position: "relative",
                        overflow: "auto"
                    });

                    targetEl.setAttribute("class", "pageby-pre");

                    var preEl = document.createElement("pre");
                    targetEl.appendChild(preEl);

                    for (var j = 0; j < shaderJSON.length; j++) {
                        var itemEl = document.createElement('span');
                        preEl.appendChild(itemEl);

                        itemEl.style.color = shaderJSON[j].color;
                        itemEl.innerText = replaceCode(shaderJSON[j].content);
                    }

                    setStyle(preEl, {
                        margin: "0"
                    });

                    var copyEl = document.createElement('button');
                    targetEl.appendChild(copyEl);

                    copyEl.setAttribute('class', 'copy-icon');

                    setStyle(copyEl, {
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        backgroundImage: "url(" + copyImage + ")",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% auto",
                        backgroundColor: "transparent",
                        border: "none",
                    });

                    copyEl.addEventListener("click", function () {
                        var filterEl = document.createElement('div');
                        filterEl.innerHTML = preEl.innerHTML.replace(/\<br\>/g, '\n');

                        copyString(filterEl.innerText, function (isOk) {
                            copyEl.setAttribute("copied", isOk ? "yes" : "no");
                            copyEl.setAttribute('data-before', isOk ? "复制成功" : "复制失败");
                            setTimeout(function () {
                                copyEl.removeAttribute("copied");
                                copyEl.removeAttribute('data-before');
                                copyEl.blur();
                            }, 700);
                        });

                    });

                }
            })(i);
        }

    }

    function doUrl () {
        var temp = (window.location.hash + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split("?");

        var routerTemp = temp[0].split('/');
        var paramTemp = (window.location.search.replace(/^\?/, "") + (temp[1] ? ("&" + temp[1]) : "")).replace(/^\&/, "");

        var paramResult, paramArray;
        if (paramTemp == "") {
            paramResult = {};
        } else {
            paramArray = paramTemp.split("&"), paramResult = {};
            paramArray.forEach(function (item) {
                var temp = item.split("=");
                paramResult[temp[0]] = decodeURIComponent(temp[1]);
            });
        }

        var resultData = {
            router: routerTemp[0] == '' ? [] : routerTemp,
            params: paramResult,
            origin: window.location.origin
        };

        return resultData;
    }

    var index = {
        shader: doShader,
        url: doUrl
    };

    return index;

}));
