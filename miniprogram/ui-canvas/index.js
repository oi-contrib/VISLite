import OralCanvas from "../../lib/OralCanvas/index.es.js";

let dpr = wx.getSystemInfoSync().pixelRatio;

Component({
    properties: {
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 150
        },
        region: {
            type: Boolean,
            default: true
        },
        touchstart: {
            type: Function,
            default: () => { }
        }
    },
    data: {
        help: {}
    },
    lifetimes: {
        ready() {

        }
    },
    methods: {
        fetch() {
            return new Promise((resolve, reject) => {

                let getCanvasContext = (idName, doback) => {
                    if (idName != 'region' || this.data.region) {
                        const query = wx.createSelectorQuery().in(this);
                        query.select('#' + idName)
                            .fields({ node: true, size: true })
                            .exec((res) => {
                                const canvas = res[0].node;
                                const ctx = canvas.getContext('2d');

                                canvas.width = res[0].width * (idName == "region" ? 1 : dpr);
                                canvas.height = res[0].height * (idName == "region" ? 1 : dpr);

                                if (idName != "region") {
                                    ctx.scale(dpr, dpr);
                                }

                                doback(ctx);
                            });
                    } else {
                        doback(null);
                    }
                };

                getCanvasContext("painter", painter => {
                    getCanvasContext("region", region => {
                        this.data.help.instance = new OralCanvas({
                            getContext() {
                                return painter;
                            }
                        }, this.data.region ? {
                            getContext() {
                                return region;
                            }
                        } : null);

                        this.data.help.instance.toDataURL = () => {
                            return new Promise((resolveUrl) => {
                                wx.canvasToTempFilePath({
                                    canvasId: "painter",
                                    success: function (e) {
                                        resolveUrl(e.tempFilePath);
                                    },
                                }, this);
                            })
                        };
                        resolve(this.data.help.instance);
                    });
                });

            });
        },
        doit(event, doback) {
            let x = event.touches[0].x;
            let y = event.touches[0].y;

            this.data.help.instance.getRegion(x, y).then((regionName) => {
                // 兼容旧语法
                if (doback) doback(regionName);

                this.triggerEvent('dotouchstart', {
                    name: regionName,
                    x: x,
                    y: y
                })
            });
        },
        doitstart(event) {
            this.doit(event, this.data.touchstart);
        }
    }

});
