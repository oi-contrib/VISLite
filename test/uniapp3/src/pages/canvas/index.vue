<template>
    <view class="view">
        <ui-canvas ref="mycanvasRef" :width="350" :height="700" @dotouchstart="doit"></ui-canvas>
    </view>
</template>

<script setup lang="ts">
import type CanvasType from "vislite/types/Canvas";

import { ref, onMounted } from "vue";

import uiCanvas from "vislite/uni-app/ui-canvas.vue";

let mycanvasRef = ref()

let doit = (region: any) => {
    console.log(region)
}

onMounted(() => {

    mycanvasRef.value.fetch().then((painter: CanvasType) => {

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

});
</script>

<style lang="scss" scoped></style>
