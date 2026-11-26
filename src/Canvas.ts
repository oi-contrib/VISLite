import type CanvasType from '../types/Canvas'
import type CanvasOptionType from '../types/CanvasOption'

import OralCanvas from './common/canvas/index'
import { initOption } from './common/option'

class Canvas extends OralCanvas implements CanvasType {
    private __canvas: HTMLCanvasElement
    private __el: HTMLElement
    constructor(el: HTMLElement | null, option: CanvasOptionType = {}, width: number = 0, height: number = 0) {
        if (!el) {
            throw new Error("VISLite Canvas:The mount point requires an HTMLElement type but encountered null.")
        }

        option = initOption(option, {

            // 对外暴露自定义缩放倍率（为满足特殊场景，以简化使用）
            // 2025年7月25日 于秦皇岛
            scale: 2,

            region: true,
            willReadFrequently: false
        })

        width = width || el.clientWidth
        height = height || el.clientHeight

        let ViewCanvas: HTMLCanvasElement | null = null, RegionCanvas: HTMLCanvasElement | null = null

        const _el = el as any
        const cached = _el._vislite_canvas_

        // 兼容历史缓存：可能是数组（Canvas 创建），也可能是单个画布（旧版 WebGL 创建）
        if (Array.isArray(cached)) {
            ViewCanvas = cached[0] || null
            RegionCanvas = cached[1] || null
        } else if (cached) {
            ViewCanvas = cached
        }

        // 缓存丢失，或画布已经被 WebGL 等其它画笔占用（无法再获取 2d 上下文），则重建
        if (!ViewCanvas || !ViewCanvas.getContext || !ViewCanvas.getContext('2d')) {
            ViewCanvas = document.createElement('canvas')
            el.appendChild(ViewCanvas)

            RegionCanvas = option.region ? document.createElement('canvas') : null
            _el._vislite_canvas_ = [ViewCanvas, RegionCanvas]
            el.setAttribute('vislite', 'Canvas')
        }

        // 设置画布大小
        const canvasArray = [RegionCanvas, ViewCanvas]
        for (let index = 0; index < canvasArray.length; index++) {
            const canvas = canvasArray[index]
            if (canvas) {
                canvas.style.width = width + "px"
                canvas.setAttribute('width', ((index === 1 ? option.scale as number : 1) * width) + "")

                canvas.style.height = height + "px"
                canvas.setAttribute('height', ((index === 1 ? option.scale as number : 1) * height) + "")
            }
        }

        super(ViewCanvas, RegionCanvas, {
            willReadFrequently: option.willReadFrequently,
        }, option.scale)

        this.__canvas = ViewCanvas
        this.__el = el
        this.painter.scale(option.scale as number, option.scale as number)
    }

    toDataURL(type: string = "image/png", encoderOptions: number = 0.92): Promise<string> {
        return new Promise(resolve => {
            resolve(this.__canvas.toDataURL(type, encoderOptions))
        })
    }

    // 事件绑定记录，用于解绑和销毁
    private __listeners: Array<{ type: string, handler: (event: any) => void }> = []

    bind(eventName: string, callback: (regionName: string, x: number, y: number) => void) {
        const handler = (event: any) => {
            let x = event.offsetX, y = event.offsetY

            // touch 等事件没有 offsetX/offsetY，根据鼠标或触点位置换算
            if (typeof x !== "number" || typeof y !== "number") {
                const point = (event.touches && event.touches[0]) ||
                    (event.changedTouches && event.changedTouches[0]) || event
                const rect = this.__canvas.getBoundingClientRect()
                x = point.clientX - rect.left
                y = point.clientY - rect.top
            }

            this.getRegion(x, y).then(regionName => {
                callback(regionName, x, y)
            })
        }

        this.__el.addEventListener(eventName, handler)
        this.__listeners.push({ type: eventName, handler })
        return this
    }

    // 解绑事件，不传递名称表示全部解绑
    off(eventName?: string) {
        for (let index = this.__listeners.length - 1; index >= 0; index--) {
            const item = this.__listeners[index]
            if (!eventName || item.type === eventName) {
                this.__el.removeEventListener(item.type, item.handler)
                this.__listeners.splice(index, 1)
            }
        }
        return this
    }

    // 销毁画笔：解绑事件、移除创建的画布
    destroy() {
        this.off()

        if (this.__canvas && this.__canvas.parentNode) {
            this.__canvas.parentNode.removeChild(this.__canvas)
        }

        const _el = this.__el as any
        if (Array.isArray(_el._vislite_canvas_) && _el._vislite_canvas_[0] === this.__canvas) {
            delete _el._vislite_canvas_
        }
        return this
    }
}

export default Canvas