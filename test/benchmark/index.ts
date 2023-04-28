
// Eoap

import Eoap from '../../src/Eoap'

let eoap = new Eoap()
window.JSLitmus.test('eoap', function () {
    eoap.use(45, 45)
})

// rotate

import rotate from "../../src/rotate"

window.JSLitmus.test('rotate', function () {
    rotate(0, 0, Math.PI, 1, 0)
})

// Matrix4

import Matrix4 from "../../src/Matrix4/index"

let matrix1 = new Matrix4()
window.JSLitmus.test('Matrix4 / rotate', function () {
    matrix1.rotate(Math.PI / 2, 2, 1)
})

let matrix2 = new Matrix4()
window.JSLitmus.test('Matrix4 / scale', function () {
    matrix2.scale(1, 2, 7, 3, 4, 1)
})

let matrix3 = new Matrix4()
window.JSLitmus.test('Matrix4 / move', function () {
    matrix3.move(5, 3, 4)
})
