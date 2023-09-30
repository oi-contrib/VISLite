// 计算切割份数
export let splitNum = function (precision: number, radius: number) {

    // 根据切割弧度得出切割块数目
    let num = Math.ceil(Math.PI * 2 /

        // 为了满足最小精度而得出的切割弧度
        Math.asin(precision / radius) * 2)

    return (isNaN(num) || num < 12) ? 12 : num

}