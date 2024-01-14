import getWebGLContext from "../../../package/getWebGLContext/index"
import Shader from "../../../package/Shader/index"
import Buffer from "../../../package/Buffer/index"
import Texture from "../../../package/Texture/index"

import Matrix4 from "../../../src/Matrix4"

let matrix4 = new Matrix4()

let promises = [], images: Array<HTMLImageElement> = [], srcs = [
    "../webgl/floor.jpg",
    "../webgl/skybox/left.jpg",
    "../webgl/skybox/right.jpg",
    "../webgl/skybox/near.jpg",
    "../webgl/skybox/far.jpg",
    "../webgl/skybox/top.jpg",
    "../webgl/skybox/bottom.jpg"
]

for (let src of srcs) {
    promises.push(new Promise(resolve => {
        let img = new Image()
        img.onload = () => {
            resolve("")
        }

        img.src = src
        images.push(img)
    }))
}

Promise.all(promises).then(() => {

    let painter = getWebGLContext(document.getElementById("root"))
    console.log(painter)

    painter.enable(painter.DEPTH_TEST)

    /**
     * color
     */

    let shader1 = new Shader(painter).compile("color").use()

    // 设置点位置
    new Buffer(painter).use().write(new Float32Array([
        -0.8, 1, 0,
        0, 1, 0,
        -0.8, 0, 0,
        0, 0, 1,
    ])).divide(painter.getAttribLocation(shader1.program as WebGLProgram, "a_position"), 3, 3, 0)

    // 设置点颜色
    painter.uniform4f(painter.getUniformLocation(shader1.program as WebGLProgram, "u_color"), 1, 0, 0, 1)

    // 设置矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader1.program as WebGLProgram, "u_matrix"), false, matrix4.value())

    painter.drawArrays(painter.TRIANGLE_STRIP, 0, 4)

    /**
     * colors
     */
    let shader2 = new Shader(painter).compile("colors").use()

    // 设置点位置和颜色
    new Buffer(painter).use().write(new Float32Array([
        1, 0.8, 0, 0, 1, 0,
        0.1, 0.8, 0, 0, 0, 1,
        0.55, 0.1, 0, 1, 0, 0
    ])).divide(painter.getAttribLocation(shader2.program as WebGLProgram, "a_position"), 3, 6, 0)
        .divide(painter.getAttribLocation(shader2.program as WebGLProgram, "a_color"), 3, 6, 3)

    // 设置矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader2.program as WebGLProgram, "u_matrix"), false, matrix4.value())

    painter.drawArrays(painter.TRIANGLE_STRIP, 0, 3)

    /**
     * image
     */

    let shader3 = new Shader(painter).compile("image").use()

    // 设置点位置和UV
    new Buffer(painter).use().write(new Float32Array([
        -0.8, -0.2, 0, 0, 0,
        0, -0.2, 0, 1, 0,
        -0.8, -1, 0, 0, 1,
        0, -1, 0, 1, 1
    ])).divide(painter.getAttribLocation(shader3.program as WebGLProgram, "a_position"), 3, 5, 0)
        .divide(painter.getAttribLocation(shader3.program as WebGLProgram, "a_textcoord"), 2, 5, 3)

    // 创建纹理
    new Texture(painter, '2d', 0).useImage(images[0])

    // 设置纹理单元
    painter.uniform1i(painter.getUniformLocation(shader3.program as WebGLProgram, "u_sampler"), 0)

    // 设置矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader3.program as WebGLProgram, "u_matrix"), false, matrix4.value())

    painter.drawArrays(painter.TRIANGLE_STRIP, 0, 4)

    /**
     * cube
     */

    let shader4 = new Shader(painter).compile("cube").use()

    // 设置点位置和法向量
    new Buffer(painter).use().write(new Float32Array([
        0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
        0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
        0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
        0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5, -0.5, 0.5, -0.5
    ])).divide(painter.getAttribLocation(shader4.program as WebGLProgram, "a_position"), 3, 6, 0)
        .divide(painter.getAttribLocation(shader4.program as WebGLProgram, "a_normal"), 3, 6, 3)

    // 设置索引数据
    new Buffer(painter, true).use()
        .write(new Uint8Array([
            0, 1, 3, 1, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 4, 7, 0, 3, 7,
            1, 6, 5, 1, 2, 6,
            0, 1, 5, 0, 5, 4,
            2, 6, 7, 2, 3, 7
        ]))

    // 创建纹理
    new Texture(painter, 'cube', 2).useCube([
        images[1], images[2], images[3], images[4], images[5], images[6]
    ], images[1].width, images[1].height)

    // 设置纹理单元
    // 和创建时保持一致即可
    painter.uniform1i(painter.getUniformLocation(shader4.program as WebGLProgram, "u_texture"), 2)

    // 设置矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader4.program as WebGLProgram, "u_matrix"), false, matrix4.rotate(1, 1, 0, 0).rotate(0.2, 0, 1, 0).value())

    painter.drawElements(painter.TRIANGLE_STRIP, 36, painter.UNSIGNED_BYTE, 0)

})