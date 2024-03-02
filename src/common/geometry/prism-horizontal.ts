import rotate from '../../rotate'

/**
 * 棱柱水平部分
 * @param normal 是否需要法向量
 * @param x 中心
 * @param y
 * @param z
 * @param radius 半径
 * @param num 份数
 * @param d 方向（用于 表示是底还是顶，方便计算法向量）
 * @param beginDeg 开始弧度，默认0
 * @param deg 跨越弧度，默认2pi
 * @returns 点数组
 */
export default function (normal: boolean, x: number, y: number, z: number, radius: number, num: number, d: number, beginDeg: number = 0, deg: number = Math.PI * 2) {

    let beginX: number, beginZ: number
    if (num == 4) {
        const temp = radius / 1.414
        beginX = x + temp
        beginZ = z + temp

    } else {
        beginX = x + radius
        beginZ = z
    }

    let point = [beginX, beginZ]
    if (beginDeg != 0) {
        point = rotate(x, z, beginDeg, beginX, beginZ)
    }

    const points = []
    const perDeg = deg / num
    for (let i = 0; i < num; i++) {

        points.push(x, y, z)
        if (normal) points.push(0, d, 0)

        points.push(point[0], y, point[1])
        if (normal) points.push(0, d, 0)

        point = rotate(x, z, perDeg * (i + 1), beginX, beginZ)
        points.push(point[0], y, point[1])
        if (normal) points.push(0, d, 0)
    }

    return points
}
