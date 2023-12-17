/**
 * 围绕0Z轴旋转
 * 其它的旋转可以借助transform实现
 * 旋转角度单位采用弧度制
 */
export default function (deg: number) {
    const sin = Math.sin(deg),
        cos = Math.cos(deg)
    return [
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}
