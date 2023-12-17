/**
 * 在(a,b,c)方向位移d
 */
export default function (d: number, a: number, b: number, c: number = 0) {
    const sqrt = Math.sqrt(a * a + b * b + c * c)
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
    ]
}
