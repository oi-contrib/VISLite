import PainterRender from './painter'

class Canvas extends PainterRender {

    readonly name: string = "Canvas"

    private __regionList = {} //区域映射表
    private __rgb: number[] = [0, 0, 0] //区域标识色彩,rgb(0,0,0)表示空白区域
    private __p: string = 'r' //色彩增值位置

    constructor(ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement) {
        super(ViewCanvas, {}, new PainterRender(RegionCanvas, {
            willReadFrequently: true
        }))

        this.setRegion("")
    }

    config(configs: any) {
        for (let key in configs) {
            this.useConfig(key, configs[key])
        }

        return this
    }

    // 设置当前绘制区域名称
    setRegion(regionName: string | number) {
        let _this = this
        if (regionName) {
            if (this.__regionList[regionName as string] == undefined) {
                this.__regionList[regionName as string] = {
                    'r': function () {
                        _this.__rgb[0] += 1
                        _this.__p = 'g'
                        return 'rgb(' + _this.__rgb[0] + ',' + _this.__rgb[1] + ',' + _this.__rgb[2] + ')'
                    },
                    'g': function () {
                        _this.__rgb[1] += 1
                        _this.__p = 'b'
                        return 'rgb(' + _this.__rgb[0] + ',' + _this.__rgb[1] + ',' + _this.__rgb[2] + ')'
                    },
                    'b': function () {
                        _this.__rgb[2] += 1
                        _this.__p = 'r'
                        return 'rgb(' + _this.__rgb[0] + ',' + _this.__rgb[1] + ',' + _this.__rgb[2] + ')'
                    }
                }[this.__p]()
            }

            (this.__region as PainterRender).useConfig("fillStyle", this.__regionList[regionName as string]) &&
                (this.__region as PainterRender).useConfig("strokeStyle", this.__regionList[regionName as string])
        } else {
            (this.__region as PainterRender).useConfig("fillStyle", "#000000") &&
                (this.__region as PainterRender).useConfig("strokeStyle", "#000000")
        }
        return this
    }

    // 获取当前事件触发的区域名称
    getRegion(x: number, y: number): Promise<string> {
        return new Promise((resolve, reject) => {
            let imgData = (this.__region as PainterRender).painter.getImageData(x - 0.5, y - 0.5, 1, 1)

            // 获取点击点的颜色
            let currentRGBA = imgData.data

            let doit = () => {
                // 查找当前点击的区域
                for (let key in this.__regionList) {
                    if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == this.__regionList[key]) {
                        resolve(key)
                        break
                    }
                }

                resolve("")
            }

            // 如果有值
            if (currentRGBA) {
                doit()
            }

            // 否则就是在Promise中
            else {
                (imgData as any).then((data: Uint8ClampedArray) => {
                    currentRGBA = data
                    doit()
                })
            }
        })
    }
}

export default Canvas