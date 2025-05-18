export default interface BarOptionType {

    /**
     * 直方图左下角横坐标
     */
    x?: number

    /**
     * 直方图左下角纵坐标
     */
    y?: number

    /**
     * 直方图宽
     */
    width?: number

    /**
     * 直方图高
     */
    height?: number

    /**
     * 直方图分类刻度尺
     */
    category?: "xAxis" | "yAxis"

    /**
    * 切换时长
    */
    duration?: number
}