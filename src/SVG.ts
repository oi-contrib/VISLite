import type SVGType from '../types/SVG'

import OralSVG from './common/svg/index'

class SVG extends OralSVG implements SVGType {
    private __el: HTMLElement
    constructor(el: HTMLElement | null) {
        if (!el) {
            throw new Error("VISLite SVG:The mount point requires an HTMLElement type but encountered null.")
        }

        const width = el.clientWidth, height = el.clientHeight

        let ViewSVG: SVGElement

        const _el = el as any

        // 如果已经初始化过了
        if (_el._vislite_svg_) {
            ViewSVG = _el._vislite_svg_[0]
        } else {

            ViewSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
            el.appendChild(ViewSVG)

            ViewSVG.setAttribute("width", width + "")
            ViewSVG.setAttribute("height", height + "")

            ViewSVG.setAttribute("viewBox", "0 0 " + width + " " + height)

            _el._vislite_svg_ = [ViewSVG]

            el.setAttribute('vislite', 'SVG')
        }

        super(ViewSVG)

        this.__el = el
    }

    toDataURL(): Promise<string> {
        return new Promise((resolve, reject) => {
            const width = this.__el.clientWidth, height = this.__el.clientHeight

            const img = document.createElement('img');

            img.setAttribute('width', width + "");
            img.setAttribute('height', height + "");

            // 对SVG内容进行encodeURIComponent转义，避免"#"/中文等字符破坏data URI
            // 2026年9月22日
            const innerSVG = this.__svg.innerHTML.replace(/"/g, "'")
            const base64_svg = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
                "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>" + innerSVG + "</svg>"
            );
            img.setAttribute('src', base64_svg);

            // 监听onload以替代之前的固定 setTimeout(..., 100)
            // 复杂SVG在100ms内可能还未完成渲染，这里可以保证图片真正加载完成后才截图
            // 2026年9月22日 于南宁
            img.onload = () => {

                // 准备画布
                const canvas = document.createElement('canvas');
                canvas.setAttribute('width', width + "");
                canvas.setAttribute('height', height + "");

                const painter = canvas.getContext('2d');

                // 绘制截图
                if (painter) painter.drawImage(img, 0, 0, width, height);

                try {
                    resolve(canvas.toDataURL());
                } catch (e) {
                    reject(e);
                }
            }

            img.onerror = (e) => {
                reject(e)
            }
        })
    }
}

export default SVG