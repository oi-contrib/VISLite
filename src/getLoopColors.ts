// 获取一组循环色彩
export default function (num: number, alpha: number = 1) {
    // 颜色集合
    const colorList = [
        'rgba(84,112,198,' + alpha + ")", 'rgba(145,204,117,' + alpha + ")",
        'rgba(250,200,88,' + alpha + ")", 'rgba(238,102,102,' + alpha + ")",
        'rgba(115,192,222,' + alpha + ")", 'rgba(59,162,114,' + alpha + ")",
        'rgba(252,132,82,' + alpha + ")", 'rgba(154,96,180,' + alpha + ")",
        'rgba(234,124,204,' + alpha + ")"
    ]

    let colors: string[] = []

    // 根据情况返回颜色数组
    if (num <= colorList.length) {
        // 这种情况就不需要任何处理
        return colorList
    } else {
        // 如果正好是集合长度的倍数
        if (num % colorList.length == 0) {
            // 将颜色数组循环加入后再返回
            for (let i = 0; i < (num / colorList.length); i++) {
                colors = colors.concat(colorList)
            }
        } else {
            for (let j = 1; j < (num / colorList.length); j++) {
                colors = colors.concat(colorList)
            }
            // 防止最后一个颜色和第一个颜色重复
            if (num % colorList.length == 1) {
                colors = colors.concat(colorList[4])
            } else {
                for (let k = 0; k < num % colorList.length; k++) {
                    colors = colors.concat(colorList[k])
                }
            }
        }
    }

    // 返回结果
    return colors
}
