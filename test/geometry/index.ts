import Geometry from "../../src/Geometry"
import getWebGLContext from "../../package/getWebGLContext/index"
import Shader from "../../package/Shader/index"
import Buffer from "../../package/Buffer/index"
import Matrix4 from "../../src/Matrix4"

let geometry = new Geometry()

// geometry.config({
//     precision:0.5
// })

let painter = getWebGLContext(document.getElementById("root"))
let shader = new Shader(painter).compile(document.getElementById("vs").innerText, document.getElementById("fs").innerText).use()
let buffer = new Buffer(painter).use()

painter.enable(painter.DEPTH_TEST)

// 圆柱体
let cylinder = geometry.cylinder(-0.5, -0.7, 0, 0.4, 1.4)
// console.log(cylinder)

painter.uniformMatrix4fv(
    painter.getUniformLocation(shader.program, "u_matrix"),
    false,
    new Matrix4().rotate(0.2, -1, 0, 0, 1, 0, 0).value()
)

painter.uniform4f(painter.getUniformLocation(shader.program, "u_color"), 1, 0, 0, 1)

for (let index = 0; index < cylinder.length; index++) {
    buffer.write(new Float32Array(cylinder[index].points))
        .divide(painter.getAttribLocation(shader.program, "a_position"), 3, 3, 0)

    painter.drawArrays(painter[cylinder[index].method], 0, cylinder[index].length)
}

// 棱柱体
let prism = geometry.prism(0.5, 0, 0, 0.3, 0.7, 4)
// console.log(prism)

painter.uniformMatrix4fv(
    painter.getUniformLocation(shader.program, "u_matrix"),
    false,
    new Matrix4().rotate(1, -1, 0, 0, 1, 0, 0).value()
)

painter.uniform4f(painter.getUniformLocation(shader.program, "u_color"), 0, 1, 0, 1)

for (let index = 0; index < prism.length; index++) {
    buffer.write(new Float32Array(prism[index].points))
        .divide(painter.getAttribLocation(shader.program, "a_position"), 3, 3, 0)

    painter.drawArrays(painter[prism[index].method], 0, prism[index].length)
}

// 球体
let sphere = geometry.sphere(0, -0.2, -0.3, 0.5)
// console.log(sphere)

painter.uniformMatrix4fv(
    painter.getUniformLocation(shader.program, "u_matrix"),
    false,
    new Matrix4().rotate(0.2, -1, 0, 0, 1, 0, 0).value()
)

painter.uniform4f(painter.getUniformLocation(shader.program, "u_color"), 0, 0, 1, 1)

for (let index = 0; index < sphere.length; index++) {
    buffer.write(new Float32Array(sphere[index].points))
        .divide(painter.getAttribLocation(shader.program, "a_position"), 3, 3, 0)

    painter.drawArrays(painter[sphere[index].method], 0, sphere[index].length)
}