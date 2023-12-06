<template>
  <view :class="cover || isH5 ? 'cover-view' : 'normal-view'">
    <view :class="'view-img view-' + uniqueid" @touchstart="doitstart">
      <image
        :style="{ width: width + 'px', height: height + 'px' }"
        :src="viewImg"
      ></image>
    </view>

    <!-- #ifdef MP-ALIPAY -->
    <canvas
      class="painter"
      :id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      v-if="region"
      class="region"
      :id="'region-' + uniqueid"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <canvas
      class="painter"
      canvas-id="painter"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      v-if="region"
      class="region"
      canvas-id="region"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN||MP-ALIPAY -->
    <canvas
      class="painter"
      :canvas-id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></canvas>
    <canvas
      v-if="region"
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
      viewImg: "",
      // #ifdef H5
      isH5: true,
      // #endif
      // #ifndef H5
      isH5: false,
      // #endif
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
    cover: {
      type: Boolean,
      default: true,
    },
    region: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    fetch() {
      let painter, region, painterid, regionid;
      // #ifdef MP-WEIXIN
      painter = uni.createCanvasContext("painter", this);
      if (this.region) region = uni.createCanvasContext("region", this);
      painterid = "painter";
      regionid = "region";
      // #endif
      // #ifndef MP-WEIXIN
      painter = uni.createCanvasContext("painter-" + this.uniqueid, this);
      if (this.region)
        region = uni.createCanvasContext("region-" + this.uniqueid, this);
      painterid = "painter-" + this.uniqueid;
      regionid = "region-" + this.uniqueid;
      // #endif

      let _this = this;
      this.help.instance = new OralCanvas(
        {
          getContext() {
            return painter;
          },
        },
        _this.region
          ? {
              getContext() {
                // #ifdef MP-ALIPAY
                let getImageData = region.getImageData;
                // #endif
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
                    getImageData(options);
                    // #endif
                    // #ifndef MP-ALIPAY
                    uni.canvasGetImageData(options, _this);
                    // #endif
                  });
                };
                return region;
              },
            }
          : null
      );
      this.help.instance.draw = (reserve = false, callback = () => {}) => {
        painter.draw(reserve, () => {
          // 如果不使用原生渲染
          if (!this.cover && !this.isH5) {
            uni.canvasToTempFilePath(
              {
                canvasId: painterid,
                success: (e) => {
                  this.viewImg = e.tempFilePath;
                  if (_this.region) region.draw(reserve);
                  callback();
                },
              },
              // #ifndef MP-ALIPAY
              this
              // #endif
            );
          } else {
            if (_this.region) region.draw(reserve);
            callback();
          }
        });
      };
      return new Promise((resolve, reject) => {
        this.help.instance.toDataURL = () => {
          return new Promise((resolveUrl) => {
            uni.canvasToTempFilePath(
              {
                canvasId: painterid,
                success: function (e) {
                  resolveUrl(e.tempFilePath);
                },
              },
              // #ifndef MP-ALIPAY
              this
              // #endif
            );
          });
        };

        resolve(this.help.instance);
      });
    },
    doit(event, doback) {
      let doRun = (x, y) => {
        this.help.instance.getRegion(x, y).then((regionName) => {
          // 兼容旧语法
          if (typeof doback == "function") doback(regionName);

          this.$emit("dotouchstart", {
            name: regionName,
            x: x,
            y: y,
          });
        });
      };

      if (this.cover || this.isH5) {
        let x = event.touches[0].x;
        let y = event.touches[0].y;
        doRun(x, y);
      } else {
        uni
          .createSelectorQuery()
          .selectViewport()
          .scrollOffset()
          .exec((ret) => {
            uni
              .createSelectorQuery()
              .in(this)
              .select(".view-" + this.uniqueid)
              .boundingClientRect((data) => {
                doRun(
                  event.touches[0].pageX - data.left - ret[0].scrollLeft,
                  event.touches[0].pageY - data.top - ret[0].scrollTop
                );
              })
              .exec();
          });
      }
    },
    doitstart(event) {
      this.doit(event, this.touchstart);
    },
  },
};
</script>

  <style lang="css" scoped>
/* 辅助的区域不应该可以看见 */
.region {
  position: fixed;
  left: 50000px;
}

.cover-view,
.normal-view {
  display: inline-block;
}

.cover-view .view-img {
  display: none;
}

.normal-view .painter {
  position: fixed;
  left: 50000px;
}
</style>
