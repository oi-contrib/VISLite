import type SVGConfigType from "../../../types/SVGConfig"
import type { arcCapType, textAlignType, textBaselineType } from "../../../types/painterConfig"

import { initText, initCircle, initPath, initRect, initArc } from "./config"
import { toNode, setAttribute, getAttribute, full, fill, stroke } from "./tool"
import rotate from "../../rotate"

// 属性名向下兼容
let oldAttrName = {
    "font-size": "fontSize",
    "font-family": "fontFamily",
    "arc-start-cap": "arcStartCap",
    "arc-end-cap": "arcEndCap",
}

class SVG {
    readonly name: string = "SVG"

    // 用于记录配置
    private __config = {
        // 基本设置
        fillStyle: "#000",
        strokeStyle: "#000",
        lineWidth: 1,

        // 文字对齐方式
        textAlign: <textAlignType>"left",
        textBaseline: <textBaselineType>"middle",

        // 文字设置
        "fontSize": 50,
        "fontFamily": "sans-serif",

        // arc二端闭合方式['butt':直线闭合,'round':圆帽闭合]
        "arcStartCap": <arcCapType>"butt",
        "arcEndCap": <arcCapType>"butt",

        // 虚线设置
        lineDash: [],
    }

    // 作用的节点
    private __useEl: SVGElement

    // 路径(和canvas2D的类似)
    private __path: string = ""
    private __currentPosition: number[] = []

    private __svg: SVGElement
    constructor(svg: SVGElement) {
        this.__svg = svg
    }

    // 属性设置或获取
    config(params: SVGConfigType) {
        if (typeof params !== "object") {
            return this.__config[oldAttrName[params] || params]
        } else {
            for (let key in params) {
                let _key = oldAttrName[key] || key
                this.__config[_key] = params[key]
            }
        }
        return this
    }

    /**
     * 基础方法
     * ---------------------------------
     */

    // 标记应用节点
    // 也就是后续操作都会作用在此节点
    useEl(el: SVGElement) {
        this.__useEl = el
        return this
    }

    // 获取当前应用的节点
    getEl() {
        return this.__useEl
    }

    // 追加节点
    // el可以是结点或字符串，字符串的话表示节点名称
    // context可选，表示追加位置，可选，默认根svg
    // 此外，和appendBoard等操作一样，执行后新加入的结点会自动变成应用节点
    appendEl(el: string | SVGElement, context?: SVGElement) {
        context = context || this.__svg

        if (typeof el == "string") el = toNode(el)
        context.appendChild(el as SVGElement)

        this.__useEl = el as SVGElement
        return this
    }

    // 追加绘制板
    // 参数和appendEl类似，只是el如果是字符串的话，表示需要绘制对应什么内容，
    // 比如el = “arc”，表示画弧（不是路径arc），那么我们会创建path节点，因为我们是使用path实现的
    appendBoard(el: string | SVGElement, context?: SVGElement) {
        let _el = el

        if (typeof el == "string")
            _el =
                {
                    text: "text",
                    path: "path",
                    arc: "path",
                    circle: "circle",
                    rect: "rect",
                }[el] || ""

        if (_el == "") throw new Error("Unsupported drawing method:" + el)
        return this.appendEl(_el, context)
    }

    // 删除当前维护的节点
    remove() {
        if (!this.__useEl) {
            throw new Error("Currently, no node can be deleted.")
        } else {
            ((this.__useEl as SVGElement).parentNode as SVGElement).removeChild(
                this.__useEl
            )
        }
        return this
    }

    // 设置或获取节点属性
    attr(params: any) {
        if (!this.__useEl)
            throw new Error("Currently, no node can be modified or viewed.")

        if (typeof params !== "object") {
            return getAttribute(this.__useEl, params)
        } else {
            for (let key in params) {
                setAttribute(this.__useEl, key, params[key])
            }
            return this
        }
    }

    /**
     * 绘制方法
     * ---------------------------------
     */

    // 文字
    // deg表示文字旋转角度，是角度值，不是弧度
    fillText(text: string, x: number, y: number, deg: number = 0) {
        initText(this.__useEl, this.__config, x, y, deg)
        this.__useEl.textContent = text
        fill(this.__useEl, this.__config)
        return this
    }
    strokeText(text: string, x: number, y: number, deg: number = 0) {
        initText(this.__useEl, this.__config, x, y, deg)
        this.__useEl.textContent = text
        stroke(this.__useEl, this.__config)
        return this
    }
    fullText(text: string, x: number, y: number, deg: number = 0) {
        initText(this.__useEl, this.__config, x, y, deg)
        this.__useEl.textContent = text
        full(this.__useEl, this.__config)
        return this
    }

