import type CanvasConfigType from "../../../types/CanvasConfig"
import type CanvasOptsType from '../../../types/CanvasOpts'

import PainterRender from "./painter"
import assemble from "../assemble"
import { linearGradient, radialGradient } from "./gradient"
import { initText } from './config'

class Canvas extends PainterRender {
    readonly name: string = "Canvas"

    private __regionList = {} //区域映射表
    private __scaleSize

    // 步长由1改为10是为了优化区域计算有时候出错问题
    // 2023年7月6日 于南京
    private __regionAssemble = assemble(0, 255, 10, 3)

    // 添加scaleSize参数是为了适配画布缩放后的处理
    // 2024年1月17日 于南京
    constructor(ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement | null, opts: CanvasOptsType = {}, scaleSize = 1) {
        super(
            ViewCanvas,
            opts,
            RegionCanvas ? new PainterRender(RegionCanvas, {
                willReadFrequently: true,
            }) : undefined, true, scaleSize
        )

        this.__scaleSize = scaleSize
        this.setRegion("")
    }

    config(configs: CanvasConfigType) {
        for (const key in configs) {
            this.useConfig(key, configs[key])
        }

        return this
    }

    // 是否绘制的内容只需要进行区域记录
    onlyRegion(flag: boolean) {
        this.__onlyRegion = flag
        return this
    }

    onlyView(flag: boolean) {
        this.__onlyView = flag
        return this
    }

    // 设置当前绘制区域名称
    setRegion(regionName: string | number) {
        if (this.__region) {
            if (regionName) {
                if (this.__regionList[regionName] == void 0) {
                    const tempColor = this.__regionAssemble()
                    this.__regionList[regionName] =
                        "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")"
                }

                this.__region.useConfig("fillStyle", this.__regionList[regionName]) &&
                    this.__region.useConfig("strokeStyle", this.__regionList[regionName])
            } else {
                this.__region.useConfig("fillStyle", "#000000") &&
                    this.__region.useConfig("strokeStyle", "#000000")
            }
        }
        return this
    }

    // 获取当前事件触发的区域名称
    getRegion(x: number, y: number): Promise<string> {
        return new Promise((resolve) => {
            const imgData = this.__region ? this.__region.painter.getImageData(x - 0.5, y - 0.5, 1, 1) : {
                data: [0, 0, 0, 0]
            }

            // 获取点击点的颜色
            let currentRGBA = imgData.data

            const doit = () => {
                if (this.__region) {

                    // 查找当前点击的区域
                    for (const key in this.__regionList) {
                        if (
                            "rgb(" +
                            currentRGBA[0] +
                            "," +
                            currentRGBA[1] +
                            "," +
                            currentRGBA[2] +
                            ")" ==
                            this.__regionList[key]
                        ) {
                            resolve(key)
                            break
                        }
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

    textWidth(text: string) {
        this.painter.save()

        initText(this.painter, this.__specialConfig, 0, 0, 0)

        // 虽然我们限制了只可以输入字符串，可是不代表所有环境都可以保证，为了确保方法不失效，强转成字符串
        const width = this.painter.measureText(text + "").width

        this.painter.restore()

        return width
    }

    // 获取原始画笔
    getContext(isRegion = false) {
        return isRegion ? (this.__region ? this.__region.painter : null) : this.painter
    }

    // 获取画布信息
    getInfo() {
        return {
            width: this.painter.canvas.width / this.__scaleSize,
            height: this.painter.canvas.height / this.__scaleSize
        }
    }

    // 线性渐变
    createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
        return linearGradient(this.painter, x0, y0, x1, y1)
    }

    // 环形渐变
    createRadialGradient(cx: number, cy: number, r: number) {
        return radialGradient(this.painter, cx, cy, r)
    }

    // 获取指定位置颜色
    getColor(x: number, y: number) {
        x *= this.__scaleSize
        y *= this.__scaleSize
        const currentRGBA = this.painter.getImageData(x - 0.5, y - 0.5, 1, 1).data
        return (
            "rgba(" +
            currentRGBA[0] +
            "," +
            currentRGBA[1] +
            "," +
            currentRGBA[2] +
            "," +
            currentRGBA[3] +
            ")"
        )
    }
}

export default Canvas
