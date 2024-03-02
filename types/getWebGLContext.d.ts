export type WebGLmodeType = "scaleToFill" | "aspectFit" | "aspectFill"

export default interface getWebGLContextType {
    (el: HTMLElement | null, scale?: number, mode?: WebGLmodeType): WebGLRenderingContext
}