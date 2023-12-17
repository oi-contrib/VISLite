import BufferObject from './buffer'

import getTexture from './getTexture'
import getShader from './getShader'

interface MeshWorldType {
    matrix: number[]
}

interface GlobalWorldType {
    matrix: number[]
    proporion: number[]
}

import { meshType } from '../../../types/Object3D'

export default function (type: string, painter: WebGLRenderingContext, mesh: meshType, meshWorld: MeshWorldType, globalWorld: GlobalWorldType) {
    const shader = getShader(type, painter, mesh)

    // 点数据写入缓冲区
    new BufferObject(painter).use()
        .write(mesh.geometry.attributes.position.array as Float32Array)
        .divide(painter.getAttribLocation(shader.program, "a_position"), mesh.geometry.attributes.position.itemSize, mesh.geometry.attributes.position.itemSize, 0)

    // 写入矩阵
    painter.uniformMatrix4fv(painter.getUniformLocation(shader.program, "u_matrix_world"), false, globalWorld.matrix)
    painter.uniformMatrix4fv(painter.getUniformLocation(shader.program, "u_matrix_proporion"), false, globalWorld.proporion)
    painter.uniformMatrix4fv(painter.getUniformLocation(shader.program, "u_matrix_mesh"), false, meshWorld.matrix)

    // 如果有法向量数据
    if (mesh.geometry.attributes.normal) {
        new BufferObject(painter).use()
            .write(mesh.geometry.attributes.normal.array as Float32Array)
            .divide(painter.getAttribLocation(shader.program, "a_normal"), mesh.geometry.attributes.normal.itemSize, mesh.geometry.attributes.normal.itemSize, 0)
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

    // 多颜色
    if ("colors" in mesh.material) {

        // 写入颜色序列
        new BufferObject(painter).use()
            .write(mesh.material.colors.array as Float32Array)
            .divide(painter.getAttribLocation(shader.program, "a_color"), mesh.material.colors.itemSize, mesh.material.colors.itemSize, 0)

    }

    // 立方纹理
    else if ("cube" in mesh.material) {

        const size = (mesh.material.cube.right.image.value as any).width

        painter.uniform1i(painter.getUniformLocation(shader.program, "u_texture"), 0)

        getTexture(type, painter, 'cube').useCube([
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
            .write(mesh.geometry.attributes.uv.array as Float32Array)
            .divide(painter.getAttribLocation(shader.program, "a_textcoord"), mesh.geometry.attributes.uv.itemSize, 2, 0)

        getTexture(type, painter, '2d').useImage(mesh.material.image.value)

    }

    // 如果使用了索引
    if (mesh.geometry.index) {

        // 索引数据
        new BufferObject(painter, true).use()
            .write(mesh.geometry.index.array as Uint8Array)

        // 绘制
        painter.drawElements(painter[mesh.geometry.type], mesh.geometry.index.count, painter.UNSIGNED_BYTE, 0)

    }

    // 否则
    else {

        // 绘制
        painter.drawArrays(painter[mesh.geometry.type], 0, mesh.geometry.attributes.position.count)

    }

}