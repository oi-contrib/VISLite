export default function (_this, drawImage) {
    return function (imgUrl, x, y, w, h) {
        return new Promise((resolve) => {
            if (/^http/.test(imgUrl)) {
                uni.downloadFile({
                    url: imgUrl,
                    success: function (res) {
                        drawImage.call(_this, res.tempFilePath, x, y, w, h, true).then(() => {
                            resolve({});
                        });
                    },
                });
            } else {
                drawImage.call(_this, imgUrl, x, y, w, h, true).then(() => {
                    resolve({});
                });
            }
        });
    };
};