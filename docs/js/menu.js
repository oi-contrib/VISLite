var currenNavName = "";

// 需要无菜单显示的模块
var FullViews = ['bigview'];

// 需要无导航显示的模块
var NoFixedViews = ['example'];

// 控制菜单显示隐藏
var menuVisibility = "hidden";
function toggleMenu() {
    menuVisibility = menuVisibility == 'hidden' ? 'visible' : 'hidden';

    document.body.setAttribute('menu-status', menuVisibility);

    var menuEl = document.getElementById("menu");
    var navEl = document.getElementById("nav");

    if (FullViews.indexOf(currenNavName) > -1) menuEl.style.left = "";
    animation(function (deep) {
        if (menuVisibility == 'hidden') {
            deep = 1 - deep;
        }

        navEl.style.left = (deep * 420 - 420) + "px";
        if (FullViews.indexOf(currenNavName) < 0) menuEl.style.left = (deep * 420 - 420) + "px";

    }, 400, function () {
        menuEl.style.left = "";
        navEl.style.left = "";
    });
}

var clickHidden = true;

// 页签切换
var navName = false;
function changeNav(_navName, isInit) {
    currenNavName = _navName;

    var menuEl = document.getElementById('menu');
    var docEl = document.getElementById('content');
    var fixedEl = document.getElementById("fixed");

    clickHidden = false;

    if (isInit) {
        window.__router[0] = _navName;
    } else {
        window.__router = [_navName];
    }

    if (navName) {
        document.getElementById('nav-' + navName).setAttribute('active', 'no');
    }
    navName = _navName;
    document.getElementById('nav-' + navName).setAttribute('active', 'yes');

    fetchData("./pages/" + navName + "/index.html").then(function (res) {
        window.location.href = "#/" + _navName;

        // 更新内容
        menuEl.innerHTML = res;

        if (FullViews.indexOf(_navName) > -1) {
            menuEl.setAttribute('fullview', 'yes');

            docEl.style.display = "none";
            docEl.innerHTML = "";

            fixedEl.style.display = "none";
            fixedEl.innerHTML = "";

            if (!isInit && document.documentElement.clientWidth <= 700) {
                toggleMenu();
            }

            $$initBigview();
        } else {
            menuEl.setAttribute('fullview', 'no');
            docEl.style.display = "";
            fixedEl.style.display = "";

            var spans = menuEl.getElementsByTagName('span'), i;

            var autoClickBtn;
            for (i = 0; i < spans.length; i++) {
                (function (i) {

                    // 如果有孩子，只需要控制菜单打开关闭即可
                    if (spans[i].parentElement.getElementsByTagName('li').length > 0) {

                        if (!spans[i].parentElement.getAttribute('is-open'))
                            spans[i].parentElement.setAttribute('is-open', 'no');

                        spans[i].addEventListener('click', function () {
                            spans[i].parentElement.setAttribute('is-open', spans[i].parentElement.getAttribute('is-open') == 'no' ? 'yes' : 'no');
                        });
                    }

                    // 否则就要控制打开关闭页面了
                    else {

                        if (spans[i].getAttribute('tag')) {
                            spans[i].addEventListener('click', function () {

                                var isOpenEl = spans[i];
                                while (isOpenEl) {
                                    if (isOpenEl.getAttribute('is-open')) {
                                        isOpenEl.setAttribute('is-open', 'yes');
                                    }
                                    isOpenEl = isOpenEl.parentElement;
                                }

                                // 打开页面
                                var tag = spans[i].getAttribute('tag');
                                window.__router[1] = tag;

                                fetchData("./pages/" + window.__router[0] + "/" + window.__router[1] + ".html").then(function (res) {
                                    window.location.href = "#/" + window.__router[0] + "/" + window.__router[1];

                                    if (clickHidden) {
                                        menuVisibility = "hidden";
                                        document.body.setAttribute('menu-status', menuVisibility);
                                    } else {
                                        clickHidden = true;
                                    }

                                    docEl.innerHTML = res + getFooterTemplate("docs/pages/" + window.__router[0] + "/" + window.__router[1] + ".html");
                                    window.doShader(docEl);

                                    docEl.scrollTop = 0;

                                    // 弹框
                                    var buttons = document.getElementsByTagName('button'), index;
                                    for (index = 0; index < buttons.length; index++) {
                                        (function (index) {
                                            var pageName = buttons[index].getAttribute('tag');
                                            var pageType = buttons[index].getAttribute('type');
                                            if (pageName) {

                                                buttons[index].addEventListener('click', function () {

                                                    // 解释说明
                                                    if (pageType == "explain") {
                                                        var explainEl = document.getElementById('explain-content-id');
                                                        fetchData("./explains/" + pageName + ".html").then(function (data) {
                                                            document.getElementById('explain-root').style.display = "block";
                                                            explainEl.innerHTML = data;

                                                            window.doShader(explainEl);

                                                            explainEl.scrollTop = 0;
                                                        });
                                                    }

                                                });
                                            }

                                        })(index);
                                    }

                                    // 例子
                                    var exampleEls = document.getElementsByTagName('example'), index;
                                    for (index = exampleEls.length - 1; index >= 0; index--) {
                                        (function (index) {
                                            var exampleEl = document.createElement("div");
                                            exampleEl.setAttribute("class", "example-view");

                                            var exampleRunHeight = exampleEls[index].getAttribute("height");
                                            var examplePath = exampleEls[index].getAttribute("tag");

                                            exampleEls[index].replaceWith(exampleEl);

                                            fetchData("./examples/" + examplePath + ".html").then(function (data) {

                                                // 运行区域
                                                var exampleViewEl = document.createElement("iframe");
                                                exampleEl.appendChild(exampleViewEl);

                                                exampleViewEl.style.height = exampleRunHeight;

                                                var exampleCodeEl, exampleCopyEl, exampleRunEl;

                                                // 打开/关闭 按钮
                                                var exampleToggleEl = document.createElement("div");
                                                exampleEl.appendChild(exampleToggleEl);

                                                exampleToggleEl.setAttribute("class", "toggle-btn");

                                                var exampleIsOpen = false;
                                                exampleToggleEl.innerText = "查看源码";
                                                exampleToggleEl.addEventListener("click", function () {
                                                    if (exampleIsOpen) {
                                                        exampleToggleEl.innerText = "查看源码";

                                                        exampleCodeEl.style.display = 'none';
                                                        exampleCopyEl.style.display = 'none';
                                                        exampleRunEl.style.display = 'none';

                                                    } else {
                                                        exampleToggleEl.innerText = "隐藏源码";

                                                        exampleCodeEl.style.display = 'block';
                                                        exampleCopyEl.style.display = 'block';
                                                        exampleRunEl.style.display = 'block';

                                                    }
                                                    exampleIsOpen = !exampleIsOpen;
                                                });

                                                // 代码区域
                                                exampleCodeEl = document.createElement("textarea");
                                                exampleEl.appendChild(exampleCodeEl);

                                                exampleCodeEl.setAttribute("spellcheck", false);
                                                exampleCodeEl.style.resize = "none";
                                                exampleCodeEl.value = data;

                                                // 复制按钮
                                                exampleCopyEl = document.createElement("button");
                                                exampleEl.appendChild(exampleCopyEl);

                                                exampleCopyEl.setAttribute('class', 'copy-btn');
                                                exampleCopyEl.innerText = "复制";

                                                exampleCopyEl.style.top = exampleRunHeight;

                                                exampleCopyEl.addEventListener("click", function () {
                                                    execCopy(exampleCodeEl.value, exampleCopyEl);
                                                });

                                                // 运行按钮
                                                exampleRunEl = document.createElement("button");
                                                exampleEl.appendChild(exampleRunEl);

                                                exampleRunEl.setAttribute('class', 'run-btn');
                                                exampleRunEl.innerText = "运行";

                                                exampleRunEl.style.top = exampleRunHeight;

                                                exampleRunEl.addEventListener("click", function () {
                                                    var iframeDocument = exampleViewEl.contentWindow.document;
                                                    iframeDocument.open();
                                                    iframeDocument.write(compilerImport(exampleCodeEl.value, window.needCache));
                                                    iframeDocument.close();
                                                });

                                                exampleRunEl.click();

                                            });

                                        })(index);
                                    }

                                    if (NoFixedViews.indexOf(_navName) > -1) {
                                        fixedEl.style.display = "none"
                                        fixedEl.innerHTML = "";

                                        docEl.setAttribute('fullview', 'yes');
                                    } else {
                                        fixedEl.style.display = ""
                                        fixedEl.innerHTML = "<h1>导航</h1>";

                                        docEl.setAttribute('fullview', 'no');

                                        // 分析fixed
                                        var els = docEl.children;
                                        for (index = 0; index < els.length; index++) {
                                            (function (index) {

                                                if (["H2", "H3", "H4", "H5"].indexOf(els[index].nodeName) > -1) {

                                                    var fixedItemEl = document.createElement(els[index].nodeName);
                                                    fixedEl.appendChild(fixedItemEl);
                                                    fixedItemEl.innerHTML = els[index].innerHTML;
                                                    fixedItemEl.addEventListener('click', function () {

                                                        var offsetTop = els[index].offsetTop;
                                                        var currentScrollTop = docEl.scrollTop || 0;

                                                        animation(function (deep) {
                                                            docEl.scrollTop = (offsetTop - currentScrollTop) * deep + currentScrollTop;
                                                        }, 500, function () {
                                                            docEl.scrollTop = offsetTop;
                                                        });

                                                    });

                                                }
                                            })(index);
                                        }
                                    }
                                });

                            });

                            // 如果是第一个或者路由记录的
                            if (!autoClickBtn || window.__router[1] == spans[i].getAttribute('tag')) {
                                autoClickBtn = spans[i];
                            }
                        }
                    }

                })(i);
            }

            // 初始化主动点击
            if (autoClickBtn) autoClickBtn.click();
        }
    });

}