export default interface HermiteType {

    /**
     * 设置点的位置和斜率：
     * @param x1 左边点的位置
     * @param y1
     * @param x2 右边点的位置
     * @param y2
     * @param s1 两个点的斜率
     * @param s2
     */
    setP(x1: number, y1: number, x2: number, y2: number, s1: number, s2: number): this

    /**
     * 根据x值返回y值：
     */
    use(x: number): number

}