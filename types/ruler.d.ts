export interface rulerOptionType {
    max?: number
    min?: number
}

/**
 * 刻度尺刻度运算，返回一个数组，表示刻度尺上应该显示的刻度
 */
export default interface rulerType {
    (maxValue: number, minValue: number, num: number, option?: rulerOptionType): number[]
}