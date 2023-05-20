
// Eoap

import Eoap from '../../src/Eoap'

let eoap = new Eoap()
window.JSLitmus.test('Eoap', function () {
    eoap.use(45, 45)
})

// Mercator

import Mercator from '../../src/Mercator'

let mercator = new Mercator()
window.JSLitmus.test('Mercator', function () {
    mercator.use(45, 45)
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

// assemble

import assemble from "../../src/common/assemble"

let assembleFun1 = assemble(0, 1, 0.2, 3)
window.JSLitmus.test('assemble 0-1', function () {
    assembleFun1()
})

let assembleFun2 = assemble(0, 255, 1, 3)
window.JSLitmus.test('assemble 0-255', function () {
    assembleFun2()
})