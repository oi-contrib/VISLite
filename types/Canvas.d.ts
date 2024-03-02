import CanvasConfigType from "./CanvasConfig"
import GradientType from "./Gradient"

export default interface CanvasType {
    /**
     * 配置画笔
     */
    config(configs: CanvasConfigType): this

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
     * 计算文字宽
     * @param text 需要计算宽的文字
     */
    textWidth(text: string): number

    /**
     * 绘制一个实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fillArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ): this

    /**
     * 绘制一个空心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    strokeArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ): this

    /**
     * 绘制一个空实心的圆弧
     * @param cx 圆弧的圆心x坐标
     * @param cy 圆弧的圆心y坐标
     * @param r1 圆弧的内半径
     * @param r2 圆弧的外半径
     * @param beginDeg 开始弧度
     * @param deg 跨越弧度
     */
    fullArc(
        cx: number,
        cy: number,
        r1: number,
        r2: number,
        beginDeg: number,
        deg: number
    ): this

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
    bezierCurveTo(
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        x: number,
        y: number
    ): this

    /**
     * 保存当前的绘图状态
     */
    save(): this

    /**
     * 恢复之前保存的绘图状态
     */
    restore(): this

    /**
     * 生成裁剪区域
     */
    clip(): this

    /**
     * 擦除画笔上的一个矩形区域
     * @param x 区域左上角X坐标
     * @param y 区域左上角y坐标
     * @param w 区域的宽
     * @param h 区域的高
     */
    clearRect(x: number, y: number, w: number, h: number): this

    /**
     * 是否绘制的内容只需要进行区域记录
     */
    onlyRegion(flag: boolean): this

    /**
     * 设置区域
     */
    setRegion(regionName: string | number): this

    /**
     * 获取区域
     */
    getRegion(x: number, y: number): Promise<string>

    /**
     * 把画布变成url
     */
    toDataURL(): Promise<string>

    /**
     * 获取原生画笔
     * @param isRegion 是否是区域
     */
    getContext(isRegion?: boolean): CanvasRenderingContext2D | null

    /**
     * 获取画布信息
     */
    getInfo(): {
        width: number
        height: number
    }

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
    ): GradientType<CanvasGradient>

    /**
     * 创建环形渐变
     * @param cx 中心
     * @param cy
     * @param r 半径
     */
    createRadialGradient(cx: number, cy: number, r: number): GradientType<CanvasGradient>

    /**
     * 获取指定位置颜色
     * @param x
     * @param y
     */
    getColor(x: number, y: number): string

    /**
     * 渲染绘制（uniapp独有）
     * @param reserve 是否保留当前画布上的内容
     * @param callback 绘制完成后回调
     */
    draw(reserve?: boolean, callback?: Function): void

    /**
     * 绘制图片
     * @param img 需要绘制的图片
     * @param x
     * @param y
     * @param w
     * @param h
     */
    drawImage(img: CanvasImageSource | string, x: number, y: number, w: number, h: number, isUniapp?: boolean): Promise<any>
}
