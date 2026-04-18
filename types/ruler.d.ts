/**
 * 刻度尺配置选项类型定义
 */
export interface rulerOptionType {
    /** 最大值限制 */
    max?: number
    /** 最小值限制 */
    min?: number
}

/**
 * 刻度尺计算函数类型定义
 * 用于在给定范围内生成均匀的刻度值
 */
export default interface rulerType {
    /**
     * 生成刻度值数组
     * @param maxValue 数据最大值
     * @param minValue 数据最小值
     * @param num 期望的刻度数量
     * @param option 可选的配置选项
     * @returns 返回计算得到的刻度值数组
     */
    (maxValue: number, minValue: number, num: number, option?: rulerOptionType): number[]
}