    // 弧
    fillArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ) {
        initArc(this.__useEl, this.__config, cx, cy, r1, r2, beginDeg, deg)
        fill(this.__useEl, this.__config)
        return this
    }
    strokeArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ) {
        initArc(this.__useEl, this.__config, cx, cy, r1, r2, beginDeg, deg)
        stroke(this.__useEl, this.__config)
        return this
    }
    fullArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ) {
        initArc(this.__useEl, this.__config, cx, cy, r1, r2, beginDeg, deg)
        full(this.__useEl, this.__config)
        return this
    }

    // 圆形
    fillCircle(cx: number, cy: number, r: number) {
        initCircle(this.__useEl, cx, cy, r)
        fill(this.__useEl, this.__config)
        return this
    }
    strokeCircle(cx: number, cy: number, r: number) {
        initCircle(this.__useEl, cx, cy, r)
        stroke(this.__useEl, this.__config)
        return this
    }
    fullCircle(cx: number, cy: number, r: number) {
        initCircle(this.__useEl, cx, cy, r)
        full(this.__useEl, this.__config)
        return this
    }

    // 矩形
    fillRect(x: number, y: number, width: number, height: number) {
        initRect(this.__useEl, x, y, width, height)
        fill(this.__useEl, this.__config)
        return this
    }
    strokeRect(x: number, y: number, width: number, height: number) {
        initRect(this.__useEl, x, y, width, height)
        stroke(this.__useEl, this.__config)
        return this
    }
    fullRect(x: number, y: number, width: number, height: number) {
        initRect(this.__useEl, x, y, width, height)
        full(this.__useEl, this.__config)
        return this
    }

    // 路径
    beginPath() {
        this.__currentPosition = []
        this.__path = ""
        return this
    }
    closePath() {
        this.__path += "Z"
        return this
    }
    moveTo(x: number, y: number) {
        this.__currentPosition = [x, y]

        this.__path += "M" + x + " " + y
        return this
    }
    lineTo(x: number, y: number) {
        this.__currentPosition = [x, y]

        this.__path += (this.__path == "" ? "M" : "L") + x + " " + y
        return this
    }
    fill() {
        initPath(this.__useEl, this.__path)
        fill(this.__useEl, this.__config)
        return this
    }
    stroke() {
        initPath(this.__useEl, this.__path)
        stroke(this.__useEl, this.__config)
        return this
    }
    full() {
        initPath(this.__useEl, this.__path);
        full(this.__useEl, this.__config)
        return this
    }

    arc(x: number, y: number, r: number, beginDeg: number, deg: number) {
        let begPosition = rotate(x, y, (beginDeg / 180) * Math.PI, x + r, y)
        let endPosition = rotate(
            x,
            y,
            ((beginDeg + deg) / 180) * Math.PI,
            x + r,
            y
        )
        // 如果当前没有路径，说明是开始的，就移动到正确位置
        if (this.__path == "") {
            this.__path += "M" + begPosition[0] + "," + begPosition[1]
        }
        // 如果当前有路径，位置不正确，应该画到正确位置（和canvas保持一致）
        else if (
            begPosition[0] != this.__currentPosition[0] ||
            begPosition[1] != this.__currentPosition[1]
        ) {
            this.__path += "L" + begPosition[0] + "," + begPosition[1]
        }
        this.__path +=
            "A" +
            r +
            "," +
            r +
            " 0 " +
            (deg > 180 || deg < -180 ? 1 : 0) +
            "," +
            (deg > 0 ? 1 : 0) +
            " " +
            endPosition[0] +
            "," +
            endPosition[1]
        return this
    }

    // 路径 - 贝塞尔曲线
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
        this.__path += "Q" + cpx + " " + cpy + "," + x + " " + y
        return this
    }
    bezierCurveTo(
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        x: number,
        y: number
    ) {
        this.__path +=
            "C" + cp1x + " " + cp1y + "," + cp2x + " " + cp2y + "," + x + " " + y
        return this
    }
}

export default SVG
