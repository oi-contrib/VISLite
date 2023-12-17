import type Matrix4Type from '../../types/Matrix4'

// 两个4x4矩阵相乘
// 或矩阵和齐次坐标相乘
const _multiply = function (matrix4: number[], param: number[]) {
    const newParam: number[] = []
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < param.length / 4; j++)
            newParam[j * 4 + i] =
                matrix4[i] * param[j * 4] +
                matrix4[i + 4] * param[j * 4 + 1] +
                matrix4[i + 8] * param[j * 4 + 2] +
                matrix4[i + 12] * param[j * 4 + 3]
    return newParam
}

import _move from './move'
import _rotate from './rotate'
import _scale from './scale'
import _transform from './transform'

// 列主序存储的4x4矩阵

const __initMatrix4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

class Matrix4 implements Matrix4Type {
    readonly name: string = 'Matrix4'

    private __matrix4: number[]

    constructor(initMatrix4: number[] = __initMatrix4) {
        this.__matrix4 = initMatrix4
    }

    // 设置内置矩阵
    setValue(initMatrix4: number[] = __initMatrix4) {
        this.__matrix4 = initMatrix4
        return this
    }

    // 移动
    move(dis: number, a: number, b: number, c: number = 0) {
        this.__matrix4 = _multiply(_move(dis, a, b, c), this.__matrix4)
        return this
    }

    // 旋转
    rotate(deg: number, a1: number, b1: number, c1?: number, a2?: number, b2?: number, c2?: number) {
        const matrix4s = _transform(a1, b1, c1, a2, b2, c2)
        this.__matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), this.__matrix4)
        return this
    }

    // 缩放
    scale(xTimes: number, yTimes: number, zTimes: number, cx: number = 0, cy: number = 0, cz: number = 0) {
        this.__matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), this.__matrix4)
        return this
    }

    // 乘法
    // 可以传入一个矩阵(matrix4,flag)
    multiply(newMatrix4: number[], flag: boolean = false) {
        this.__matrix4 = flag ? _multiply(this.__matrix4, newMatrix4) : _multiply(newMatrix4, this.__matrix4)
        return this
    }

    // 对一个坐标应用变换
    // 齐次坐标(x,y,z,w)
    use(x: number, y: number, z: number = 0, w: number = 1): [number, number, number, number] {
        // w为0表示点位于无穷远处，忽略
        return _multiply(this.__matrix4, [x, y, z, w]) as [number, number, number, number]
    }

    // 矩阵的值
    value() {
        return this.__matrix4
    }
}

export default Matrix4