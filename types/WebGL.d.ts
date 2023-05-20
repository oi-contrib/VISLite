import Object3DType from './Object3D'

export default interface WebGLType {

    /**
     * 使用模型数据绘制
     * @param object3D 记录着的模型数据
     */
    render(object3D: Object3DType): void

    /**
     * 重新绘制
     */
    review(): this

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