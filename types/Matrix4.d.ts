export default interface Matrix4Type {

    /**
     * 返回matrix4当前记录的内部矩阵
     */
    value(): number[]

    /**
     * 两个矩阵相乘
     * @param newMatrix4
     * @param flag 可选，表示相乘位置，默认false，表示左乘
     */
    multiply(newMatrix4: number[], flag?: boolean): this

    /**
     * 把变换矩阵作用在具体的点上
     */
    use(x: number, y: number, z?: number, w?: number): [number, number, number, number]

    /**
     * 设置内置矩阵
     */
    setValue(initMatrix4?: number[]): this

    /**
     * 沿着向量(a, b, c)方向移动距离dis
     * （其中c可以不传，默认0）
     */
    move(dis: number, a: number, b: number, c?: number): this

    /**
     * 以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍
     * （其中cx、cy和cz都可以不传递，默认0）
     */
    scale(xTimes: number, yTimes: number, zTimes: number, cx?: number, cy?: number, cz?: number): this

    /**
     * 围绕射线(a1, b1, c1) -> (a2, b2, c2)旋转deg度
     * （方向由右手法则确定）
     *
     * a1、b1、c1、a2、b2和c2这6个值在设置的时候，不是一定需要全部设置，还有以下可选：
     *
     *      1）只设置了a1和b1，表示在xoy平面围绕（a1, b1）旋转
     *      2）设置三个点(设置不足六个点都认为只设置了三个点)，表示围绕从原点出发的射线旋转
     */
    rotate(deg: number, a1: number, b1: number, c1?: number, a2?: number, b2?: number, c2?: number): this

}