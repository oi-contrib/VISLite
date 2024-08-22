<template>
    <view class="view">
        <ui-canvas ref="mycanvas" :width="350" :height="700" @dotouchstart="doit"></ui-canvas>
    </view>
</template>

<script>
import uiCanvas from 'vislite/uni-app/ui-canvas.vue';
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

            painter.draw();
        });
    },
    components: {
        uiCanvas,
    },
};
</script>

<style lang="scss" scoped></style>
