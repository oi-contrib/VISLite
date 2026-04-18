/**
 * Cardinal插值类型定义
 * 用于实现Cardinal插值算法，支持平滑曲线插值
 */
export default interface CardinalType {

    /**
     * 设置插值点的位置
     * @param points 参数格式：[[x1, y1], [x2, y2], ... ]，至少两个点
     * @returns 返回当前实例，支持链式调用
     */
    setP(points: number[][]): this

    /**
     * 根据x值计算并返回对应的y值
     * @param x 输入的x值
     * @returns 计算得到的y值
     */
    use(x: number): number

}