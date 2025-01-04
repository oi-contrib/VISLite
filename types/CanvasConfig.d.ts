import { arcCapType, textAlignType, textBaselineType, lineCapType, lineJoinType } from './painterConfig'

export default interface CanvasConfigType {

    /**
     * 填充色或图案，默认"#000"
     */
    fillStyle?: string | CanvasGradient

    /**
     * 轮廓色或图案，默认"#000"
     */
    strokeStyle?: string | CanvasGradient

    /**
     * 线条宽度，默认1(单位px)
     */
    lineWidth?: number

    /**
     * 线的端点类型，默认"butt"平直边缘（还有"round"半圆和"square"矩形）
     */
    lineCap?: lineCapType

    /**
     * 线的拐角连接方式，默认"miter"连接处边缘延长相接（还有"bevel"对角线斜角和"round"圆）
     */
    lineJoin?: lineJoinType

    /**
     * 设置线条虚线，默认为[]表示使用实线绘制
     *
     * 值应该是一个数组，格式：[实线长，虚线长，实线长 ...]，数组长度任意，会自动循环
     */
    lineDash?: Array<number>

    /**
     * 文字水平对齐方式，默认"left"左对齐（还有"center"居中和"right"右对齐）
     */
    textAlign?: textAlignType

    /**
     * 文字垂直对齐方式，默认"middle"垂直居中（还有"top"上对齐和"bottom"下对齐）
     */
    textBaseline?: textBaselineType

    /**
     * 阴影的模糊系数，默认0，也就是无阴影
     */
    shadowBlur?: number

    /**
     * 阴影的颜色
     */
    shadowColor?: string | CanvasGradient

    /**
     * 文字大小，默认16
     */
    fontSize?: number

    /**
     * 字体，默认"sans-serif"
     */
    fontFamily?: string

    /**
     * 字重，默认400
     */
    fontWeight?: number

    /**
     * 字类型，默认"normal"
     */
    fontStyle?: string

    /**
     * 圆弧开始端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合,"-round"反圆帽闭合）
     */
    arcStartCap?: arcCapType

    /**
     * 圆弧结束端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合,"-round"反圆帽闭合）
     */
    arcEndCap?: arcCapType

    // 矩形圆角半径
    rectRadius?: Array<number>
}