// 刻度尺刻度求解

import type { rulerOptionType } from '../types/ruler'

// 需要注意的是，实际的间距个数可能是 num-1 或 num 或 num+1 或 1
export default function (maxValue: number, minValue: number, num: number, option?: rulerOptionType) {

    // 如果最大值最小值反了
    if (maxValue < minValue) {
        const temp = minValue
        minValue = maxValue
        maxValue = temp
    }

    // 如果相等
    else if (maxValue == minValue) {
        return [maxValue]
    }

    // 为了变成 -100 ~ 100 需要放大或者缩小的倍数
    const times100 =

        (function (_value) {

            // 先确定基调，是放大还是缩小
            const _times100_base = (_value < 100 && _value > -100) ? 10 : 0.1

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
    const distance100_oral = Math.ceil((maxValue - minValue) * times100 / num)

    const getResult = (changValue: number) => {
        // 校对一下
        const distance100 = {
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
        }[distance100_oral + changValue] || (distance100_oral + changValue)

        const distance = distance100 / times100

        // 最小值，也就是起点
        const begin = Math.floor(minValue / distance) * distance

        const rulerArray = []
        // 获取最终的刻度尺数组
        rulerArray.push(begin)
        for (let index = 1; rulerArray[rulerArray.length - 1] < maxValue; index++) {
            rulerArray.push(begin + distance * index)
        }

        return rulerArray
    }

    let rulerArray = getResult(0)

    const balanceMax = () => {
        const rulerArray_temp = []

        const changeDist = rulerArray[rulerArray.length - 1] - (option?.max as number)
        for (let index = 0; index < rulerArray.length; index++) {
            if (index + 1 < rulerArray.length && rulerArray[index + 1] - changeDist < minValue) {
                // 多余的
            } else {
                rulerArray_temp.push(rulerArray[index] - changeDist)
            }
        }

        return rulerArray_temp
    }

    const balanceMin = () => {
        const rulerArray_temp = []

        const changeDist = rulerArray[0] - (option?.min as number)
        for (let index = 0; index < rulerArray.length; index++) {
            rulerArray_temp[index] = rulerArray[index] - changeDist
            if (maxValue <= rulerArray_temp[index]) break
        }

        return rulerArray_temp
    }

    if (option) {

        // 上下界限制
        if ('max' in option && 'min' in option && (option.max as number) >= maxValue && (option.min as number) <= minValue) {

            const isAnswer = () => {

                // 先判断原始的是否可行
                if (rulerArray[0] >= (option.min as number) && rulerArray[rulerArray.length - 1] <= (option.max as number)) return true

                // 再判断max调整是否可行
                const rulerArray_max = balanceMax()
                if (rulerArray_max[0] >= (option.min as number) && rulerArray_max[rulerArray_max.length - 1] <= (option.max as number)) {
                    rulerArray = rulerArray_max
                    return true
                }

                // 再判断max调整是否可行
                const rulerArray_min = balanceMin()
                if (rulerArray_min[0] >= (option.min as number) && rulerArray_min[rulerArray_max.length - 1] <= (option.max as number)) {
                    rulerArray = rulerArray_min
                    return true
                }

            }

            if (isAnswer()) return rulerArray

            for (let changValue = 1; changValue < 100; changValue++) {

                rulerArray = getResult(changValue)
                if (isAnswer()) return rulerArray

                rulerArray = getResult(-changValue)
                if (isAnswer()) return rulerArray

            }
        }

        // 单界限制
        if ('max' in option && (option.max as number) >= maxValue) {

            // 上越界了
            if ((option.max as number) < rulerArray[rulerArray.length - 1]) {
                rulerArray = balanceMax()
            }
        } else if ('min' in option && (option.min as number) <= minValue) {

            // 下越界了
            if ((option.min as number) > rulerArray[0]) {
                rulerArray = balanceMin()
            }
        }
    }

    // 对结果进行对齐
    // 2023年11月15日 于南京
    for (let index = 0; index < rulerArray.length; index++) {
        let valStr = rulerArray[index] + ""

        // 只有小数需要处理
        if (/\./.test(valStr)) {

            // 1.0999999999999999
            if (/9{7,}$/.test(valStr)) {
                valStr = valStr.replace(/9{7,}$/, '')
                rulerArray[index] = +(valStr.substring(0, valStr.length - 1) + ((+valStr[valStr.length - 1]) + 1))
            }

            // 0.30000000000000004
            else if (/0{7,}\d$/.test(valStr)) {
                rulerArray[index] = +(valStr.replace(/0{7,}\d$/, ''))
            }
        }
    }

    return rulerArray
}