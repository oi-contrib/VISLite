import type GeometryType from "../types/Geometry"
import type GeometryOptionType from "../types/GeometryOption"
import type GeometryResultType from "../types/GeometryResult"

import { splitNum } from './common/geometry/tool/circle'
import prismHorizontal from './common/geometry/prism-horizontal'
import prismVertical from './common/geometry/prism-vertical'
import sphereFragment from './common/geometry/sphere-fragment'
import mergeOption from './common/mergeOption'

class Geometry implements GeometryType {
    readonly name: string = 'Geometry'

    private __option: GeometryOptionType

    constructor(option: GeometryOptionType = {}) {
        this.__option = mergeOption(option, {
            precision: 0.1, // 精度
            normal: false, // 是否需要法向量
        })
    }

    config(option: GeometryOptionType) {
        for (let key in option) {
            this.__option[key] = option[key]
        }
        return this
    }

    // 圆柱体
    cylinder(x: number, y: number, z: number, radius: number, height: number): Array<GeometryResultType> {

        // 求解出需要切割多少份比较合理
        let num = splitNum(this.__option.precision, radius)
        return this.prism(x, y, z, radius, height, num)
    }

    // 棱柱体
    prism(x: number, y: number, z: number, radius: number, height: number, num: number): Array<GeometryResultType> {

        let result = [{
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }]

        // 绘制底部的盖子
        result[0].points.push(...prismHorizontal(this.__option.normal, x, y, z, radius, num, height > 0 ? -1 : 1))

        // 绘制顶部的盖子
        result[0].points.push(...prismHorizontal(this.__option.normal, x, y + height, z, radius, num, height > 0 ? 1 : -1))

        // 绘制侧边部分
        result[0].points.push(...prismVertical(this.__option.normal, x, y, z, radius, height, num))

        result[0].length = 12 * num
        return result
    }

    // 球体
    sphere(cx: number, cy: number, cz: number, radius: number): Array<GeometryResultType> {

        // 求解出需要切割多少份比较合理
        let num = splitNum(this.__option.precision, radius)

        // 然后一瓣瓣的绘制
        let result = [{
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }]
        for (let i = 0; i < num; i++) {
            result[0].points.push(...sphereFragment(this.__option.normal, cx, cy, cz, radius, num, i))
        }

        result[0].length = result[0].points.length / (this.__option.normal ? 6 : 3)

        return result
    }

}

export default Geometry