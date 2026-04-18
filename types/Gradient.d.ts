/**
 * 渐变类型定义
 * 用于创建和管理线性、径向等渐变效果
 */
export default interface GradientType<T> {

    /**
     * 设置渐变颜色停止点
     * @param stop 停止点位置（0-1）
     * @param color 颜色值
     * @returns 返回当前实例，支持链式调用
     */
    setColor(stop: number, color: string): this

    /**
     * 获取渐变对象
     * @returns 返回渐变对象实例
     */
    value(): T

}