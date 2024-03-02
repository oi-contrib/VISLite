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
import triangles from "./common/geometry/tool/triangles"
import rotate from "./rotate"

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

    /**
     * 【1】辅助方法
     */

    // 计算切割份数
    splitNum(radius: number, deg?: number) {
        return splitNum(this.__option.precision as number, radius, deg)
    }

    // 物体方向转换
    rotateLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
        const rotateLine = rotateLineFactory(x1, y1, z1, x2, y2, z2)
        return (x: number, y: number, z: number) => rotateLine(x, y, z, this.__option.normal as boolean)
    }

    /**
     * 【2】立方片段
     */

    // 棱柱水平部分
    prismHorizontal(x: number, y: number, z: number, radius: number, num: number, d: number, beginDeg?: number, deg?: number) {
        return prismHorizontal(this.__option.normal as boolean, x, y, z, radius, num, d, beginDeg, deg)
    }

    // 棱柱垂直部分
    prismVertical(x: number, y: number, z: number, radius: number, height: number, num: number, beginDeg?: number, deg?: number) {
        return prismVertical(this.__option.normal as boolean, x, y, z, radius, height, num, beginDeg, deg)
    }

    // 球体中的一瓣子
    sphereFragment(cx: number, cy: number, cz: number, radius: number, num: number, index: number) {
        return sphereFragment(this.__option.normal as boolean, cx, cy, cz, radius, num, index)
    }

    /**
     * 【3】立方体
     */

    // 饼柱体
    pie(x: number, y: number, z: number, radius: number, height: number, beginDeg: number, deg: number): Array<GeometryResultType> {

        // 求解出需要切割多少份比较合理
        const num = splitNum(this.__option.precision as number, radius, deg)

        const beginXZ = rotate(x, z, beginDeg, x + radius, z)
        const endXZ = rotate(x, z, beginDeg + deg, x + radius, z)

        const result = [{
            name: "bottom",
            points: prismHorizontal(this.__option.normal as boolean, x, y, z, radius, num as number, height > 0 ? -1 : 1, beginDeg, deg),
            length: 3 * num,
            method: "TRIANGLES" as const
        }, {
            name: "top",
            points: prismHorizontal(this.__option.normal as boolean, x, y + height, z, radius, num as number, height > 0 ? 1 : -1, beginDeg, deg),
            length: 3 * num,
            method: "TRIANGLES" as const
        }, {
            name: "side",
            points: prismVertical(this.__option.normal as boolean, x, y, z, radius, height, num as number, beginDeg, deg),
            length: 6 * num,
            method: "TRIANGLES" as const
        }, {
            name: "begin",
            points: triangles(this.__option.normal as boolean, [
                x, y, z, x, y + height, z, beginXZ[0], y, beginXZ[1],
                beginXZ[0], y + height, beginXZ[1], beginXZ[0], y, beginXZ[1], x, y + height, z
            ]),
            length: 6,
            method: "TRIANGLES" as const
        }, {
            name: "end",
            points: triangles(this.__option.normal as boolean, [
                x, y, z, endXZ[0], y, endXZ[1], x, y + height, z,
                endXZ[0], y + height, endXZ[1], x, y + height, z, endXZ[0], y, endXZ[1]
            ]),
            length: 6,
            method: "TRIANGLES" as const
        }]

        return result
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
            height = (y > y2 ? -1 : 1) * Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) + (z2 as number - z) * (z2 as number - z))
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