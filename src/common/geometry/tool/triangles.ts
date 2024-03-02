/**
 * 方向：ab x ac
 * @param normal 是否需要法向量
 * @param points [a1, b1, c1, a2, b2, c2, ...]
 * @returns 完整的点数据
 */
export default function (normal: boolean, points: Array<number>) {
    if (normal) {
        const _points = []
        for (let i = 0; i < points.length; i += 9) {
            const ab = [points[i + 3] - points[i], points[i + 4] - points[i + 1], points[i + 5] - points[i + 2]]
            const ac = [points[i + 6] - points[i], points[i + 7] - points[i + 1], points[i + 8] - points[i + 2]]
            const normalVector = [ab[1] * ac[2] - ac[1] * ab[2], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[2]]
            _points.push(
                points[i], points[i + 1], points[i + 2], ...normalVector,
                points[i + 3], points[i + 4], points[i + 5], ...normalVector,
                points[i + 6], points[i + 7], points[i + 8], ...normalVector,
            )
        }
        return _points
    } else {
        return points
    }
}