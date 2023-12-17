import type { arcCapType } from '../../../types/painterConfig'
import type CanvasOptsType from '../../../types/CanvasOpts'

import { initText, initArc, initCircle, initRect } from './config'
import texts from './texts'

class Painter {

    painter: CanvasRenderingContext2D
    __region: Painter | null | undefined = null

    __onlyRegion: boolean = false
    __isPainter: boolean

    // 用于记录配置
    // 因为部分配置的设置比较特殊，只先记录意图
    __specialConfig = {

        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": <arcCapType>'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcEndCap": <arcCapType>'butt'
    }

    private __initConfig = {

        // 填充色或图案
        "fillStyle": 'black',

        // 轮廓色或图案
        "strokeStyle": 'black',

        // 线条宽度(单位px，下同)
        "lineWidth": 1,

        // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
        "textAlign": 'left',

        // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
        "textBaseline": 'middle',

        // 设置线条虚线，应该是一个数组[number,...]
        "lineDash": [],

        // 阴影的模糊系数，默认0，也就是无阴影
        "shadowBlur": 0,

        // 阴影的颜色
        "shadowColor": "black"

    }

    constructor(canvas: HTMLCanvasElement, opts: CanvasOptsType = {}, region?: Painter, isPainter = false) {
        this.painter = canvas.getContext("2d", opts) as CanvasRenderingContext2D
        this.__region = region
        this.__isPainter = isPainter

        // 默认配置canvas2D对象已经存在的属性
        this.painter.textBaseline = 'middle'
        this.painter.textAlign = 'left'
    }

    useConfig(key: string, value: any) {
        if (this.__region) {
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
            this.painter[key] = value
        }

        // 如果属性未被定义
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !")
        }

        return this
    }

    // 文字
    fillText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region) this.__region.fillText(text, x, y, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg).fillText(text, 0, 0)
        this.painter.restore()
        return this
    }
    strokeText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region) this.__region.strokeText(text, x, y, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        initText(this.painter, this.__specialConfig, x, y, deg).strokeText(text, 0, 0)
        this.painter.restore()
        return this
    }
    fullText(text: string, x: number, y: number, deg: number = 0) {
        if (this.__region) this.__region.fullText(text, x, y, deg)

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
        if (this.__region) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

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
        if (this.__region) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

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
        if (this.__region) h = this.__region.fillTexts(contents, x, y, width, lineHeight)

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
        if (this.__region) this.__region.beginPath()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.beginPath()
        return this
    }
    closePath() {
        if (this.__region) this.__region.closePath()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.closePath()
        return this
    }
    moveTo(x: number, y: number) {
        if (this.__region) this.__region.moveTo(x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        // 解决1px模糊问题，别的地方类似原因
        this.painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5)
        return this
    }
    lineTo(x: number, y: number) {
        if (this.__region) this.__region.lineTo(x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5)
        return this
    }
    arc(x: number, y: number, r: number, beginDeg: number, deg: number) {
        if (this.__region) this.__region.arc(x, y, r, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0)
        return this
    }
    fill() {
        if (this.__region) this.__region.fill()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.fill()
        return this
    }
    stroke() {
        if (this.__region) this.__region.stroke()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.stroke()
        return this
    }
    full() {
        if (this.__region) this.__region.full()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.fill()
        this.painter.stroke()
        return this
    }

    save() {
        if (this.__region) this.__region.save()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.save()
        return this
    }
    restore() {
        if (this.__region) this.__region.restore()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.restore()
        return this
    }
    clip() {
        if (this.__region) this.__region.clip()

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.clip()
        return this
    }

    // 路径 - 贝塞尔曲线
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
        if (this.__region) this.__region.quadraticCurveTo(cpx, cpy, x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.quadraticCurveTo(cpx, cpy, x, y)
        return this
    }
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        if (this.__region) this.__region.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        return this
    }

    // 擦除画面
    clearRect(x: number, y: number, w: number, h: number) {
        if (this.__region) this.__region.clearRect(x, y, w, h)

        if (this.__isPainter && this.__onlyRegion) return this

        this.painter.clearRect(x, y, w, h)
        return this
    }

    // 弧
    fillArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region) this.__region.fillArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).fill()
        return this
    }
    strokeArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region) this.__region.strokeArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).stroke()
        return this
    }
    fullArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number) {
        if (this.__region) this.__region.fullArc(cx, cy, r1, r2, beginDeg, deg)

        if (this.__isPainter && this.__onlyRegion) return this

        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    // 圆形
    fillCircle(cx: number, cy: number, r: number) {
        if (this.__region) this.__region.fillCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r).fill()
        return this
    }
    strokeCircle(cx: number, cy: number, r: number) {
        if (this.__region) this.__region.strokeCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r).stroke()
        return this
    }
    fullCircle(cx: number, cy: number, r: number) {
        if (this.__region) this.__region.fullCircle(cx, cy, r)

        if (this.__isPainter && this.__onlyRegion) return this

        initCircle(this.painter, cx, cy, r)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    // 矩形
    fillRect(x: number, y: number, width: number, height: number) {
        if (this.__region) this.__region.fillRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, x, y, width, height).fill()
        return this
    }
    strokeRect(x: number, y: number, width: number, height: number) {
        if (this.__region) this.__region.strokeRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, x, y, width, height).stroke()
        return this
    }
    fullRect(x: number, y: number, width: number, height: number) {
        if (this.__region) this.__region.fullRect(x, y, width, height)

        if (this.__isPainter && this.__onlyRegion) return this

        initRect(this.painter, x, y, width, height)
        this.painter.fill()
        this.painter.stroke()
        return this
    }

    draw() { }
}

export default Painter