/**
 * 步进生成器函数类型定义
 * 用于生成步进序列数据
 */
export default interface assembleType {
    /**
     * 创建步进序列生成器
     * @param begin 起始值
     * @param end 结束值
     * @param step 步长
     * @param count 元素个数
     * @returns 返回一个生成器函数，调用后返回数组
     */
    (begin: number, end: number, step: number, count: number): () => Array<number>
}