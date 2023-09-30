import rotate from '../../rotate'

// 棱柱水平部分

export default function (normal: boolean, x: number, y: number, z: number, radius: number, num: number, d: number) {

    let beginX: number, beginZ: number
    if (num == 4) {
        let temp = radius / 1.414
        beginX = x + temp
        beginZ = z + temp

    } else {
        beginX = x + radius
        beginZ = z
    }

    let point = [beginX, beginZ], points = [], deg = Math.PI * 2 / num
    for (let i = 0; i < num; i++) {

        points.push(x, y, z)
        if (normal) points.push(0, d, 0)

        points.push(point[0], y, point[1])
        if (normal) points.push(0, d, 0)

        point = rotate(x, z, deg * (i + 1), beginX, beginZ)
        points.push(point[0], y, point[1])
        if (normal) points.push(0, d, 0)
    }

    return points
}
