<template>
    <view class="view">
        <ui-canvas ref="mycanvas" :width="350" :height="700" @dotouchstart="doit"></ui-canvas>
    </view>
</template>

<script>
import uiCanvas from 'vislite/uni-app/ui-canvas.vue';

let _painter;
export default {
    data() {
        return {};
    },
    methods: {
        doit(region) {
            console.log(region)
        }
    },
    mounted() {
        this.$refs.mycanvas.fetch().then((painter) => {
            _painter = painter;

            console.log(painter.getContext());

            // 渐变色

            // painter.setRegion('环形渐变');

            // painter
            //   .config({
            //     fillStyle: painter
            //       .createRadialGradient(300, 120, 100)
            //       .setColor(0, 'white')
            //       .setColor(1, 'red')
            //       .value(),
            // })
            // .fillCircle(300, 120, 70);

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

            // painter.setRegion('角度渐变');

            // painter
            //   .config({
            //     fillStyle: painter
            //       .createConicGradient(200, 200, 3.14, 5)
            //       .setColor(0, 'red')
            //       .setColor(0.25, 'pink')
            //       .setColor(0.5, 'blue')
            //       .setColor(0.75, 'yellow')
            //       .setColor(1, 'green')
            //       .value(),
            //   })
            //   .fillCircle(200, 200, 100);

            painter.drawImage("https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/mp-xhs-qrcode.png", 150, 150, 100, 100).then(() => {
                painter.draw();
            });


        });
    },
    components: {
        uiCanvas,
    },
};
</script>

<style lang="scss" scoped></style>
