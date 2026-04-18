/**
 * 平移变换函数类型定义
 * 用于计算二维坐标系中的平移变换
 */
export default interface moveType {
    /**
     * 计算平移后的坐标
     * @param ax 平移向量的x分量
     * @param ay 平移向量的y分量
     * @param d 平移距离
     * @param x 原始点的x坐标
     * @param y 原始点的y坐标
     * @returns 返回平移后的坐标 [newX, newY]
     */
    (ax: number, ay: number, d: number, x: number, y: number): [number, number]
}