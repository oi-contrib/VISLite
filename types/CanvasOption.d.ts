import CanvasOptsType from "./CanvasOpts"

export default interface CanvasOptionType extends CanvasOptsType {

    /**
     * 缩放倍率，默认2
     */
    scale?: number

    /**
     * 是否支持区域管理，默认true
     */
    region?: boolean
}