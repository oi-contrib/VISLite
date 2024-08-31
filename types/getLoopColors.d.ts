/**
 * 获取一组循环色彩
 */
export default interface getLoopColorsType {
    (num: number, alpha?: number, colorsFactory?: (alpha: number) => Array<string>): string[]
}