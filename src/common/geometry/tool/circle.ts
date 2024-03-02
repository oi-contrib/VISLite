/**
 * 计算切割份数
 * @param precision 精度
 * @param radius 半径
 * @param deg 需要跨越的弧度，默认圆（2pi）
 * @returns 切割份数
 */
export const splitNum = function (precision: number, radius: number, deg: number = Math.PI * 2) {

    // 根据切割弧度得出切割块数目
    const num = Math.ceil(deg /

        // 为了满足最小精度而得出的切割弧度
        Math.asin(precision / radius) * 2)

    return (isNaN(num) || num < 12) ? 12 : num

}