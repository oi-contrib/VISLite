export default interface CardinalType {

    /**
     * 设置点的位置：
     * @param points 参数格式：[[x1, y1], [x2, y2], ... ]，至少两个点
     */
    setP(points: number[][]): this

    /**
     * 根据x值返回y值：
     */
    use(x: number): number

}