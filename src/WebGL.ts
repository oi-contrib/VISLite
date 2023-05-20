import WebGLType from '../types/WebGL'
import OralWebGL from './common/webgl/index'

class WebGL extends OralWebGL implements WebGLType {
    constructor(el: HTMLElement | null) {
        if (!el) {
            throw new Error("VISLite WebGL:The mount point requires an HTMLElement type but encountered null.")
        }

        let width = el.clientWidth, height = el.clientHeight

        let ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement

        let _el = el as any

        // 如果已经初始化过了
        if (_el._vislite_canvas_) {
            ViewCanvas = _el._vislite_canvas_[0]
            RegionCanvas = _el._vislite_canvas_[1]
        }

        // 否则就初始化
        else {
            ViewCanvas = document.createElement('canvas')
            el.appendChild(ViewCanvas)

            RegionCanvas = document.createElement('canvas')

            _el._vislite_canvas_ = [ViewCanvas, RegionCanvas]

            el.setAttribute('vislite', 'WebGL')
        }

        // 设置画布大小
        for (let canvas of [ViewCanvas, RegionCanvas]) {

            canvas.style.width = width + "px"
            canvas.setAttribute('width', width + "")

            canvas.style.height = height + "px"
            canvas.setAttribute('height', height + "")
        }

        super(ViewCanvas, RegionCanvas)
    }
}

export default WebGL