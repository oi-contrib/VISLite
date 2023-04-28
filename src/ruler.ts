// 刻度尺刻度求解

// 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1
export default function (maxValue: number, minValue: number, num: number) {

    // 如果最大值最小值反了
    if (maxValue < minValue) {
        let temp = minValue
        minValue = maxValue
        maxValue = temp
    }

    // 如果相等
    else if (maxValue == minValue) {
        return [maxValue]
    }

    // 为了变成 -100 ~ 100 需要放大或者缩小的倍数
    let times100 =

        (function (_value) {

            // 先确定基调，是放大还是缩小
            let _times100_base = (_value < 100 && _value > -100) ? 10 : 0.1

            // 记录当前缩放倍数
            let _times100 = -1, _tiemsValue = _value

            while (_times100_base == 10 ?
                // 如果是放大，超过 -100 ~ 100 就应该停止
                (_tiemsValue >= -100 && _tiemsValue <= 100)
                :
                // 如果是缩小，进入 -100 ~ 100 就应该停止
                (_tiemsValue <= -100 || _tiemsValue >= 100)
            ) {

                _times100 += 1
                _tiemsValue *= _times100_base

            }

            if (_times100_base == 10) {
                return Math.pow(10, _times100)
            } else {

                // 解决类似 0.1 * 0.1 = 0.010000000000000002 浮点运算不准确问题
                let temp = "0."
                for (let i = 1; i < _times100; i++) {
                    temp += "0";
                }
                return +(temp + "1")
            }
        })

            // 根据差值来缩放
            (maxValue - minValue)


    // 求解出 -100 ~ 100 的最佳间距值 后直接转换原来的倍数
    let distance100 = Math.ceil((maxValue - minValue) * times100 / num)

    // 校对一下
    distance100 = {
        3: 2,
        4: 5,
        6: 5,
        7: 5,
        8: 10,
        9: 10,
        11: 10,
        12: 10,
        13: 15,
        14: 15,
        16: 15,
        17: 15,
        18: 20,
        19: 20,
        21: 20,
        22: 20,
        23: 25,
        24: 25,
        26: 25,
        27: 25
    }[distance100] || distance100

    let distance = distance100 / times100

    // 最小值，也就是起点
    let begin = Math.floor(minValue / distance) * distance

    let rulerArray = []
    // 获取最终的刻度尺数组
    rulerArray.push(begin)
    for (let index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
        rulerArray.push(begin + distance * index)
    }

    return rulerArray
}
