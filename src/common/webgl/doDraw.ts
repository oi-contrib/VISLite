import BufferObject from './buffer'
import ShaderObject from './shader'
import TextureObject from './texture'

interface MeshWorldType {
    matrix: number[]
}

interface GlobalWorldType {
    matrix: number[]
}

import { meshType } from '../../../types/Object3D'

export default function (painter: WebGLRenderingContext, mesh: meshType, meshWorld: MeshWorldType, globalWorld: GlobalWorldType) {

    // 顶点着色器
    let vertexShader = `
        attribute vec4 a_position;

        ${mesh.geometry.attributes.normal ? 'attribute vec4 a_normal;varying vec3 v_normal;' : ''}

        uniform mat4 u_matrix_world;
        uniform mat4 u_matrix_mesh;

        ${mesh.material.image ? 'attribute vec2 a_textcoord;varying vec2 v_textcoord;' : ''}

        void main(){
            gl_Position = u_matrix_world * u_matrix_mesh * a_position;

            ${mesh.geometry.attributes.normal ? 'v_normal = normalize(vec3(a_normal));' : ''}

            ${mesh.material.image ? 'v_textcoord = a_textcoord;' : ''}
        }
    `

    // 片段（元）着色器
    let fragmentShader = `
        precision mediump float;

        ${mesh.geometry.attributes.normal ? 'varying vec3 v_normal;' : ''}

        ${mesh.material.color ? 'uniform vec4 u_color;' : ''}

        ${mesh.material.cube ? 'uniform samplerCube u_texture;' : ''}

        ${mesh.material.image ? 'uniform sampler2D u_sampler;varying vec2 v_textcoord;' : ''}

        void main(){
            ${mesh.material.color ? 'gl_FragColor = u_color;' : ''}
    
            ${mesh.material.cube ? 'gl_FragColor = textureCube(u_texture,normalize(v_normal));' : ''}
    
            ${mesh.material.image ? 'gl_FragColor = texture2D(u_sampler,v_textcoord);' : ''}
        }
    `

    // 启用着色器
    let shader = new ShaderObject(painter).compile(vertexShader, fragmentShader).use()

    // 点数据写入缓冲区
    new BufferObject(painter).use()
        .write(new Float32Array(mesh.geometry.attributes.position.array))
        .divide(painter.getAttribLocation(shader.program, "a_position"), mesh.geometry.attributes.position.itemSize, 3, 0)

    // 写入矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader.program, "u_matrix_world"), false, globalWorld.matrix)
    painter.uniformMatrix4fv(painter.getUniformLocation(shader.program, "u_matrix_mesh"), false, meshWorld.matrix)

    // 如果有法向量数据
    if (mesh.geometry.attributes.normal) {
        new BufferObject(painter).use()
            .write(new Float32Array(mesh.geometry.attributes.normal.array))
            .divide(painter.getAttribLocation(shader.program, "a_normal"), mesh.geometry.attributes.normal.itemSize, 3, 0)
    }

    // 颜色
    if ("color" in mesh.material) {

        // 写入颜色
        painter.uniform4f(painter.getUniformLocation(shader.program, "u_color")
            , mesh.material.color.r
            , mesh.material.color.g
            , mesh.material.color.b
            , mesh.material.color.alpha)
    }

    // 立方纹理
    else if ("cube" in mesh.material) {

        let size = mesh.material.cube.right.image.value.width

        new TextureObject(painter, 'cube').useCube([
            mesh.material.cube.right.image.value,
            mesh.material.cube.left.image.value,
            mesh.material.cube.top.image.value,
            mesh.material.cube.bottom.image.value,
            mesh.material.cube.far.image.value,
            mesh.material.cube.near.image.value
        ], size, size)

    }

    // 二维纹理
    else if ("image" in mesh.material) {

        painter.uniform1i(painter.getUniformLocation(shader.program, "u_sampler"), 0)

        new BufferObject(painter).use()
            .write(new Float32Array(mesh.geometry.attributes.uv.array))
            .divide(painter.getAttribLocation(shader.program, "a_textcoord"), mesh.geometry.attributes.uv.itemSize, 2, 0)

        new TextureObject(painter, '2d').useImage(mesh.material.image.value)

    }

    // 如果使用了索引
    if (mesh.geometry.index) {

        // 索引数据
        new BufferObject(painter, true).use()
            .write(new Uint8Array(mesh.geometry.index.array))

        // 绘制
        painter.drawElements(painter[mesh.geometry.type], mesh.geometry.index.count, painter.UNSIGNED_BYTE, 0)

    }

    // 否则
    else {

        // 绘制
        painter.drawArrays(painter[mesh.geometry.type], 0, mesh.geometry.attributes.position.count)

    }

}