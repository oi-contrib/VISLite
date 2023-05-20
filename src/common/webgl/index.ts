import getWebGLContext from './getWebGLContext'
import Object3DType from '../../../types/Object3D'
import Scene3DType from '../../../types/Scene3D'
import getColorFactory from './getColorFactory'
import Matrix4 from '../../Matrix4/index'
import doDraw from './doDraw'
import assemble from '../assemble'

class WebGL {

    readonly name: string = "WebGL"

    painter: WebGLRenderingContext
    private __regionPainter: WebGLRenderingContext

    private __getColor = (x: number, y: number) => "rgba(0,0,0,1)"

    private __regionList = {} //区域映射表
    private __regionAssemble = assemble(0, 1, 0.2, 3)

    private __regionName = "" // 当前绘制的内容名称
    private __regionColor = [0, 0, 0, 1] // 当前记录区域应该使用的颜色

    private __scene: Scene3DType = { // 记录着3D世界
        children: [],
        matrix: new Matrix4()
    }

    constructor(ViewCanvas: HTMLCanvasElement, RegionCanvas: HTMLCanvasElement) {

        this.painter = getWebGLContext(ViewCanvas)
        this.__regionPainter = getWebGLContext(RegionCanvas, {

            // 如果不设置，涉及到缓冲区的情况可能无法获取颜色
            preserveDrawingBuffer: true
        })

    }

    rotate(deg: number, a1: number, b1: number, c1?: number, a2?: number, b2?: number, c2?: number) {
        this.__scene.matrix.rotate(deg, a1, b1, c1, a2, b2, c2)
        return this
    }

    scale(xTimes: number, yTimes: number, zTimes: number, cx: number = 0, cy: number = 0, cz: number = 0) {
        this.__scene.matrix.scale(xTimes, yTimes, zTimes, cx, cy, cz)
        return this
    }

    move(dis: number, a: number, b: number, c: number = 0) {
        this.__scene.matrix.move(dis, a, b, c)
        return this
    }

    review() {
        for (let index = 0; index < this.__scene.children.length; index++) {
            this.render(this.__scene.children[index], false)
        }
        return this
    }

    render(object3D: Object3DType, isPush: boolean = true) {
        if (isPush) this.__scene.children.push(object3D)

        let meshWorld = {
            matrix: object3D.matrix.value()
        }

        let globalWorld = {
            matrix: this.__scene.matrix.value()
        }

        // 设置好当前区域
        this.setRegion(object3D.region)

        for (let index = 0; index < object3D.mesh.length; index++) {

            // 画布上
            doDraw(this.painter, object3D.mesh[index], meshWorld, globalWorld)

            // 区域上
            doDraw(this.__regionPainter, {
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
        }

        this.__getColor = getColorFactory(this.__regionPainter)
    }

    // 设置当前绘制区域名称
    setRegion(regionName: string | number) {
        this.__regionName = regionName + ""

        if (regionName) {
            if (this.__regionList[regionName] == undefined) {
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
        return new Promise((resolve, reject) => {

            let rgba = this.__getColor(x, y)

            // 查找当前点击的区域
            for (let key in this.__regionList) {
                let currentRGBA = this.__regionList[key]
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