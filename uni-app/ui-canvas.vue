<template>
  <view
    :class="cover || isH5 ? 'cover-view' : 'normal-view'"
    :style="{ display: 'inline-block' }"
  >
    <view
      v-if="!cover && !isH5"
      :class="'view-img view-' + uniqueid"
      @touchstart="doitstart"
    >
      <image
        :style="{ width: width + 'px', height: height + 'px' }"
        :src="viewImg"
      ></image>
    </view>

    <!-- #ifdef MP-ALIPAY -->
    <canvas
      :width="2 * width + 'px'"
      :height="2 * height + 'px'"
      class="painter"
      :id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="[
        { width: width + 'px', height: height + 'px' },
        cover || isH5 ? {} : { position: 'fixed', left: '50000px' },
      ]"
    ></canvas>
    <canvas
      v-if="region"
      class="region"
      :id="'region-' + uniqueid"
      :style="{
        width: width + 'px',
        height: height + 'px',
        position: 'fixed',
        left: '50000px',
      }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <canvas
      class="painter"
      canvas-id="painter"
      @touchstart="doitstart"
      :style="[
        { width: width + 'px', height: height + 'px' },
        cover || isH5 ? {} : { position: 'fixed', left: '50000px' },
      ]"
    ></canvas>
    <canvas
      v-if="region"
      class="region"
      canvas-id="region"
      :style="{
        width: width + 'px',
        height: height + 'px',
        position: 'fixed',
        left: '50000px',
      }"
    ></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN||MP-ALIPAY -->
    <canvas
      class="painter"
      :canvas-id="'painter-' + uniqueid"
      @touchstart="doitstart"
      :style="[
        { width: width + 'px', height: height + 'px' },
        cover || isH5 ? {} : { position: 'fixed', left: '50000px' },
      ]"
    ></canvas>
    <canvas
      v-if="region"
      class="region"
      :canvas-id="'region-' + uniqueid"
      :style="{
        width: width + 'px',
        height: height + 'px',
        position: 'fixed',
        left: '50000px',
      }"
    ></canvas>
    <!-- #endif -->
  </view>
</template>
<script>
import RawCanvas from "../lib/RawCanvas/index.es.min.js";
import drawImage from "./drawImage.js";

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
      hadFetch:false
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

      // #ifdef MP-ALIPAY
      if(!this.hadFetch) painter.scale(2, 2);
      // #endif

      let scaleSize = 1;

      // #ifdef MP-ALIPAY
      scaleSize = 2;
      // #endif

      let _this = this;
      this.help.instance = new RawCanvas(
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
          : null,
        scaleSize
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

      this.hadFetch = true;
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

        this.help.instance.drawImage = drawImage(
          this.help.instance,
          this.help.instance.drawImage
        );

        resolve(this.help.instance);
      });
    },
    doit(event) {
      let doRun = (x, y) => {
        this.help.instance.getRegion(x, y).then((regionName) => {
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
      this.doit(event);
    },
  },
};
</script>
