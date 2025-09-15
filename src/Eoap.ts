import type MapType from '../types/Map'

// 围绕X轴旋转
const rotateX = function (deg: number, x: number, y: number, z: number) {
    const cos = Math.cos(deg), sin = Math.sin(deg)
    return [x, y * cos - z * sin, y * sin + z * cos]
}

// 围绕Y轴旋转
const rotateY = function (deg: number, x: number, y: number, z: number) {
    const cos = Math.cos(deg), sin = Math.sin(deg)
    return [z * sin + x * cos, y, z * cos - x * sin]
}

// 围绕Z轴旋转
const rotateZ = function (deg: number, x: number, y: number, z: number) {
    const cos = Math.cos(deg), sin = Math.sin(deg)
    return [x * cos - y * sin, x * sin + y * cos, z]
}

/* 等角斜方位投影 */
class Eoap implements MapType {
    readonly name: string = 'Eoap'

    private __scale: number // 缩放比例
    private __center: number[] // 投影中心经纬度

    constructor(scale: number = 7, center: number[] = [107, 36]) {
        this.__scale = scale
        this.__center = center
    }

    use(λ: number, φ: number): [number, number, number] {
        /**
         * 通过旋转的方法
         * 先旋转出点的位置
         * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
         * 这样求的的点的x,y就是最终结果
         *
         *  计算过程：
         *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
         *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
         *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
         *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
         *  5.然后再对p进行经度度旋转lo获得新的p
         *  6.然后再对p进行纬度旋转la获得新的p
         *  7.旋转结束
         *
         * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
         * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
         *
         */
        let p = rotateY((360 - φ) / 180 * Math.PI, 100 * this.__scale, 0, 0)
        p = rotateZ(λ / 180 * Math.PI, p[0], p[1], p[2])
        p = rotateZ((90 - this.__center[0]) / 180 * Math.PI, p[0], p[1], p[2])
        p = rotateX((90 - this.__center[1]) / 180 * Math.PI, p[0], p[1], p[2])

        return [
            -p[0], // 加负号是因为浏览器坐标和地图不一样
            p[1],
            p[2]
        ]
    }
}

export default Eoap
