import { toFixed7 } from './tool'
import rotate from "../src/rotate"
import move from "../src/move"
import scale from '../src/scale'

describe('坐标变换(简单)', function () {

    it('rotate', function () {
        expect(toFixed7(rotate(0, 0, Math.PI, 1, 0))).toEqual([-1, 0])
    })

    it('move', function () {
        expect(toFixed7(move(0, 1, 2, 0, 0))).toEqual([0, 2])
        expect(toFixed7(move(3, 4, 5, 3, 4))).toEqual([6, 8])
    })

    it('scale', function () {
        expect(toFixed7(scale(0, 0, 3, 1, 1))).toEqual([3, 3])
    })

})

import Matrix4 from "../src/Matrix4/index"

describe('坐标变换(矩阵) / 旋转矩阵', function () {

    it('2D旋转', function () {
        let rotate2D = new Matrix4().rotate(Math.PI / 2, 2, 1).use(2, 0)
        expect(toFixed7(rotate2D)).toEqual([3, 1, 0, 1])
    })

    it('来自圆心的射线旋转', function () {
        let rotateLine = new Matrix4().rotate(Math.PI / 3 * 2, 1, 1, 1).use(0, 1, 0)
        expect(toFixed7(rotateLine)).toEqual([-0, 0, 1, 1])
    })

    it('任意射线旋转', function () {
        let rotate3D = new Matrix4().rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(1, 1, 1)
        expect(toFixed7(rotate3D)).toEqual([2, -0, 1, 1])
    })

})

describe('坐标变换(矩阵) / 缩放矩阵', function () {

    it('立体缩放', function () {
        let scale = new Matrix4().scale(1, 2, 7, 3, 4, 1).use(0, 0, 1)
        expect(toFixed7(scale)).toEqual([0, -4, 1, 1])
    })

})

describe('坐标变换(矩阵) / 移动矩阵', function () {

    it('平面移动', function () {
        let move2D = new Matrix4().move(5, 3, 4).use(1, 2)
        expect(toFixed7(move2D)).toEqual([4, 6, 0, 1])
    })

    it('立体移动', function () {
        let move3D = new Matrix4().move(5, 3, 4, 0).use(1, 1, 1)
        expect(toFixed7(move3D)).toEqual([4, 5, 1, 1])
    })

})

describe('坐标变换(矩阵) / 多变换矩阵', function () {

    it('缩放-》移动-》旋转', function () {
        let multiTransform = new Matrix4().scale(0.5, 0.5, 0.5, 1, 0, 0).move(Math.sqrt(14), -1, -2, -3).rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(3, 6, 8)
        expect(toFixed7(multiTransform)).toEqual([2, -0, 1, 1])
    })

})