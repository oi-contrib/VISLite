import SVGConfigType from './SVGConfig'
import GradientType from "./Gradient"

export default interface SVGType {

    /**
     * 配置画笔
     */
    config(configs: SVGConfigType): this

    /**
     * 标记应用节点
     */
    useEl(el: SVGElement): this

    /**
     * 获取当前应用的节点
     */
    getEl(): SVGElement

    /**
     * 追加节点
     */
    appendEl(el: string | SVGElement, context?: SVGElement): this

    /**
     * 追加绘制板
     */
    appendBoard(el: string | SVGElement, context?: SVGElement): this

    /**
     * 删除当前维护的节点
     */
    remove(): this

    /**
     * 设置或获取节点属性
     */
    attr(params?: any): any

    /**
     * 绘制一个实心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    fillText(text: any, x: number, y: number, deg?: number): this

    /**
     * 绘制一个空心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    strokeText(text: any, x: number, y: number, deg?: number): this

    /**
     * 绘制一个空实心文字
     * @param text 需要绘制的文字
     * @param x 绘制位置的x坐标
     * @param y 绘制位置的y坐标
     * @param deg 可选，文字旋转角度
     */
    fullText(text: any, x: number, y: number, deg?: number): this

    /**
     * 绘制一个实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fillArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): this

    /**
     * 绘制一个空心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    strokeArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): this

    /**
     * 绘制一个空实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fullArc(cx: number, cy: number, r1: number, r2: number, beginDeg: number, deg: number): this

    /**
     * 绘制一个实心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    fillCircle(cx: number, cy: number, r: number): this

    /**
     * 绘制一个空心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    strokeCircle(cx: number, cy: number, r: number): this

    /**
     * 绘制一个空实心的圆
     * @param cx 圆心x坐标
     * @param cy 圆心y坐标
     * @param r 圆的半径
     */
    fullCircle(cx: number, cy: number, r: number): this

    /**
     * 绘制一个实心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    fillRect(x: number, y: number, width: number, height: number): this

    /**
     * 绘制一个空心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    strokeRect(x: number, y: number, width: number, height: number): this

    /**
     * 绘制一个空实心的矩形
     * @param x 可选，区域左上角X坐标
     * @param y 可选，区域左上角y坐标
     * @param width 可选，区域的宽
     * @param height 可选，区域的高
     */
    fullRect(x: number, y: number, width: number, height: number): this

    /**
     * 开始一段独立的路径
     */
    beginPath(): this

    /**
     * 闭合当前路径，也就是路径首尾闭合
     */
    closePath(): this

    /**
     * 画笔移动到点(x, y)，此时笔离开了画布
     */
    moveTo(x: number, y: number): this

    /**
     * 画笔移动到点(x, y)，此时笔没有离开画布
     */
    lineTo(x: number, y: number): this

    /**
     * 以(cx, cy)为圆心，半径r，从弧度beginDeg开始，跨越弧度deg画弧，此时笔没有离开画布
     */
    arc(cx: number, cy: number, r: number, beginDeg: number, deg: number): this

    /**
     * 二次贝塞尔曲线到
     * @param cpx 控制点x坐标
     * @param cpy 控制点y坐标
     * @param x 终点x坐标
     * @param y 终点y坐标
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this

    /**
     * 三次贝塞尔曲线到
     * @param cpx1 控制点1的x坐标
     * @param cpy1 控制点1的y坐标
     * @param cpx2 控制点2的x坐标
     * @param cpy2 控制点2的y坐标
     * @param x 终点x坐标
     * @param y 终点y坐标
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this

    /**
     * 把当前路径包裹的区域填充颜色
     */
    fill(): this

    /**
     * 把当前路径上色（轮廓线）
     */
    stroke(): this

    /**
     * 把当前路径画上轮廓线并填充颜色到当前路径所包裹的区域
     */
    full(): this

    /**
     * 绑定事件
     */
    bind(eventType: string, callback: (event: Event, target: SVGElement) => void): this

    /**
    * 创建线性渐变
    * @param x0 起点
    * @param y0
    * @param x1 终点
    * @param y1
    */
    createLinearGradient(
        x0: number,
        y0: number,
        x1: number,
        y1: number
    ): GradientType<string>

    /**
     * 创建环形渐变
     * @param cx 中心
     * @param cy
     * @param r 半径
     */
    createRadialGradient(cx: number, cy: number, r: number): GradientType<string>

}