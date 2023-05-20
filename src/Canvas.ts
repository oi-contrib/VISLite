import CanvasType from '../types/Canvas'
import OralCanvas from './common/canvas/index'

class Canvas extends OralCanvas implements CanvasType {
    private __canvas: HTMLCanvasElement
    constructor(el: HTMLElement | null) {
        if (!el) {
            throw new Error("VISLite Canvas:The mount point requires an HTMLElement type but encountered null.")
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

            el.setAttribute('vislite', 'Canvas')
        }

        // 设置画布大小
        for (let canvas of [ViewCanvas, RegionCanvas]) {

            canvas.style.width = width + "px"
            canvas.setAttribute('width', width + "")

            canvas.style.height = height + "px"
            canvas.setAttribute('height', height + "")
        }

        super(ViewCanvas, RegionCanvas)

        this.__canvas = ViewCanvas
    }

    toDataURL(): Promise<string> {
        return new Promise(resolve => {
            resolve(this.__canvas.toDataURL())
        })
    }
}

export default Canvas