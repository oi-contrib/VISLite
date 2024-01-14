import type Object3DType from '../../../types/Object3D'
import type Scene3DType from '../../../types/Scene3D'

import getWebGLContext from './getWebGLContext'
import getColorFactory from './getColorFactory'
import Matrix4 from '../../Matrix4/index'
import doDraw from './doDraw'
import assemble from '../assemble'

// 获取区域信息前是否需要刷新区域
let needUpdate = false

const scale = 10
class WebGL {

    readonly name: string = "WebGL"

    painter: WebGLRenderingContext
    private __regionPainter: WebGLRenderingContext

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private __getColor = (x: number, y: number) => "rgba(0,0,0,1)"

    private __regionList: {
        [key: string | number]: Array<number>
    } = {} //区域映射表
    private __regionAssemble = assemble(0, 1, 0.2, 3)

    private __regionName = "" // 当前绘制的内容名称
    private __regionColor = [0, 0, 0, 1] // 当前记录区域应该使用的颜色

    private __scene: Scene3DType = { // 记录着3D世界
        children: [],

        // 右手坐标系
        matrix: new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, scale
        ])
    }

    private __proporion: number[]

    private __unique: number

    constructor(ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement | null) {
        this.__unique = new Date().valueOf()

        this.painter = getWebGLContext(ViewCanvas, scale)
        if (RegionCanvas) {
            this.__regionPainter = getWebGLContext(RegionCanvas, scale, {

                // 如果不设置，涉及到缓冲区的情况可能无法获取颜色
                // preserveDrawingBuffer: true
            })
        }

        const proportion = this.painter.canvas.width / this.painter.canvas.height

        let xProportion = 1
        let yProportion = 1

        if (proportion > 1) {
            xProportion = 1 / proportion
        } else {
            yProportion = proportion
        }

        const zProportion = Math.min(xProportion, yProportion)

        this.__proporion = [
            xProportion, 0, 0, 0,
            0, yProportion, 0, 0,
            0, 0, zProportion, 0,
            0, 0, 0, 1
        ]

    }

    matrix(initMatrix4?: number[]) {
        return new Matrix4(initMatrix4)
    }

    getMatrix() {
        return this.__scene.matrix
    }

    getObject3D() {
        return this.__scene.children
    }

    review(isUpdateRegion = false) {

        if (isUpdateRegion) {
            if (this.__regionPainter) {
                this.__regionPainter.clearColor(1, 1, 1, 1)
                this.__regionPainter.clear(this.__regionPainter.COLOR_BUFFER_BIT)
            }
        } else {
            this.painter.clearColor(1, 1, 1, 1)
            this.painter.clear(this.painter.COLOR_BUFFER_BIT)
        }

        for (let index = 0; index < this.__scene.children.length; index++) {
            this.draw(this.__scene.children[index], isUpdateRegion)
        }
        return this
    }

    private draw(object3D: Object3DType, isUpdateRegion = false) {
        if (!isUpdateRegion) needUpdate = true

        const meshWorld = {
            matrix: object3D.matrix?.value() as Array<number>
        }

        const globalWorld = {
            matrix: this.__scene.matrix.value(),
            proporion: this.__proporion
        }

        // 设置好当前区域
        this.setRegion(object3D.region)

        for (let index = 0; index < object3D.mesh.length; index++) {

            if (isUpdateRegion) {
                if (this.__regionPainter) {
                    // 区域上
                    doDraw("painter" + this.__unique, this.__regionPainter, {
                        geometry: object3D.mesh[index].geometry,
                        material: {
                            color: {
                                r: this.__regionColor[0],
                                g: this.__regionColor[1],
                                b: this.__regionColor[2],
                                alpha: this.__regionColor[3]
                            }
                        }
                    }, meshWorld, globalWorld)

                    this.__getColor = getColorFactory(this.__regionPainter)
                }
            } else {
                // 画布上
                doDraw("region" + this.__unique, this.painter, object3D.mesh[index], meshWorld, globalWorld)
            }
        }

    }

    render(object3D: Object3DType) {
        if (!('matrix' in object3D)) object3D.matrix = new Matrix4()
        if (!('region' in object3D)) object3D.region = ""

        // 对数据进行校对
        for (let index = 0; index < object3D.mesh.length; index++) {
            const mesh = object3D.mesh[index]

            if (mesh.geometry.attributes.normal && Array.isArray(mesh.geometry.attributes.normal.array)) {
                mesh.geometry.attributes.normal.array = new Float32Array(mesh.geometry.attributes.normal.array)
            }

            if (mesh.geometry.attributes.position && Array.isArray(mesh.geometry.attributes.position.array)) {
                mesh.geometry.attributes.position.array = new Float32Array(mesh.geometry.attributes.position.array)
            }

            if (mesh.geometry.attributes.uv && Array.isArray(mesh.geometry.attributes.uv.array)) {
                mesh.geometry.attributes.uv.array = new Float32Array(mesh.geometry.attributes.uv.array)
            }

            if (mesh.geometry.index && Array.isArray(mesh.geometry.index.array)) {
                mesh.geometry.index.array = new Uint8Array(mesh.geometry.index.array)
            }

            if (mesh.material.colors && Array.isArray(mesh.material.colors.array)) {
                mesh.material.colors.array = new Float32Array(mesh.material.colors.array)
            }

        }

        this.__scene.children.push(object3D)
        this.draw(object3D)
    }

    // 设置当前绘制区域名称
    setRegion(regionName: string | number | undefined) {
        this.__regionName = regionName + ""

        if (regionName) {
            if (this.__regionList[regionName] == void 0) {
                this.__regionList[regionName] = [... this.__regionAssemble(), 1]
            }
            this.__regionColor = this.__regionList[regionName]
        } else {
            this.__regionColor = [0, 0, 0, 1]
        }
        return this
    }

    // 获取当前事件触发的区域名称
    getRegion(x: number, y: number): Promise<string> {
        if (needUpdate) this.review(true)

        needUpdate = false
        return new Promise((resolve) => {

            const rgba = this.__getColor(x, y)

            // 查找当前点击的区域
            for (const key in this.__regionList) {
                const currentRGBA = this.__regionList[key]
                if ("rgba(" + currentRGBA[0] * 255 + "," + currentRGBA[1] * 255 + "," + currentRGBA[2] * 255 + "," + currentRGBA[3] * 255 + ")" == rgba) {
                    resolve(key)
                    break
                }
            }
            resolve("")

        })
    }

}

export default WebGL