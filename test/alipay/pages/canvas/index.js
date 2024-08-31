Page({
    doit(detail) {
        console.log(detail)
    },
    onReady() {
        this.$selectComponent("#mycanvas").fetch().then(painter => {

            painter.setRegion('线性渐变');

            painter
                .config({
                    fillStyle: painter
                        .createLinearGradient(0, 0, 200, 200)
                        .setColor(0, 'white')
                        .setColor(1, 'green')
                        .value(),
                })
                .fillCircle(100, 100, 100);

            // painter.toDataURL().then(base64 => {
            //     console.log(base64);
            // });

            painter.drawImage("https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/mp-xhs-qrcode.png", 150, 150, 100, 100);

        });
    }
});
