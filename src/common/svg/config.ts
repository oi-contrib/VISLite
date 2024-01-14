import type SVGConfigType from "../../../types/SVGConfig"

import { setAttribute } from "./tool"
import setStyle from "../setStyle"
import arc from "../canvas/arc"
import { toNode } from "./tool"

export const initDefs = (el: SVGElement) => {
    const defs = el.getElementsByTagName('defs')
    if (defs.length <= 0) {
        const newDefs = toNode("defs")
        el.appendChild(newDefs)
        return newDefs
    } else {
        return defs[0]
    }
}

// 文字统一设置方法
export const initText = (
    el: SVGElement,
    config: SVGConfigType,
    x: number,
    y: number,
    deg: number
) => {
    if (el.nodeName.toLowerCase() !== "text") throw new Error("Need a <text> !")

    // 垂直对齐采用dy实现
    setAttribute(
        el,
        "dy",
        ({
            top: (config["fontSize"] as number) * 0.5,
            middle: 0,
            bottom: -(config["fontSize"] as number) * 0.5,
        } as {
            [key: string]: number
        })[config.textBaseline as string]
    )

    setStyle(el, {
        // 文字对齐方式
        "text-anchor": ({
            left: "start",
            right: "end",
            center: "middle",
        } as {
            [key: string]: string
        })[config.textAlign as string],
        "dominant-baseline": "central",

        // 文字大小和字体设置
        "font-size": config["fontSize"] + "px",
        "font-family": config["fontFamily"],
    })

    // 位置
    setAttribute(el, "x", x)
    setAttribute(el, "y", y)

    // 旋转
    if (typeof deg == "number") {
        deg = deg % 360
        setAttribute(el, "transform", "rotate(" + deg + "," + x + "," + y + ")")
    }
}

// 画圆统一设置方法
export const initCircle = (el: SVGElement, cx: number, cy: number, r: number) => {
    if (el.nodeName.toLowerCase() !== "circle")
        throw new Error("Need a <circle> !")
    setAttribute(el, "cx", cx)
    setAttribute(el, "cy", cy)
    setAttribute(el, "r", r)
}

// 路径统一设置方法
export const initPath = (el: SVGElement, path: string) => {
    if (el.nodeName.toLowerCase() !== "path") throw new Error("Need a <path> !")
    setAttribute(el, "d", path)
}

// 画矩形统一设置方法
export const initRect = (
    el: SVGElement,
    x: number,
    y: number,
    width: number,
    height: number
) => {
    if (el.nodeName.toLowerCase() !== "rect") throw new Error("Need a <rect> !")

    // 由于高和宽不可以是负数，校对一下
    if (height < 0) {
        height *= -1
        y -= height
    }
    if (width < 0) {
        width *= -1
        x -= width
    }

    setAttribute(el, "x", x)
    setAttribute(el, "y", y)
    setAttribute(el, "width", width)
    setAttribute(el, "height", height)
}

// 画弧统一设置方法
export const initArc = (
    el: SVGElement,
    config: SVGConfigType,
    cx: number,
    cy: number,
    r1: number,
    r2: number,
    beginDeg: number,
    deg: number
) => {
    if (el.nodeName.toLowerCase() !== "path") throw new Error("Need a <path> !")

    beginDeg = (beginDeg / 180) * Math.PI
    deg = (deg / 180) * Math.PI

    beginDeg = beginDeg % (Math.PI * 2)

    if (r1 > r2) {
        const temp = r1
        r1 = r2
        r2 = temp
    }

    // 当|deg|>=2π的时候都认为是一个圆环
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 1.999999
    } else {
        deg = deg % (Math.PI * 2)
    }

    arc(
        beginDeg,
        deg,
        cx,
        cy,
        r1,
        r2,
        function (
            beginA: number,
            endA: number,
            begInnerX: number,
            begInnerY: number,
            begOuterX: number,
            begOuterY: number,
            endInnerX: number,
            endInnerY: number,
            endOuterX: number,
            endOuterY: number,
            r: number
        ) {
            const f = endA - beginA > Math.PI ? 1 : 0
            let d = "M" + begInnerX + " " + begInnerY
            if (r < 0) r = -r

            d +=
                // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
                "A" + r1 + " " + r1 + " 0 " + f + " 1 " + endInnerX + " " + endInnerY

            // 结尾
            if (config.arcEndCap == "round")
                d += "A" + r + " " + r + " " + " 0 1 0 " + endOuterX + " " + endOuterY
            else if (config.arcEndCap == "-round")
                d += "A" + r + " " + r + " " + " 0 1 1 " + endOuterX + " " + endOuterY
            else d += "L" + endOuterX + " " + endOuterY
            d +=
                "A" + r2 + " " + r2 + " 0 " + f + " 0 " + begOuterX + " " + begOuterY

            // 开头
            if (config.arcStartCap == "round")
                d += "A" + r + " " + r + " " + " 0 1 0 " + begInnerX + " " + begInnerY
            else if (config.arcStartCap == "-round")
                d += "A" + r + " " + r + " " + " 0 1 1 " + begInnerX + " " + begInnerY
            else d += "L" + begInnerX + " " + begInnerY

            if (config.arcStartCap == "butt") d += "Z"

            setAttribute(el, "d", d)
        }
    )
}
