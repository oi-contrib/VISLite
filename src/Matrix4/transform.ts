/**
 * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
 * 计算出两个变换矩阵
 * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
 */
export default function (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number) {

    if (typeof a1 === 'number' && typeof b1 === 'number') {

        // 如果设置两个点
        // 表示二维上围绕某个点旋转
        if (typeof c1 !== 'number') {
            c1 = 0
            a2 = a1
            b2 = b1
            c2 = 1
        }
        // 只设置三个点(设置不足六个点都认为只设置了三个点)
        // 表示围绕从原点出发的射线旋转
        else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
            a2 = a1
            b2 = b1
            c2 = c1
            a1 = 0
            b1 = 0
            c1 = 0
        }

        if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!')

        const sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
            cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
            sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

            b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
            c = c2 - c1,

            sqrt2 = Math.sqrt(b * b + c * c),
            cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
            sin2 = sqrt2 != 0 ? b / sqrt2 : 0

        return [

            // 任意射线变成OZ轴变换矩阵
            [
                cos1, cos2 * sin1, sin1 * sin2, 0,
                -sin1, cos1 * cos2, cos1 * sin2, 0,
                0, -sin2, cos2, 0,
                b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
            ],

            // OZ轴变回原来的射线的变换矩阵
            [
                cos1, -sin1, 0, 0,
                cos2 * sin1, cos2 * cos1, -sin2, 0,
                sin1 * sin2, cos1 * sin2, cos2, 0,
                a1, b1, c1, 1
            ]

        ]
    } else {
        throw new Error('a1 and b1 is required!')
    }
}
