/**
 * 循环颜色获取函数类型定义
 * 用于生成指定数量的循环色彩数组
 */
export default interface getLoopColorsType {
    /**
     * 生成循环色彩数组
     * @param num 需要生成的颜色数量
     * @param alpha 颜色透明度，可选，默认为1
     * @param colorsFactory 自定义颜色工厂函数，可选
     * @returns 返回生成的颜色数组
     */
    (num: number, alpha?: number, colorsFactory?: (alpha: number) => Array<string>): string[]
}