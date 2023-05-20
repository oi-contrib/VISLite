import CanvasConfigType from '../../../types/CanvasConfig'
import PainterRender from './painter'
import assemble from '../assemble'

// 属性名向下兼容
let oldAttrName = {
    "font-size": "fontSize",
    "font-family": "fontFamily",
    "font-weight": "fontWeight",
    "font-style": "fontStyle",
    "arc-start-cap": "arcStartCap",
    "arc-end-cap": "arcEndCap"
}

class Canvas extends PainterRender {

    readonly name: string = "Canvas"

    private __regionList = {} //区域映射表
    private __regionAssemble = assemble(0, 255, 1, 3)

    constructor(ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement) {
        super(ViewCanvas, {}, new PainterRender(RegionCanvas, {
            willReadFrequently: true
        }))

        this.setRegion("")
    }

    config(configs: CanvasConfigType) {
        for (let key in configs) {
            let _key = oldAttrName[key] || key
            this.useConfig(_key, configs[key])
        }

        return this
    }

    // 设置当前绘制区域名称
    setRegion(regionName: string | number) {
        if (regionName) {
            if (this.__regionList[regionName] == undefined) {
                let tempColor = this.__regionAssemble()
                this.__regionList[regionName] = "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")"
            }

            this.__region.useConfig("fillStyle", this.__regionList[regionName]) &&
                this.__region.useConfig("strokeStyle", this.__regionList[regionName])
        } else {
            this.__region.useConfig("fillStyle", "#000000") &&
                this.__region.useConfig("strokeStyle", "#000000")
        }
        return this
    }

    // 获取当前事件触发的区域名称
    getRegion(x: number, y: number): Promise<string> {
        return new Promise((resolve, reject) => {
            let imgData = this.__region.painter.getImageData(x - 0.5, y - 0.5, 1, 1)

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

    // 获取原始画笔
    getContext(isRegion = false) {
        return isRegion ? this.__region.painter : this.painter
    }
}

export default Canvas