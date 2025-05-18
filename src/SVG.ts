import type SVGType from '../types/SVG'

import OralSVG from './common/svg/index'

class SVG extends OralSVG implements SVGType {
    private __el: HTMLElement
    constructor(el: HTMLElement | null) {
        if (!el) {
            throw new Error("VISLite SVG:The mount point requires an HTMLElement type but encountered null.")
        }

        const width = el.clientWidth, height = el.clientHeight

        const ViewSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        el.appendChild(ViewSVG)

        ViewSVG.setAttribute("width", width + "")
        ViewSVG.setAttribute("height", height + "")

        ViewSVG.setAttribute("viewBox", "0 0 " + width + " " + height)

        super(ViewSVG)

        this.__el = el
    }

    toDataURL(): Promise<string> {
        return new Promise(resolve => {
            const width = this.__el.clientWidth, height = this.__el.clientHeight

            let img = document.createElement('img');

            img.setAttribute('width', width + "");
            img.setAttribute('height', height + "");
            let base64_svg = "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>" + this.__svg.innerHTML.replace(/"/g, "'") + "</svg>";
            img.setAttribute('src', base64_svg);

            setTimeout(function () {

                // 准备画布
                let canvas = document.createElement('canvas');
                canvas.setAttribute('width', width + "");
                canvas.setAttribute('height', height + "");

                let painter = canvas.getContext('2d');

                // 绘制截图
                if (painter) painter.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL());
            }, 100);
        })
    }
}

export default SVG