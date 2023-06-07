import Object3D from './Object3D'
import Matrix4Type from './Matrix4'

export default interface Scene3D {
    children: Object3D[]
    matrix: Matrix4Type
}        