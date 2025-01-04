import type CanvasOptsType from '../../../types/CanvasOpts'

import { initText, initArc, initCircle, initRect } from './config'
import texts from './texts'
import defaultFactory from "./default"

class Painter {

    painter: CanvasRenderingContext2D
    __region: Painter | null | undefined = null

    __onlyRegion: boolean = false
    __onlyView: boolean = false

    __isPainter: boolean

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    __specialConfig = defaultFactory("special") as {
        [key: string]: any
    }

    private __initConfig = defaultFactory("init")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(canvas: HTMLCanvasElement, opts: CanvasOptsType = {}, region?: Painter, isPainter = false, scaleSize = 1) {
        this.painter = canvas.getContext("2d", opts) as CanvasRenderingContext2D
        this.__region = region
        this.__isPainter = isPainter

        // 默认配置canvas2D对象已经存在的属性
        this.painter.textBaseline = 'middle'
        this.painter.textAlign = 'left'
    }

    useConfig(key: string, value: any) {
        if (this.__region && !this.__onlyView) {
            if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) {
                this.__region.useConfig(key, value)
            }
        }

        if (this.__isPainter && this.__onlyRegion) return this

        /**
        * -----------------------------
        * 特殊的设置开始
        * -----------------------------
        */

        if (key == 'lineDash') {
            if (this.painter.setLineDash) this.painter.setLineDash(value)
        }

        /**
         * -----------------------------
         * 常规的配置开始
         * -----------------------------
         */

        // 如果已经存在默认配置中，说明只需要缓存起来即可
        else if (key in this.__specialConfig) {

            // 文字非整数可能存在问题，修复一下
            if (key == 'fontSize') {
                value = Math.round(value)
            }

            this.__specialConfig[key] = value
        }

        // 其它情况直接生效即可
        else if (key in this.__initConfig) {
            (this.painter as any)[key] = value
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !")
        }

