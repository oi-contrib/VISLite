import { geometryType } from './Object3D'

export default interface GeometryResultType {

    /**
     * 点数据（法向量如果有也包含其中）
     */
    points: number[]

    /**
     * 点个数
     */
    length: number

    /**
     * 画笔类型
     */
    method: geometryType
}