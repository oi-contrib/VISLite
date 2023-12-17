import rotate from '../../rotate'

// 棱柱垂直部分

export default function (normal: boolean, x: number, y: number, z: number, radius: number, height: number, num: number) {
    const points = []
    let beginPosition: [number, number]

    if (num == 4) {
        beginPosition = rotate(x, z, Math.PI * 0.25, x - radius, z)
    } else {
        beginPosition = [x + radius, z]
    }

    const deg = Math.PI * 2 / num, degHalf = Math.PI * 2 / (num * 2)

    let endPosition: [number, number], normalPosition = []
    for (let i = 0; i < num; i++) {

        endPosition = rotate(x, z, deg, ...beginPosition)

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
