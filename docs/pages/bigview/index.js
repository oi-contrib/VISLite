(function (window, undefined) {
    window.$$initBigview = function () {
        fetchData("./bigviews/index.html").then(function (data) {
            var runViewEl = document.createElement("iframe");
            document.getElementById("displays-id").appendChild(runViewEl);

            var iframeDocument = runViewEl.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(compilerImport(data, window.needCache));
            iframeDocument.close();

        });
    };
})(window);