import Object3DType from './Object3D'
import Matrix4Type from './Matrix4'

export default interface WebGLType {

    matrix(initMatrix4?: number[]): Matrix4Type

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
     * 返回变换矩阵
     */
    getMatrix(): Matrix4Type

    /**
     * 返回所有的Object3D内容
     */
    getObject3D(): Object3DType[]

    /**
     * 设置区域
     */
    setRegion(regionName: string | number): this

    /**
     * 获取区域
     */
    getRegion(x: number, y: number): Promise<string>

}