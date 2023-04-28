<template>
  <view>
    <!-- #ifdef MP-ALIPAY -->
    <canvas
      :id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      class="region"
      :id="'region-' + uniqueid"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <canvas
      canvas-id="painter"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      class="region"
      canvas-id="region"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN||MP-ALIPAY -->
    <canvas
      :canvas-id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      class="region"
      :canvas-id="'region-' + uniqueid"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <!-- #endif -->
  </view>
</template>
<script>
import OralCanvas from "../lib/OralCanvas/index.es.js";
export default {
  data() {
    return {
      uniqueid: (Math.random() * 10000).toFixed(0),
      help: {},
    };
  },
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 150,
    },
    touchstart: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    fetch() {
      // #ifdef MP-WEIXIN
      let painter = uni.createCanvasContext("painter", this);
      let region = uni.createCanvasContext("region", this);
      let regionid = "region";
      // #endif
      // #ifndef MP-WEIXIN
      let painter = uni.createCanvasContext("painter-" + this.uniqueid, this);
      let region = uni.createCanvasContext("region-" + this.uniqueid, this);
      let regionid = "region-" + this.uniqueid;
      // #endif

      let _this = this;
      this.help.instance = new OralCanvas(
        {
          getContext() {
            return painter;
          },
        },
        {
          getContext() {
            region.getImageData = (x, y, width, height) => {
              return new Promise((resolve, reject) => {
                let options = {
                  x,
                  y,
                  width,
                  height,
                  canvasId: regionid,
                  success: function success(res) {
                    resolve(res.data);
                  },
                  fail: function fail(error) {
                    reject(error);
                  },
                };

                // #ifdef MP-ALIPAY
                region.getImageData(options, _this);
                // #endif
                // #ifndef MP-ALIPAY
                uni.canvasGetImageData(options, _this);
                // #endif
              });
            };
            return region;
          },
        }
      );
      this.help.instance.draw = () => {
        painter.draw();
        region.draw();
      };
      return new Promise((resolve, reject) => {
        resolve(this.help.instance);
      });
    },
    doit(event, doback) {
      let doRun = (x, y) => {
        this.help.instance.getRegion(x, y).then((regionName) => {
          doback(regionName);
        });
      };

      // #ifdef MP-ALIPAY
      uni
        .createSelectorQuery()
        .selectViewport()
        .scrollOffset()
        .exec((ret) => {
          let x = event.touches[0].x + ret[0].scrollLeft;
          let y = event.touches[0].y + ret[0].scrollTop;
          doRun(x, y);
        });
      // #endif
      // #ifndef MP-ALIPAY
      let x = event.touches[0].x;
      let y = event.touches[0].y;
      doRun(x, y);
      // #endif
    },
    doitstart(event) {
      this.doit(event, this.touchstart);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 辅助的区域不应该可以看见 */
.region {
  position: fixed;
  left: 50000px;
}
</style>
