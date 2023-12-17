import type { meshType } from '../../../types/Object3D'

import ShaderObject from './shader'

import vsColor from '../../shader/vsColor.c'
import vsColors from '../../shader/vsColors.c'
import vsImage from '../../shader/vsImage.c'
import vsCube from '../../shader/vsCube.c'

import fsColor from '../../shader/fsColor.c'
import fsColors from '../../shader/fsColors.c'
import fsImage from '../../shader/fsImage.c'
import fsCube from '../../shader/fsCube.c'

const shaders = {}
export default function (type: string, painter: WebGLRenderingContext, mesh: meshType) {

    const uniqueName = type +
        (mesh.material.color ? "1" : "0") +
        (mesh.material.colors ? "1" : "0") +
        (mesh.material.image ? "1" : "0") +
        (mesh.material.cube ? "1" : "0")
    if (shaders[uniqueName]) return shaders[uniqueName].use()

    // 顶点着色器
    const vertexShader = {
        [type + "1000"]: vsColor,
        [type + "0100"]: vsColors,
        [type + "0010"]: vsImage,
        [type + "0001"]: vsCube
    }[uniqueName].replace(/uniform +mat4 +u_matrix;/, `
    uniform mat4 u_matrix_world;
    uniform mat4 u_matrix_mesh;
    uniform mat4 u_matrix_proporion;`).replace(/u_matrix +\* +a_position/, "u_matrix_proporion * u_matrix_world * u_matrix_mesh * a_position")

    // 片段（元）着色器
    const fragmentShader = {
        [type + "1000"]: fsColor,
        [type + "0100"]: fsColors,
        [type + "0010"]: fsImage,
        [type + "0001"]: fsCube
    }[uniqueName]

    // 启用着色器
    const shader = new ShaderObject(painter).compile(vertexShader, fragmentShader).use()

    shaders[uniqueName] = shader
    return shader
}