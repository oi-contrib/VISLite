import RawCanvas from "../../lib/RawCanvas/index.es.min.js";
import drawImage from "./drawImage.js";

// https://opendocs.alipay.com/mini/framework/custom-component-overview

Component({
    props: {
        width: 300,
        height: 150,
        region: true,
        onDoTouchstart: () => { }
    },
    data: {
        uniqueid: (Math.random() * 10000).toFixed(0),
        help: {}
    },
    methods: {
        fetch() {
            return new Promise((resolve, reject) => {

                let getCanvasContext = (idName, doback) => {
                    if (idName != 'region' || this.props.region) {
                        my.createSelectorQuery().select('#' + idName + '-' + this.data.uniqueid).node().exec((res) => {
                            const canvas = res[0].node;
                            const ctx = canvas.getContext('2d');

                            if (idName != "region") {
                                ctx.scale(2, 2);
                            }

                            doback(ctx, idName != 'region' ? canvas : null);

                        })
                    } else {
                        doback(null);
                    }
                };

                getCanvasContext("painter", (painter, panvas) => {
                    getCanvasContext("region", region => {

                        this.data.help.instance = new RawCanvas({
                            getContext() {
                                return painter;
                            }
                        }, this.props.region ? {
                            getContext() {
                                return region;
                            }
                        } : null);

                        this.data.help.instance.toDataURL = () => {
                            return new Promise((resolveUrl) => {
                                if (panvas.toDataURL) {
                                    resolveUrl(panvas.toDataURL());
                                } else {
                                    panvas.toTempFilePath({
                                        x: 0,
                                        y: 0,
                                        width: this.props.widht,
                                        height: this.props.height,
                                        success(e) {
                                            resolveUrl(e.tempFilePath);
                                        },
                                        fail(error) {
                                            console.error(error);
                                        }
                                    });
                                }
                            });
                        };

                        this.data.help.instance.drawImage = drawImage(
                            this.data.help.instance,
                            this.data.help.instance.drawImage,
                            panvas
                        );

                        resolve(this.data.help.instance);
                    });
                });

            });
        },
        doit(event) {
            let x = event.touches[0].x;
            let y = event.touches[0].y;

            this.data.help.instance.getRegion(x, y).then((regionName) => {
                this.props.onDoTouchstart({
                    name: regionName,
                    x: x,
                    y: y
                });
            });
        },
        doitstart(event) {
            this.doit(event);
        }
    }
});