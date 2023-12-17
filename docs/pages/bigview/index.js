(function (window, undefined) {

    // 记录例子列表
    var examples = ["databoard"];

    // 当前显示的例子序号
    var current = -1;

    var dosEls = [];
    window.$$initBigview = function () {
        var index;

        var displaysEl = document.getElementById('displays-id');
        var dotsEl = document.getElementById('dots-id');

        for (index = 0; index < examples.length; index++) {

            dosEls[index] = document.createElement('span');
            dosEls[index].setAttribute('active', 'no');
            dosEls[index].setAttribute('title', '点击我切换显示的大屏');
            dosEls[index].innerText = index + 1;

            (function (index) {
                dosEls[index].addEventListener("click", function () {

                    window.location.href = "#/bigview?page=" + examples[index];
                    window.__query.page = examples[index];

                    fetchData("./bigviews/" + examples[index] + "/index.html").then(function (data) {

                        if (current != -1) {
                            dosEls[current].setAttribute('active', 'no');
                        }

                        current = index;
                        dosEls[current].setAttribute('active', 'yes');

                        displaysEl.innerHTML = "";

                        var runViewEl = document.createElement("iframe");
                        displaysEl.appendChild(runViewEl);

                        var iframeDocument = runViewEl.contentWindow.document;
                        iframeDocument.open();
                        iframeDocument.write(compilerImport(data, window.needCache));
                        iframeDocument.close();

                    });

                });
            })(index);

            dotsEl.appendChild(dosEls[index]);
        }

        var urlIndex = examples.indexOf(window.__query.page);
        dosEls[urlIndex > -1 ? urlIndex : 0].click();
    }
})(window);