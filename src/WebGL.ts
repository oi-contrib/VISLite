import type WebGLOptionType from '../types/WebGLOption'
import type WebGLType from '../types/WebGL'

import OralWebGL from './common/webgl/index'
import mergeOption from './common/mergeOption'

class WebGL extends OralWebGL implements WebGLType {
    constructor(el: HTMLElement | null, option: WebGLOptionType = {}) {
        if (!el) {
            throw new Error("VISLite WebGL:The mount point requires an HTMLElement type but encountered null.")
        }

        option = mergeOption(option, {
            region: true
        })

        const width = el.clientWidth, height = el.clientHeight

        let ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement

        const _el = el as any

        // 如果已经初始化过了
        if (_el._vislite_canvas_) {
            ViewCanvas = _el._vislite_canvas_[0]
            RegionCanvas = _el._vislite_canvas_[1]
        }

        // 否则就初始化
        else {

            if (option.region) {

                RegionCanvas = document.createElement('canvas')
                el.appendChild(RegionCanvas)

                RegionCanvas.style.position = 'absolute'
                RegionCanvas.style.zIndex = "-1"
                RegionCanvas.style.opacity = "0"

            }

            ViewCanvas = document.createElement('canvas')
            el.appendChild(ViewCanvas)

            _el._vislite_canvas_ = [ViewCanvas, RegionCanvas]

            el.setAttribute('vislite', 'WebGL')
        }

        // 设置画布大小
        for (const canvas of [ViewCanvas, RegionCanvas]) {

            if (canvas) {
                canvas.style.width = width + "px"
                canvas.setAttribute('width', width + "")

                canvas.style.height = height + "px"
                canvas.setAttribute('height', height + "")
            }
        }

        super(ViewCanvas, RegionCanvas)
    }
}

export default WebGL