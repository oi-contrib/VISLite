import { initDefs } from './config'
import { toNode, setAttribute } from "./tool"

// 线性渐变
export const linearGradient = function (el: SVGElement, x0: number, y0: number, x1: number, y1: number) {

    const defs = initDefs(el)
    const gradientId = "vislite-lg-" + new Date().valueOf() + "-" + Math.random()

    const linearGradient = toNode("linearGradient")
    defs.appendChild(linearGradient)
    setAttribute(linearGradient, "id", gradientId)
    setAttribute(linearGradient, "x1", x0 + "%")
    setAttribute(linearGradient, "y1", y0 + "%")
    setAttribute(linearGradient, "x2", x1 + "%")
    setAttribute(linearGradient, "y2", y1 + "%")

    const enhanceGradient = {
        "value": function () {
            return "url(#" + gradientId + ")";
        },
        "setColor": function (stop: number, color: string) {

            const stopEl = toNode("stop")
            linearGradient.appendChild(stopEl)
            setAttribute(stopEl, "offset", (stop * 100) + "%")
            setAttribute(stopEl, "style", "stop-color:" + color + ";")

            return enhanceGradient
        }
    }
    return enhanceGradient
}

// 环形渐变
export const radialGradient = function (el: SVGElement, cx: number, cy: number, r: number) {

    const defs = initDefs(el)
    const gradientId = "vislite-rg-" + new Date().valueOf() + "-" + Math.random()

    const radialGradient = toNode("radialGradient")
    defs.appendChild(radialGradient)
    setAttribute(radialGradient, "id", gradientId)
    setAttribute(radialGradient, "cx", cx + "%")
    setAttribute(radialGradient, "cy", cy + "%")
    setAttribute(radialGradient, "r", r + "%")

    const enhanceGradient = {
        "value": function () {
            return "url(#" + gradientId + ")";
        },
        "setColor": function (stop: number, color: string) {

            const stopEl = toNode("stop")
            radialGradient.appendChild(stopEl)
            setAttribute(stopEl, "offset", (stop * 100) + "%")
            setAttribute(stopEl, "style", "stop-color:" + color + ";")

            return enhanceGradient
        }
    }
    return enhanceGradient
}
