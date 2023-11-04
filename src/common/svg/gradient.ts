import { initDefs } from './config'
import { toNode, setAttribute } from "./tool"

// 线性渐变
export let linearGradient = function (el: SVGElement, x0: number, y0: number, x1: number, y1: number) {

    let defs = initDefs(el)
    let gradientId = "vislite-lg-" + new Date().valueOf() + "-" + Math.random()

    let linearGradient = toNode("linearGradient")
    defs.appendChild(linearGradient)
    setAttribute(linearGradient, "id", gradientId)
    setAttribute(linearGradient, "x1", x0 + "%")
    setAttribute(linearGradient, "y1", y0 + "%")
    setAttribute(linearGradient, "x2", x1 + "%")
    setAttribute(linearGradient, "y2", y1 + "%")

    let enhanceGradient = {
        "value": function () {
            return "url(#" + gradientId + ")";
        },
        "setColor": function (stop: number, color: string) {

            let stopEl = toNode("stop")
            linearGradient.appendChild(stopEl)
            setAttribute(stopEl, "offset", (stop * 100) + "%")
            setAttribute(stopEl, "style", "stop-color:" + color + ";")

            return enhanceGradient
        }
    }
    return enhanceGradient
}

// 环形渐变
export let radialGradient = function (el: SVGElement, cx: number, cy: number, r: number) {

    let defs = initDefs(el)
    let gradientId = "vislite-rg-" + new Date().valueOf() + "-" + Math.random()

    let radialGradient = toNode("radialGradient")
    defs.appendChild(radialGradient)
    setAttribute(radialGradient, "id", gradientId)
    setAttribute(radialGradient, "cx", cx + "%")
    setAttribute(radialGradient, "cy", cy + "%")
    setAttribute(radialGradient, "r", r + "%")

    let enhanceGradient = {
        "value": function () {
            return "url(#" + gradientId + ")";
        },
        "setColor": function (stop: number, color: string) {

            let stopEl = toNode("stop")
            radialGradient.appendChild(stopEl)
            setAttribute(stopEl, "offset", (stop * 100) + "%")
            setAttribute(stopEl, "style", "stop-color:" + color + ";")

            return enhanceGradient
        }
    }
    return enhanceGradient
}
