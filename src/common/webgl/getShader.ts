import ShaderObject from './shader'

import { meshType } from '../../../types/Object3D'

let shaders = {}
export default function (type: string, painter: WebGLRenderingContext, mesh: meshType) {

    let uniqueName = type +
        (mesh.geometry.attributes.normal ? "1" : "0") +
        (mesh.material.image ? "1" : "0") +
        (mesh.material.color ? "1" : "0") +
        (mesh.material.cube ? "1" : "0")
    if (shaders[uniqueName]) return shaders[uniqueName].use()

    // 顶点着色器
    let vertexShader = `
     attribute vec4 a_position;

     ${mesh.geometry.attributes.normal ? 'attribute vec4 a_normal;varying vec3 v_normal;' : ''}

    uniform mat4 u_matrix_world;
    uniform mat4 u_matrix_mesh;
    uniform mat4 u_matrix_proporion;

    ${mesh.material.image ? 'attribute vec2 a_textcoord;varying vec2 v_textcoord;' : ''}

    void main(){
        vec4 temp = a_position;

        // 应用变换矩阵：屏幕比调平矩阵、世界矩阵、物体矩阵
        temp = u_matrix_proporion * u_matrix_world * u_matrix_mesh * temp;

        // 把原生的WebGL使用的左手坐标系变成了右手坐标系
        temp.z = -1.0 * temp.z;

        // 表示眼睛距离vec4(0.0,0.0,1.0)的距离
        float dist = 4.0;

        // 使用投影直接计算
        // 为保证纹理和相对位置正确
        // x、y、z的改变满足线性变换
        gl_Position = vec4((dist + 1.0) * temp.x, (dist + 1.0) * temp.y, dist * (dist + temp.z) + 1.0 - dist * dist, temp.w * 2.0 * (dist + temp.z));

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

    shaders[uniqueName] = shader
    return shader
}