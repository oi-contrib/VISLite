export type WebGLmodeType = "scaleToFill" | "aspectFit" | "aspectFill"

/**
 * 获取WebGL上下文对象
 */
export default interface getWebGLContextType {
    (el: HTMLElement | null, scale?: number, mode?: WebGLmodeType): WebGLRenderingContext
}