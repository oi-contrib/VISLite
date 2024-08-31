export default function (_this, drawImage, canvas) {
    return function (imgUrl, x, y, w, h) {
        return new Promise((resolve) => {

            let doit = (imgsrc) => {
                if (canvas.createImage) {
                    let img = canvas.createImage();
                    img.onload = function () {
                        drawImage.call(_this, img, x, y, w, h, true).then(() => {
                            resolve({});
                        });
                    };
                    img.src = imgsrc;
                }

                // 低版本兼容
                else {
                    drawImage.call(_this, imgsrc, x, y, w, h, true).then(() => {
                        resolve({});
                    });
                }
            };

            if (/^http/.test(imgUrl)) {
                my.downloadFile({
                    url: imgUrl,
                    success: function (res) {
                        doit(res.tempFilePath);
                    },
                })
            } else {
                doit(imgUrl);
            }
        });
    };
};