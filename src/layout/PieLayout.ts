import type PieLayoutType from '../../types/PieLayout'
import type { PieResultType } from '../../types/Pie'
import type PieOptionType from '../../types/PieOption'
import type { default as PieConfigType, nameType, valueType } from '../../types/PieConfig'

import { initOption } from '../common/option'
import rotate from '../rotate'
import { animation } from "oipage/web/animation/index"

class PieLayout implements PieLayoutType {
    readonly name: string = 'PieLayout'

    private __config: PieConfigType

    constructor(config: PieConfigType = {}) {
        this.__config = initOption(config, {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            name: (pieData: any, initPie: Array<any>) => pieData.name,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            value: (pieData: any, initPie: Array<any>) => pieData.value
        })
    }

    private __option = {
        cx: 200,
        cy: 200,
        radius: [50, 100],
        duration: 200,
    }

    setOption(option: PieOptionType) {
        initOption(option, this.__option)
        return this
    }

    private __rback: (pie: PieResultType) => void
    private __oralPie: any
    private __prePie: PieResultType | null

    private __hoverIndex = -1 // 表示当前悬浮的序号

    use(initPie: Array<any>, hoverIndex: number = -1) {
        const pie: PieResultType = {
            count: initPie.length,
            cx: this.__option.cx,
            cy: this.__option.cy,
            radius: this.__option.radius,
            hoverIndex,
            node: []
        }

        let totalValue = 0
        const names = [], values = []
        for (let i = 0; i < initPie.length; i++) {
            names[i] = (this.__config.name as nameType)(initPie[i], initPie)
            values[i] = (this.__config.value as valueType)(initPie[i], initPie)

            totalValue += values[i]
        }

        let beginDeg = Math.PI * -0.5, currenDeg
        for (let i = 0; i < initPie.length; i++) {
            currenDeg = values[i] / totalValue * Math.PI * 2
            const radius = [this.__option.radius[0], this.__option.radius[1] * (1 + (hoverIndex === i ? 0.05 : 0))]

            const pdeg = beginDeg + currenDeg * 0.5, pradius = Math.max(this.__option.radius[0], this.__option.radius[1])
            const p0 = rotate(pie.cx, pie.cy, pdeg, pie.cx + pradius, pie.cy)
            const p1 = rotate(pie.cx, pie.cy, pdeg, pie.cx + pradius + 15, pie.cy)

            const pflag = p0[0] > pie.cx ? 1 : -1
            const p2 = [p1[0] + pflag * 20, p1[1]]
            const p3 = [p1[0] + pflag * 25, p1[1]]

            pie.node[i] = {
                value: values[i],
                name: names[i],
                beginDeg,
                deg: currenDeg,
                isHover: hoverIndex === i,
                radius,
                label: {
                    line: [p0, p1, p2],
                    position: p3,
                    align: pflag === -1 ? "right" : "left"
                }
            }

            beginDeg += currenDeg
        }

        return pie
    }

    bind(initPie: Array<any>, renderBack: (pie: PieResultType) => void) {
        this.__rback = renderBack
        this.__oralPie = initPie

        this.__prePie = this.use(this.__oralPie, this.__hoverIndex)
        this.__rback(this.__prePie)

        return this
    }

    unbind() {
        this.__rback = () => null
        this.__oralPie = null
        this.__prePie = null
        this.__hoverIndex = -1
        return this
    }

    setHover(index: number) {
        if (!this.__prePie || this.__hoverIndex === index) return this

        this.__hoverIndex = index

        this.doUpdate()
        return this
    }

    doUpdate() {
        const newPie = this.use(this.__oralPie, this.__hoverIndex)

        const cachePie = JSON.parse(JSON.stringify(newPie))

        animation((deep) => {

            if (this.__prePie) {
                for (let i = 0; i < cachePie.count; i++) {
                    cachePie.node[i].radius[1] = this.__prePie.node[i].radius[1] + (newPie.node[i].radius[1] - this.__prePie.node[i].radius[1]) * deep
                }
            }

            this.__rback(cachePie)

        }, this.__option.duration, () => {
            this.__prePie = newPie
            this.__rback(this.__prePie)
        })

        return this
    }
}

export default PieLayout