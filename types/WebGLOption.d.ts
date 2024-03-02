import { WebGLmodeType } from "./getWebGLContext"

export default interface WebGLOptionType {

    /**
     * 是否支持区域管理，默认true
     */
    region?: boolean

    /**
     * 设置画布缩放模式，默认“scaleToFill“
     */
    mode?: WebGLmodeType

}