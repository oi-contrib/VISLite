import type GeometryType from "../types/Geometry"
import type GeometryOptionType from "../types/GeometryOption"
import type GeometryResultType from "../types/GeometryResult"

type rotateLineType = (x0: number, y0: number, z0: number, isNormal: boolean) => Array<number>

import { splitNum } from './common/geometry/tool/circle'
import prismHorizontal from './common/geometry/prism-horizontal'
import prismVertical from './common/geometry/prism-vertical'
import sphereFragment from './common/geometry/sphere-fragment'
import mergeOption from './common/mergeOption'
import rotateLineFactory from "./common/geometry/tool/rotateLine"

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
        for (const key in option) {
            this.__option[key] = option[key]
        }
        return this
    }

    // 圆柱体
    cylinder(x: number, y: number, z: number, radius: number, x2: number, y2?: number, z2?: number): Array<GeometryResultType> {

        // 求解出需要切割多少份比较合理
        const num = splitNum(this.__option.precision as number, radius)

        if (arguments.length == 5) {
            return this.prism(x, y, z, radius, x2, num)
        } else {
            return this.prism(x, y, z, radius, x2, y2 as number, z2, num)
        }
    }

    // 棱柱体
    prism(x: number, y: number, z: number, radius: number, x2: number, y2: number, z2?: number, num?: number): Array<GeometryResultType> {


        let height: number, rotateLine: rotateLineType | null = null

        if (arguments.length == 6) {
            height = x2
            num = y2
        } else {
            height = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) + (z2 as number - z) * (z2 as number - z))
            rotateLine = rotateLineFactory(x, y, z, x2, y2, z2 as number)
        }

        const result = [{
            name: "bottom",
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }, {
            name: "top",
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }, {
            name: "side",
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }]

            // 绘制底部的盖子
            ; (result[0].points as Array<number>).push(...prismHorizontal(this.__option.normal as boolean, x, y, z, radius, num as number, height > 0 ? -1 : 1))

            // 绘制顶部的盖子
            ; (result[1].points as Array<number>).push(...prismHorizontal(this.__option.normal as boolean, x, y + height, z, radius, num as number, height > 0 ? 1 : -1))

            // 绘制侧边部分
            ; (result[2].points as Array<number>).push(...prismVertical(this.__option.normal as boolean, x, y, z, radius, height, num as number))

        for (let i = 0; i < result.length; i++) {
            if (rotateLine) {

                const points = []
                let isNormal = false
                for (let index = 0; index < result[i].points.length; index += 3) {
                    points.push(...rotateLine(result[i].points[index], result[i].points[index + 1], result[i].points[index + 2], (this.__option.normal as boolean) && isNormal))
                    isNormal = !isNormal
                }
                (result[i].points as Array<number>) = points
            }
            result[i].length = result[i].points.length / (this.__option.normal ? 6 : 3)
        }

        return result
    }

    // 球体
    sphere(cx: number, cy: number, cz: number, radius: number): Array<GeometryResultType> {

        // 求解出需要切割多少份比较合理
        const num = splitNum(this.__option.precision as number, radius)

        // 然后一瓣瓣的绘制
        const result = [{
            name: "surface",
            points: [],
            length: 0,
            method: "TRIANGLES" as const
        }]
        for (let i = 0; i < num; i++) {
            ; (result[0].points as Array<number>).push(...sphereFragment(this.__option.normal as boolean, cx, cy, cz, radius, num, i))
        }

        result[0].length = result[0].points.length / (this.__option.normal ? 6 : 3)

        return result
    }

}

export default Geometry