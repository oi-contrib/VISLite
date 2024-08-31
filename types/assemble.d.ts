/**
 * 步进生成器
 */
export default interface assembleType {
    (begin: number, end: number, step: number, count: number): () => Array<number>
}