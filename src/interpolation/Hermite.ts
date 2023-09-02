import type HermiteType from '../../types/Hermite'

class Hermite implements HermiteType {
    readonly name: string = 'Hermite'

    private __u: number // 张弛系数

    private __MR: number[]
    private __a: number
    private __b: number

    constructor(u: number = 0.5) {
        this.__u = u
    }

    /**
    * 设置点的位置
    * @param {Number} x1 左边点的位置
    * @param {Number} y1
    * @param {Number} x2 右边点的位置
    * @param {Number} y2
    * @param {Number} s1 两个点的斜率
    * @param {Number} s2
    */
    setP(x1: number, y1: number, x2: number, y2: number, s1: number, s2: number) {
        if (x1 < x2) {
            // 记录原始尺寸
            this.__a = x1
            this.__b = x2
            let p3 = this.__u * s1,
                p4 = this.__u * s2
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1)
            y2 /= (x2 - x1)
            // MR是提前计算好的多项式通解矩阵
            // 为了加速计算
            // 如上面说的
            // 统一在[0,1]上计算后再通过缩放和移动恢复
            // 避免了动态求解矩阵的麻烦
            this.__MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ]
        } else throw new Error('The point x-position should be increamented!')
        return this
    }


    /**
     * 根据x值返回y值
     * @param {Number} x
     */
    use(x: number) {
        if (this.__MR) {
            let sx = (x - this.__a) / (this.__b - this.__a),
                sx2 = sx * sx,
                sx3 = sx * sx2
            let sResult = sx3 * this.__MR[0] + sx2 * this.__MR[1] + sx * this.__MR[2] + this.__MR[3]
            return sResult * (this.__b - this.__a)
        } else throw new Error('You shoud first set the position!')
    }
}

export default Hermite