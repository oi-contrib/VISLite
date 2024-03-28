import type { WebGLmodeType } from "../../../types/getWebGLContext"

interface OptsType {
    preserveDrawingBuffer?: boolean
}
export default function (canvas: HTMLCanvasElement, scale: number, opts: OptsType = {}, mode: WebGLmodeType = "scaleToFill") {
    const names = ["experimental-webgl", "webkit-3d", "moz-webgl"]
    let painter = canvas.getContext("webgl", opts) as WebGL2RenderingContext
    for (let i = 0; i < names.length; i++) {
        try {
            painter = canvas.getContext(names[i], opts) as WebGL2RenderingContext
        } catch (e) { }
        if (painter) break
    }
    if (!painter) throw new Error('Non canvas or browser does not support webgl.')

    const width = painter.canvas.width, height = painter.canvas.height

    let scaleX = scale, scaleY = scale
    if (mode == "aspectFit") {
        if (width > height) {
            scaleX *= height / width
        } else if (height > width) {
            scaleY *= width / height
        }
    } else if (mode == "aspectFill") {
        if (width > height) {
            scaleY *= width / height
        } else if (height > width) {
            scaleX *= height / width
        }
    }

    const viewWidth = width * scaleX
    const viewHeight = height * scaleY

    painter.viewport((width - viewWidth) * 0.5, (height - viewHeight) * 0.5, viewWidth, viewHeight)

    // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc
    painter.depthFunc(painter.LEQUAL)

    // 开启深度计算
    painter.enable(painter.DEPTH_TEST)

    return painter
}