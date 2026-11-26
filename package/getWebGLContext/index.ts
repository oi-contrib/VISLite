import getWebGLContext from "../../src/common/webgl/getWebGLContext"
import type { WebGLmodeType } from "../../types/getWebGLContext"

export default (el: HTMLElement | null, scale: number = 1, mode?: WebGLmodeType) => {
    if (!el) {
        throw new Error("VISLite getWebGLContext:The mount point requires an HTMLElement type but encountered null.")
    }

    const width = el.clientWidth, height = el.clientHeight

    let ViewCanvas: HTMLCanvasElement | null = null

    const _el = el as any

    // 优先使用 WebGL 专属缓存，避免和 Canvas 画笔共用 _vislite_canvas_ 而互相覆盖
    // 2026年11月25日 于南京
    if (_el._vislite_webgl_canvas_) {
        ViewCanvas = _el._vislite_webgl_canvas_
    }

    // 兼容旧版缓存：老版本把 WebGL 画布存放在 _vislite_canvas_ 上（单个元素，不是数组）
    else if (_el._vislite_canvas_ && !Array.isArray(_el._vislite_canvas_)) {
        ViewCanvas = _el._vislite_canvas_
    }

    // 否则就初始化
    if (!ViewCanvas) {

        ViewCanvas = document.createElement('canvas')
        el.appendChild(ViewCanvas)

        _el._vislite_webgl_canvas_ = ViewCanvas

        el.setAttribute('vislite', 'WebGL')

    }

    // 设置画布大小

    ViewCanvas.style.width = width + "px"
    ViewCanvas.setAttribute('width', width + "")

    ViewCanvas.style.height = height + "px"
    ViewCanvas.setAttribute('height', height + "")

    return getWebGLContext(ViewCanvas, scale, {}, mode)
}