import getWebGLContext from "../../../package/getWebGLContext/index"
import Shader from "../../../package/Shader/index"
import Buffer from "../../../package/Buffer/index"
import Texture from "../../../package/Texture/index"

import vshader from "./vshader.c"
import fshader from "./fshader.c"

let img = new Image()
img.onload = () => {

    let painter = getWebGLContext(document.getElementById("root"))
    console.log(painter)

    let shader = new Shader(painter).compile(vshader, fshader).use()

    new Buffer(painter).use().write(new Float32Array([
        -0.8, 1, 0, 0, 0,
        0.8, 1, 0, 1, 0,
        -0.8, -1, 0, 0, 1,
        0.8, -1, 0, 1, 1
    ])).divide(painter.getAttribLocation(shader.program as WebGLProgram, "a_position"), 3, 5, 0)
        .divide(painter.getAttribLocation(shader.program as WebGLProgram, "a_textcoord"), 2, 5, 3)


    new Texture(painter, '2d', 0).useImage(img)

    painter.uniform1i(painter.getUniformLocation(shader.program as WebGLProgram, "u_sampler"), 0)

    painter.drawArrays(painter.TRIANGLE_STRIP, 0, 4)
}

img.src = "../webgl-shader/picture/floor.jpg"