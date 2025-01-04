import type CanvasConfigType from "../../../types/CanvasConfig"

import arc from "./arc"

// 文字统一设置方法
export const initText = function (
    painter: CanvasRenderingContext2D,
    config: CanvasConfigType,
    x: number,
    y: number,
    deg: number
) {
    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font =
        config.fontStyle +
        " " +
        config.fontWeight +
        " " +
        config.fontSize +
        "px " +
        config.fontFamily;
    return painter
}

// 画弧统一设置方法
export const initArc = function (
    painter: CanvasRenderingContext2D,
    config: CanvasConfigType,
    cx: number,
    cy: number,
    r1: number,
    r2: number,
    beginDeg: number,
    deg: number
) {
    if (r1 > r2) {
        const temp = r1
        r1 = r2
        r2 = temp
    }

    beginDeg = beginDeg % (Math.PI * 2)

    // 当|deg|>=2π的时候都认为是一个圆环
    // 为什么不取2π比较，是怕部分浏览器浮点不精确
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2
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
            if (r < 0) r = -r
            painter.beginPath()
            painter.moveTo(begInnerX, begInnerY)
            painter.arc(
                // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
                cx,
                cy,
                r1,
                beginA,
                endA,
                false
            )
            // 结尾
            if (config.arcEndCap == "round")
                painter.arc(
                    (endInnerX + endOuterX) * 0.5,
                    (endInnerY + endOuterY) * 0.5,
                    r,
                    endA - Math.PI,
                    endA,
                    true
                )
            else if (config.arcEndCap == "-round")
                painter.arc(
                    (endInnerX + endOuterX) * 0.5,
                    (endInnerY + endOuterY) * 0.5,
                    r,
                    endA - Math.PI,
                    endA,
                    false
                )
            else painter.lineTo(endOuterX, endOuterY)

            painter.arc(cx, cy, r2, endA, beginA, true)
            // 开头
            if (config.arcStartCap == "round")
                painter.arc(
                    (begInnerX + begOuterX) * 0.5,
                    (begInnerY + begOuterY) * 0.5,
                    r,
                    beginA,
                    beginA - Math.PI,
                    true
                )
            else if (config.arcStartCap == "-round")
                painter.arc(
                    (begInnerX + begOuterX) * 0.5,
                    (begInnerY + begOuterY) * 0.5,
                    r,
                    beginA,
                    beginA - Math.PI,
                    false
                )
            else painter.lineTo(begInnerX, begInnerY)
        }
    )
    if (config.arcStartCap == "butt") painter.closePath()
    return painter
}

// 画圆统一设置方法
export const initCircle = function (
    painter: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number
) {
    painter.beginPath()
    painter.moveTo(cx + r, cy)
    painter.arc(cx, cy, r, 0, Math.PI * 2)
    return painter
};

// 画矩形统一设置方法
export const initRect = function (
    painter: CanvasRenderingContext2D,
    config: CanvasConfigType,
    x: number,
    y: number,
    width: number,
    height: number
) {
    painter.beginPath()

    const rectRadius: Array<number> = [];
    if (Array.isArray(config.rectRadius) && config.rectRadius.length > 0) {
        for (let index = 0; index < 4; index++) {
            rectRadius.push(...config.rectRadius)
        }
    }

    if (rectRadius.length >= 4) {
        painter.arc(x + rectRadius[0], y + rectRadius[0], rectRadius[0], Math.PI, Math.PI * 1.5)
        painter.arc(x + width - rectRadius[1], y + rectRadius[1], rectRadius[1], 1.5 * Math.PI, 0)
        painter.arc(x + width - rectRadius[2], y + height - rectRadius[2], rectRadius[2], 0, Math.PI * 0.5)
        painter.arc(x + rectRadius[3], y + height - rectRadius[3], rectRadius[3], 0.5 * Math.PI, Math.PI)
        painter.closePath()
    } else {
        painter.rect(x, y, width, height)
    }

    return painter
}
