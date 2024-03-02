import getWebGLContext from "../../src/common/webgl/getWebGLContext"
import type { WebGLmodeType } from "../../types/getWebGLContext"

export default (el: HTMLElement | null, scale: number = 1, mode?: WebGLmodeType) => {
    if (!el) {
        throw new Error("VISLite getWebGLContext:The mount point requires an HTMLElement type but encountered null.")
    }

    let width = el.clientWidth, height = el.clientHeight

    let ViewCanvas: HTMLCanvasElement

    let _el = el as any

    // 如果已经初始化过了
    if (_el._vislite_canvas_) {
        ViewCanvas = _el._vislite_canvas_
    }

    // 否则就初始化
    else {

        ViewCanvas = document.createElement('canvas')
        el.appendChild(ViewCanvas)

        _el._vislite_canvas_ = ViewCanvas

        el.setAttribute('vislite', 'WebGL')

    }

    // 设置画布大小

    ViewCanvas.style.width = width + "px"
    ViewCanvas.setAttribute('width', width + "")

    ViewCanvas.style.height = height + "px"
    ViewCanvas.setAttribute('height', height + "")

    return getWebGLContext(ViewCanvas, scale, {}, mode)
}