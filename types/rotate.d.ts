/**
 * 旋转变换函数类型定义
 * 用于计算二维坐标系中的旋转变换
 */
export default interface rotateType {
    /**
     * 计算旋转后的坐标
     * @param cx 旋转中心的x坐标
     * @param cy 旋转中心的y坐标
     * @param deg 旋转角度（度）
     * @param x 原始点的x坐标
     * @param y 原始点的y坐标
     * @returns 返回旋转后的坐标 [newX, newY]
     */
    (cx: number, cy: number, deg: number, x: number, y: number): [number, number]
}