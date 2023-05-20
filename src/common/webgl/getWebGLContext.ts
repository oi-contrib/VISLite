interface OptsType {
    preserveDrawingBuffer?: boolean
}
export default function (canvas: HTMLCanvasElement, opts: OptsType = {}) {
    let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], painter = null
    for (let i = 0; i < names.length; i++) {
        try {
            painter = canvas.getContext(names[i], opts)
        } catch (e) { }
        if (painter) break
    }
    if (!painter) throw new Error('Non canvas or browser does not support webgl.')

    // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc
    painter.depthFunc(painter.LEQUAL)

    // 开启深度计算
    painter.enable(painter.DEPTH_TEST);

    return painter
}