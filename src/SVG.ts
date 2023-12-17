import type SVGType from '../types/SVG'

import OralSVG from './common/svg/index'

class SVG extends OralSVG implements SVGType {
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
    }
}

export default SVG