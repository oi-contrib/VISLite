import type CanvasType from '../types/Canvas'
import type CanvasOptionType from '../types/CanvasOption'

import OralCanvas from './common/canvas/index'
import mergeOption from './common/mergeOption'

class Canvas extends OralCanvas implements CanvasType {
    private __canvas: HTMLCanvasElement
    constructor(el: HTMLElement | null, option: CanvasOptionType = {}) {
        if (!el) {
            throw new Error("VISLite Canvas:The mount point requires an HTMLElement type but encountered null.")
        }

        option = mergeOption(option, {
            region: true,
            willReadFrequently: false
        })

        const width = el.clientWidth, height = el.clientHeight

        let ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement | null = null

        const _el = el as any

        // 如果已经初始化过了
        if (_el._vislite_canvas_) {
            ViewCanvas = _el._vislite_canvas_[0]
            RegionCanvas = _el._vislite_canvas_[1]
        }

        // 否则就初始化
        else {
            ViewCanvas = document.createElement('canvas')
            el.appendChild(ViewCanvas)

            if (option.region) {
                RegionCanvas = document.createElement('canvas')
            }

            _el._vislite_canvas_ = [ViewCanvas, RegionCanvas]

            el.setAttribute('vislite', 'Canvas')
        }

        // 设置画布大小
        const canvasArray = [RegionCanvas, ViewCanvas]
        for (let index = 0; index < canvasArray.length; index++) {
            const canvas = canvasArray[index]
            if (canvas) {
                canvas.style.width = width + "px"
                canvas.setAttribute('width', (index * width + width) + "")

                canvas.style.height = height + "px"
                canvas.setAttribute('height', (index * height + height) + "")
            }
        }

        super(ViewCanvas, RegionCanvas, {
            willReadFrequently: option.willReadFrequently,
        }, 2)

        this.__canvas = ViewCanvas
        this.painter.scale(2, 2)
    }

    toDataURL(): Promise<string> {
        return new Promise(resolve => {
            resolve(this.__canvas.toDataURL())
        })
    }
}

export default Canvas