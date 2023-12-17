/**
 * Cardinal三次插值
 * ----------------------------
 * Hermite拟合的计算是，确定两个点和两个点的斜率
 * 用一个y=ax(3)+bx(2)+cx+d的三次多项式来求解
 * 而Cardinal是建立在此基础上
 * 给定需要拟合的两个点和第一个点的前一个点+最后一个点的后一个点
 * 第一个点的斜率由第一个点的前一个点和第二个点的斜率确定
 * 第二个点的斜率由第一个点和第二个点的后一个点的斜率确定
 */

import type CardinalType from '../../types/Cardinal'

import Hermite from './Hermite'

class Cardinal implements CardinalType {
    readonly name: string = 'Cardinal'

    // 该参数用于调整曲线走势，默认数值t=0，分水岭t=-1，|t-(-1)|的值越大，曲线走势调整的越严重
    private __t: number

    private __HS: {
        x: number[],
        h: Hermite[]
    }
    private __i: number

    constructor(t: number = 0) {
        this.__t = t
    }

    // 设置点的位置
    // 参数格式：[[x1, y1], [x2, y2], ... ]
    // 至少两个点
    setP(points: number[][]) {

        this.__HS = {
            "x": [],
            "h": []
        };
        let flag: number,
            slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
            temp: number
        this.__HS.x[0] = points[0][0]
        for (flag = 1; flag < points.length; flag++) {
            if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!')
            this.__HS.x[flag] = points[flag][0]

            // 求点斜率

            // temp = flag < points.length - 1 ?
            //     (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) :
            //     (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0])

            // 修复超过界限的值问题
            // 2023年6月25日 于南京
            if (flag < points.length - 1) {
                if (
                    (points[flag + 1][1] > points[flag][1] && points[flag - 1][1] > points[flag][1]) ||
                    (points[flag + 1][1] < points[flag][1] && points[flag - 1][1] < points[flag][1]) ||
                    points[flag + 1][1] == points[flag][1] ||
                    points[flag - 1][1] == points[flag][1]
                ) {
                    temp = 0
                } else {
                    temp = (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0])
                }
            } else {
                temp = (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0])
            }

            // 求解两个点直接的插值方程
            // 第一个点的前一个点直接取第一个点
            // 最后一个点的后一个点直接取最后一个点
            this.__HS.h[flag - 1] = new Hermite((1 - this.__t) * 0.5).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp)
            slope = temp
        }
        return this

    }

    // 根据x值返回y值
    use(x: number) {
        if (this.__HS) {
            this.__i = -1

            // 寻找记录x所在位置的区间
            // 这里就是寻找对应的拟合函数
            while (this.__i + 1 < this.__HS.x.length && (x > this.__HS.x[this.__i + 1] || (this.__i == -1 && x >= this.__HS.x[this.__i + 1]))) {
                this.__i += 1
            }

            // 由于js浮点运算不准确，我们对于越界的情况进行兼容

            if (this.__i < 0) {
                return this.__HS.h[0].use(this.__HS.x[0])
            }

            else if (this.__i >= this.__HS.h.length) {
                return this.__HS.h[this.__HS.h.length - 1].use(this.__HS.x[this.__HS.x.length - 1])
            }

            return this.__HS.h[this.__i].use(x)
        } else {
            throw new Error('You shoud first set the position!')
        }
    }

}

export default Cardinal