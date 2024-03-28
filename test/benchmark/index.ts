// ruler

import ruler from '../../src/ruler'
window.JSLitmus.test('ruler / 需要小数对齐', function () {
    ruler(1.45, 1.17, 4)
})

window.JSLitmus.test('ruler / 小数不需要对齐', function () {
    ruler(1.4, 1.17, 4)
})

window.JSLitmus.test('ruler / 整数', function () {
    ruler(2, 98, 5)
})

window.JSLitmus.test('ruler / 控制界对照组', function () {
    ruler(23.97, 97, 6, {

    })
})

window.JSLitmus.test('ruler / 控制界', function () {
    ruler(23.97, 97, 6, {
        max: 98,
        min: 22
    })
})

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

window.JSLitmus.test('Matrix4 / 新建+value()', function () {
    new Matrix4().value()
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

// WebGL相关

import ShaderObject from '../../src/common/webgl/shader'
import getWebGLContext from '../../src/common/webgl/getWebGLContext'

import vertexShader from "./vshader.c"
import fragmentShader from "./fshader.c"

let gl = getWebGLContext(document.getElementById('mywebgl') as HTMLCanvasElement, 4)

window.JSLitmus.test('WebGL / 着色器', function () {
    new ShaderObject(gl).compile(vertexShader, fragmentShader).use()
})

let shader = new ShaderObject(gl).compile(vertexShader, fragmentShader)

window.JSLitmus.test('WebGL / 着色器.use()', function () {
    shader.use()
})

window.JSLitmus.test('WebGL / new Float32Array()', function () {
    new Float32Array([
        0.7, 0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.7, 0, 0.7
    ])
})

import BufferObject from '../../src/common/webgl/buffer'
window.JSLitmus.test('WebGL / new BufferObject()', function () {
    new BufferObject(gl)
})

import TextureObject from '../../src/common/webgl/texture'

window.JSLitmus.test('WebGL / new TextureObject(gl,"cube")', function () {
    new TextureObject(gl, 'cube')
})
window.JSLitmus.test('WebGL / new TextureObject(gl,"2d")', function () {
    new TextureObject(gl, '2d')
})
