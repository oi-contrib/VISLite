import getWebGLContext from "../../../package/getWebGLContext/index"
import Shader from "../../../package/Shader/index"
import Buffer from "../../../package/Buffer/index"
import Texture from "../../../package/Texture/index"

let img = new Image()
img.onload = () => {

    let painter = getWebGLContext(document.getElementById("root"))
    console.log(painter)

    let shader = new Shader(painter).compile(`
attribute vec4 a_position;
attribute vec2 a_textcoord;
varying vec2 v_textcoord;

void main(){
    gl_Position = a_position;
    v_textcoord = a_textcoord;
}
`, `
precision mediump float;

uniform sampler2D u_sampler;
varying vec2 v_textcoord;

void main(){
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = texture2D(u_sampler,v_textcoord);
}
`).use()

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

img.src = "../webgl/floor.jpg"