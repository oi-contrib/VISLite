import { arcCapType, textAlignType, textBaselineType } from './painterConfig'

export default interface SVGConfigType {

    /**
     * 填充色或图案，默认"#000"
     */
    fillStyle?: string

    /**
     * 轮廓色或图案，默认"#000"
     */
    strokeStyle?: string

    /**
     * 线条宽度，默认1(单位px)
     */
    lineWidth?: number

    /**
     * 文字水平对齐方式，默认"left"左对齐（还有"center"居中和"right"右对齐）
     */
    textAlign?: textAlignType

    /**
     * 文字垂直对齐方式，默认"middle"垂直居中（还有"top"上对齐和"bottom"下对齐）
     */
    textBaseline?: textBaselineType

    /**
     * 设置线条虚线，默认为[]表示使用实线绘制
     *
     * 值应该是一个数组，格式：[实线长，虚线长，实线长 ...]，数组长度任意，会自动循环
     */
    lineDash?: Array<number>

    /**
     * 文字大小，默认16
     */
    "fontSize"?: number

    /**
     * 已废弃，向下兼容，请用 fontSize 代替
     */
    "font-size"?: number // 向下兼容

    /**
     * 字体，默认"sans-serif"
     */
    "fontFamily"?: string

    /**
     * 已废弃，向下兼容，请用 fontFamily 代替
     */
    "font-family"?: string // 向下兼容

    /**
     * 圆弧开始端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合,"-round"反圆帽闭合）
     */
    "arcStartCap"?: arcCapType

    /**
     * 已废弃，向下兼容，请用 arcStartCap 代替
     */
    "arc-start-cap"?: string // 向下兼容

    /**
     * 圆弧结束端闭合方式，默认"butt"直线闭合（还有"round"圆帽闭合,"-round"反圆帽闭合）
     */
    "arcEndCap"?: arcCapType

    /**
     * 已废弃，向下兼容，请用 arcEndCap 代替
     */
    "arc-end-cap"?: string // 向下兼容

}