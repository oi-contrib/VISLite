export interface rulerOptionType {
    max?: number
    min?: number
}

export default interface rulerType {
    (maxValue: number, minValue: number, num: number, option?: rulerOptionType): number[]
}