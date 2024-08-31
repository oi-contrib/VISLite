let _painter;

Page({
    data: {

    },
    onLoad() {
        this.selectComponent('#mycanvas').fetch().then(painter => {
            // console.log(painter)

            _painter = painter;

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

        })
    },
    doit(event) {

        // {"name":string,"x":number,"y":number}
        // console.log(event.detail);

        _painter.getRegion(event.detail.x, event.detail.y).then(function (regionName) {
            console.log("点击的区域：" + regionName);
        });

    }
})
