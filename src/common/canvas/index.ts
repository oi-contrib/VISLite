import type CanvasConfigType from "../../../types/CanvasConfig"
import type CanvasOptsType from '../../../types/CanvasOpts'

import PainterRender from "./painter"
import assemble from "../assemble"
import { linearGradient, radialGradient, conicGradient } from "./gradient"
import { initText } from './config'
import defaultFactory from "./default"
import { initOption } from "../option"

class Canvas extends PainterRender {
    readonly name: string = "Canvas"

    // 区域映射表（使用无原型对象，避免 "__proto__" 等区域名污染原型链）
    private __regionList: { [key: string]: number[] } = Object.create(null)
    private __regionCount = 0
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
            this.useConfig(key, (configs as any)[key])
        }

        return this
    }

    reset(config: CanvasConfigType = {}) {
        this.config(initOption(config, defaultFactory() as CanvasConfigType))
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
                    // 颜色空间容量为 25^3（取值 10~250，步长10），超出后颜色会复用，区域将无法区分
                    if (this.__regionCount >= 15625) {
                        throw new Error("VISLite Canvas:区域数量超过上限（15625），无法继续分配区域颜色。")
                    }

                    const tempColor = this.__regionAssemble();
                    this.__regionList[regionName] = [tempColor[0], tempColor[1], tempColor[2]]
                    this.__regionCount += 1
                }

                const color = "rgb(" + this.__regionList[regionName].join(",") + ")"
                this.__region.useConfig("fillStyle", color)
                this.__region.useConfig("strokeStyle", color)
            } else {
                this.__region.useConfig("fillStyle", "#000000")
                this.__region.useConfig("strokeStyle", "#000000")
            }
        }
        return this
    }

    // 清空区域映射与区域画布（清空后需要重新绘制，才会重新记录区域）
    clearRegion() {
        if (this.__region) {
            const canvas = this.__region.painter.canvas
            this.__region.painter.clearRect(0, 0, canvas.width, canvas.height)
        }
        this.__regionList = Object.create(null)
        this.__regionCount = 0
        this.setRegion("")
        return this
    }

    // 根据读到的像素匹配区域名称
    // 修复：原实现使用精确 rgb 字符串比对，抗锯齿边缘永远命中不了
    // 2026年11月25日 于南京
    private __matchRegion(rgba: any) {
        if (!rgba || rgba.length < 3) return ""
        if (rgba.length > 3 && rgba[3] === 0) return ""

        let bestKey = "", bestDistance = 0
        for (const key in this.__regionList) {
            const rgb = this.__regionList[key]
            // 取通道最大差值，既避免颜色接近时误判，也能命中混合后的边缘像素
            const distance = Math.max(
                Math.abs(rgb[0] - rgba[0]),
                Math.abs(rgb[1] - rgba[1]),
                Math.abs(rgb[2] - rgba[2])
            )

            if (distance <= 6 && (bestKey === "" || distance < bestDistance)) {
                bestKey = key
                bestDistance = distance
            }
        }
        return bestKey
    }

    // 获取当前事件触发的区域名称
    getRegion(x: number, y: number): Promise<string> {
        if (!this.__region) return Promise.resolve("")

        let imgData: any

        // 读取失败（坐标越界、画布被销毁等）不应该让 Promise 永远挂起
        try {
            imgData = this.__region.painter.getImageData(x - 0.5, y - 0.5, 1, 1)
        } catch (e) {
            return Promise.resolve("")
        }

        // 同步返回
        if (imgData && imgData.data) return Promise.resolve(this.__matchRegion(imgData.data))

        // 小程序端可能返回 Promise
        if (imgData && typeof imgData.then === "function") {
            return Promise.resolve(imgData).then((result: any) => {
                const rgba = result && result.data ? result.data : result
                return this.__matchRegion(rgba)
            }).catch(() => "")
        }

        return Promise.resolve("")
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

    // 角度渐变
    createConicGradient(cx: number, cy: number, beginDeg: number, deg?: number) {
        return conicGradient(this.painter, cx, cy, beginDeg, deg)
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
