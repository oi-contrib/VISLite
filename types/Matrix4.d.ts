/**
 * 4x4矩阵类型定义
 * 用于实现3D变换矩阵的各种操作，包括平移、旋转、缩放等
 */
export default interface Matrix4Type {

    /**
     * 获取当前矩阵的内部数值表示
     * @returns 返回4x4矩阵的16个元素，按列优先顺序排列
     */
    value(): number[]

    /**
     * 矩阵乘法运算
     * @param newMatrix4 要相乘的矩阵
     * @param flag 可选参数，表示相乘位置。默认为false，表示左乘（newMatrix4 * this）；为true时表示右乘（this * newMatrix4）
     * @returns 返回当前实例，支持链式调用
     */
    multiply(newMatrix4: number[], flag?: boolean): this

    /**
     * 将变换矩阵应用于指定坐标点
     * @param x x坐标
     * @param y y坐标
     * @param z z坐标，可选，默认为0
     * @param w w坐标，可选，默认为1
     * @returns 变换后的四维坐标 [x', y', z', w']
     */
    use(x: number, y: number, z?: number, w?: number): [number, number, number, number]

    /**
     * 设置矩阵的初始值
     * @param initMatrix4 可选的初始矩阵值，如果不提供则使用单位矩阵
     * @returns 返回当前实例，支持链式调用
     */
    setValue(initMatrix4?: number[]): this

    /**
     * 沿指定向量方向平移
     * @param dis 平移距离
     * @param a 向量x分量
     * @param b 向量y分量
     * @param c 向量z分量，可选，默认为0
     * @returns 返回当前实例，支持链式调用
     */
    move(dis: number, a: number, b: number, c?: number): this

    /**
     * 以指定点为中心进行缩放
     * @param xTimes x方向缩放倍数
     * @param yTimes y方向缩放倍数
     * @param zTimes z方向缩放倍数
     * @param cx 中心点x坐标，可选，默认为0
     * @param cy 中心点y坐标，可选，默认为0
     * @param cz 中心点z坐标，可选，默认为0
     * @returns 返回当前实例，支持链式调用
     */
    scale(xTimes: number, yTimes: number, zTimes: number, cx?: number, cy?: number, cz?: number): this

    /**
     * 围绕指定射线旋转
     * @param deg 旋转角度（度）
     * @param a1 射线起点x坐标
     * @param b1 射线起点y坐标
     * @param c1 射线起点z坐标，可选
     * @param a2 射线终点x坐标，可选
     * @param b2 射线终点y坐标，可选
     * @param c2 射线终点z坐标，可选
     *
     * 参数说明：
     * 1）只设置a1和b1：表示在xoy平面围绕点(a1, b1)旋转
     * 2）设置三个点（不足六个点）：表示围绕从原点出发的射线旋转
     * 3）设置六个点：表示围绕指定射线旋转
     *
     * 旋转方向由右手法则确定
     * @returns 返回当前实例，支持链式调用
     */
    rotate(deg: number, a1: number, b1: number, c1?: number, a2?: number, b2?: number, c2?: number): this

}