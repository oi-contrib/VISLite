import rotate from '../../rotate'

/**
 * 棱柱垂直部分
 * @param normal 是否需要法向量
 * @param x 中心
 * @param y
 * @param z
 * @param radius 半径
 * @param height 高
 * @param num 份数
 * @param beginDeg 开始弧度，默认0
 * @param deg 跨越弧度，默认2pi
 * @returns 点数组
 */
export default function (normal: boolean, x: number, y: number, z: number, radius: number, height: number, num: number, beginDeg: number = 0, deg: number = Math.PI * 2) {
    const points = []
    let beginPosition: [number, number]

    if (num == 4) {
        beginPosition = rotate(x, z, Math.PI * 0.25, x - radius, z)
    } else {
        beginPosition = [x + radius, z]
    }

    if (beginDeg != 0) {
        beginPosition = rotate(x, z, beginDeg, ...beginPosition)
    }

    const perDeg = deg / num, degHalf = deg / (num * 2)

    let endPosition: [number, number], normalPosition: [number, number, number] | [] = []
    for (let i = 0; i < num; i++) {

        endPosition = rotate(x, z, perDeg, ...beginPosition)

        if (normal) {
            const halfPosition = rotate(x, z, degHalf, ...beginPosition)
            normalPosition = [halfPosition[0], 0, halfPosition[1]]
        }

        points.push(beginPosition[0], y, beginPosition[1], ...normalPosition)
        points.push(beginPosition[0], y + height, beginPosition[1], ...normalPosition)
        points.push(endPosition[0], y + height, endPosition[1], ...normalPosition)

        points.push(beginPosition[0], y, beginPosition[1], ...normalPosition)
        points.push(endPosition[0], y, endPosition[1], ...normalPosition)
        points.push(endPosition[0], y + height, endPosition[1], ...normalPosition)


        beginPosition = endPosition
    }

    return points
}
