/**
 * Hermite插值类型定义
 * 用于实现Hermite插值算法，支持基于点位置和斜率的平滑曲线插值
 */
export default interface HermiteType {

    /**
     * 设置插值点的位置和斜率
     * @param x1 左边点的x坐标
     * @param y1 左边点的y坐标
     * @param x2 右边点的x坐标
     * @param y2 右边点的y坐标
     * @param s1 左边点的斜率
     * @param s2 右边点的斜率
     * @returns 返回当前实例，支持链式调用
     */
    setP(x1: number, y1: number, x2: number, y2: number, s1: number, s2: number): this

    /**
     * 根据x值计算并返回对应的y值
     * @param x 输入的x值
     * @returns 计算得到的y值
     */
    use(x: number): number

}