        return this
    }

    // 文字
    fillText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region && !this.__onlyView) this.__region.fillText(text, x, y, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg).fillText(text, 0, 0)
        this.painter.restore()
        return this
    }
    strokeText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region && !this.__onlyView) this.__region.strokeText(text, x, y, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg).strokeText(text, 0, 0)
        this.painter.restore()
        return this
    }
    fullText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region && !this.__onlyView) this.__region.fullText(text, x, y, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg)
        this.painter.fillText(text, 0, 0)
        this.painter.strokeText(text, 0, 0)
        this.painter.restore()
        return this
    }

    // 多行文字
    fillTexts(contents: string, x: number, y: number, width: number, lineHeight: number = 1.2, deg: number = 0) {
        let h = 0
        if (this.__region && !this.__onlyView) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

        if (this.__isPainter && this.__onlyRegion) return h

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg)

        const height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, (content, top) => {
            this.painter.fillText(content, 0, top)
        })

        this.painter.restore()
        return height
    }
    strokeTexts(contents: string, x: number, y: number, width: number, lineHeight: number = 1.2, deg: number = 0) {
        let h = 0
        if (this.__region && !this.__onlyView) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

        if (this.__isPainter && this.__onlyRegion) return h

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg)

        const height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, (content, top) => {
            this.painter.strokeText(content, 0, top)
        })

        this.painter.restore()
        return height
    }
    fullTexts(contents: string, x: number, y: number, width: number, lineHeight: number = 1.2, deg: number = 0) {
        let h = 0
        if (this.__region && !this.__onlyView) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

        if (this.__isPainter && this.__onlyRegion) return h

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg)

        const height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, (content, top) => {
            this.painter.fillText(content, 0, top)
            this.painter.strokeText(content, 0, top)
        })

        this.painter.restore()
        return height
    }

    // 路径
    beginPath() {
        if (this.__region && !this.__onlyView) this.__region.beginPath()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.beginPath()
        return this
    }
    closePath() {
        if (this.__region && !this.__onlyView) this.__region.closePath()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.closePath()
        return this
    }
    moveTo(x: number, y: number) {
        if (this.__region && !this.__onlyView) this.__region.moveTo(x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        // 解决1px模糊问题，别的地方类似原因
        this.painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5)
        return this
    }
    lineTo(x: number, y: number) {
        if (this.__region && !this.__onlyView) this.__region.lineTo(x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5)
        return this
    }
    arc(x: number, y: number, r: number, beginDeg: number, deg: number) {
        if (this.__region && !this.__onlyView) this.__region.arc(x, y, r, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0)
        return this
    }
    fill() {
        if (this.__region && !this.__onlyView) this.__region.fill()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.fill()
        return this
    }
    stroke() {
        if (this.__region && !this.__onlyView) this.__region.stroke()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.stroke()
        return this
    }
    full() {
        if (this.__region && !this.__onlyView) this.__region.full()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.fill()
        this.painter.stroke()
        return this
    }

    save() {
        if (this.__region && !this.__onlyView) this.__region.save()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        return this
    }
    restore() {
        if (this.__region && !this.__onlyView) this.__region.restore()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.restore()
        return this
    }
    clip() {
        if (this.__region && !this.__onlyView) this.__region.clip()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.clip()
        return this
    }

    // 路径 - 贝塞尔曲线
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
        if (this.__region && !this.__onlyView) this.__region.quadraticCurveTo(cpx, cpy, x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.quadraticCurveTo(cpx, cpy, x, y)
        return this
    }
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        if (this.__region && !this.__onlyView) this.__region.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        return this
    }

    // 擦除画面
    clearRect(x: number, y: number, w: number, h: number) {
        if (this.__region && !this.__onlyView) this.__region.clearRect(x, y, w, h)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.clearRect(x, y, w, h)
        return this
    }
    clearCircle(cx: number, cy: number, r: number) {
        if (this.__region && !this.__onlyView) this.__region.clearCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.beginPath()
        this.painter.globalCompositeOperation = "destination-out"
        this.painter.arc(cx, cy, r, 0, Math.PI * 2)
        this.painter.fill()
        this.painter.globalCompositeOperation = "source-over"
        this.painter.closePath()
        return this
    }

    // 弧
    fillArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region && !this.__onlyView) this.__region.fillArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).fill()
        return this
    }
    strokeArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region && !this.__onlyView) this.__region.strokeArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).stroke()
        return this
    }
    fullArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region && !this.__onlyView) this.__region.fullArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    // 圆形
    fillCircle(cx: number, cy: number, r: number) {
        if (this.__region && !this.__onlyView) this.__region.fillCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r).fill()
        return this
    }
    strokeCircle(cx: number, cy: number, r: number) {
        if (this.__region && !this.__onlyView) this.__region.strokeCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r).stroke()
        return this
    }
    fullCircle(cx: number, cy: number, r: number) {
        if (this.__region && !this.__onlyView) this.__region.fullCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    // 矩形
    fillRect(x: number, y: number, width: number, height: number) {
        if (this.__region && !this.__onlyView) this.__region.fillRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, this.__specialConfig, x, y, width, height).fill()
        return this
    }
    strokeRect(x: number, y: number, width: number, height: number) {
        if (this.__region && !this.__onlyView) this.__region.strokeRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, this.__specialConfig, x, y, width, height).stroke()
        return this
    }
    fullRect(x: number, y: number, width: number, height: number) {
        if (this.__region && !this.__onlyView) this.__region.fullRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, this.__specialConfig, x, y, width, height)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    // 渲染绘制（uniapp独有）
    draw() {

        // 兼容非uniapp环境，防止误用
        // 2024年4月3日 于南京
        return Promise.resolve()
    }

    // 绘制图片
    drawImage(img: CanvasImageSource | string, x: number, y: number, w: number, h: number, isImage: boolean = false) {
        return new Promise((resolve) => {
            if (this.__region && !this.__onlyView) {
                this.__region.fillRect(x, y, w, h)
            }

            if (this.__isPainter && this.__onlyRegion) {
                resolve({})
                return
            }

            if (typeof img == 'string' && !isImage) {
                const imgInstance = new Image()
                imgInstance.onload = () => {
                    this.painter.drawImage(imgInstance, x, y, w, h)
                    resolve({})
                }
                imgInstance.src = img
            } else {
                this.painter.drawImage(img as CanvasImageSource, x, y, w, h)
                resolve({})
            }

        })
    }

    // 扩展绘制方法
    install(methods: {
        [key: string]: Function
    }): any {
        for (const key in methods) {

            if (key in this) {
                throw new Error("VISLite Canvas:Method already exists and cannot be overwritten.")
            } else {
                (this as any)[key] = (...args: any) => {
                    const value = methods[key].apply(this, args)
                    if (value != void 0) return value
                    return this
                }
            }

        }
        return this
    }
}

export default Painter