export default interface GradientType {

    /**
     * 设置程度颜色
     * @param stop 程度
     * @param color 颜色
     */
    setColor(stop: number, color: string): this

    /**
     * 返回渐变色值
     */
    value(): CanvasGradient

}