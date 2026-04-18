/**
 * 缩放变换函数类型定义
 * 用于计算二维坐标系中的缩放变换
 */
export default interface scaleType {
    /**
     * 计算缩放后的坐标
     * @param cx 缩放中心的x坐标
     * @param cy 缩放中心的y坐标
     * @param times 缩放倍数
     * @param x 原始点的x坐标
     * @param y 原始点的y坐标
     * @returns 返回缩放后的坐标 [newX, newY]
     */
    (cx: number, cy: number, times: number, x: number, y: number): [number, number]
}