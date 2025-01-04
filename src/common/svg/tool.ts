import type SVGConfigType from '../../../types/SVGConfig'

import { XLINK_ATTRIBUTE } from "./dictionary"

const setLineAttr = (el: SVGElement, config: SVGConfigType) => {
    setAttribute(el, "stroke-dasharray", (config.lineDash as Array<number>).join(','))
    setAttribute(el, "stroke-width", config.lineWidth + "")
    setAttribute(el, "stroke-linecap", config.lineCap + "")
    setAttribute(el, "stroke-linejoin", config.lineJoin + "")
}

// 新建节点
export function toNode(tagname: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagname)
}

// 设置属性
const _setAttribute = function (el: SVGElement, key: string, value: string | number) {

    // 需要使用xlink命名空间的xml属性
    if (XLINK_ATTRIBUTE.indexOf(key) > -1) {
        el.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:' + key, value + "")
    }

    // 否则
    else {
        el.setAttribute(key, value + "")
    }
}
export const setAttribute = _setAttribute

// 获取属性
export function getAttribute(el: SVGElement, key: string) {
    if (XLINK_ATTRIBUTE.indexOf(key) > -1) key = 'xlink:' + key
    return el.getAttribute(key)
}

export function full(el: SVGElement, config: SVGConfigType) {
    setLineAttr(el, config)
    _setAttribute(el, "stroke", config.strokeStyle as string)
    _setAttribute(el, "fill", config.fillStyle as string)
}

export function fill(el: SVGElement, config: SVGConfigType) {
    _setAttribute(el, "fill", config.fillStyle as string)
}

export function stroke(el: SVGElement, config: SVGConfigType) {
    setLineAttr(el, config)
    _setAttribute(el, "stroke", config.strokeStyle as string)
    _setAttribute(el, "fill", "none")
}