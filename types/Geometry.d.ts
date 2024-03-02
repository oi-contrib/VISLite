import GeometryResultType from './GeometryResult'
import GeometryOptionType from './GeometryOption'

export default interface GeometryType {

    /**
     * 配置对象
     */
    config(option: GeometryOptionType): this

    /**
     * 计算切割份数
     * @param radius
     * @param deg
     */
    splitNum(radius: number, deg?: number): number

    /**
     * 物体方向转换
     * @param x1
     * @param y1
     * @param z1
     * @param x2
     * @param y2
     * @param z2
     */
    rotateLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): (x: number, y: number, z: number, isNormal: boolean) => Array<number>

    /**
     * 棱柱水平部分
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param num
     * @param d
     * @param beginDeg
     * @param deg
     */
    prismHorizontal(x: number, y: number, z: number, radius: number, num: number, d: number, beginDeg?: number, deg?: number): Array<number>

    /**
     * 棱柱垂直部分
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param height
     * @param num
     * @param beginDeg
     * @param deg
     */
    prismVertical(x: number, y: number, z: number, radius: number, height: number, num: number, beginDeg?: number, deg?: number): Array<number>

    /**
     * 球体中的一瓣子
     * @param cx
     * @param cy
     * @param cz
     * @param radius
     * @param num
     * @param index
     */
    sphereFragment(cx: number, cy: number, cz: number, radius: number, num: number, index: number): Array<number>

    /**
     * 饼柱体
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param height
     * @param beginDeg
     * @param deg
     */
    pie(x: number, y: number, z: number, radius: number, height: number, beginDeg: number, deg: number): Array<GeometryResultType>

    /**
     * 圆柱体
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param height
     */
    cylinder(x: number, y: number, z: number, radius: number, height: number): Array<GeometryResultType>

    /**
     * 圆柱体
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param x2
     * @param y2
     * @param z2
     */
    cylinder(x: number, y: number, z: number, radius: number, x2: number, y2: number, z2: number): Array<GeometryResultType>

    /**
     * 棱柱体
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param height
     * @param num
     */
    prism(x: number, y: number, z: number, radius: number, height: number, num: number): Array<GeometryResultType>

    /**
     * 棱柱体
     * @param x
     * @param y
     * @param z
     * @param radius
     * @param x2
     * @param y2
     * @param z2
     * @param num
     */
    prism(x: number, y: number, z: number, radius: number, x2: number, y2: number, z2: number, num: number): Array<GeometryResultType>

    /**
     * 球体
     * @param cx
     * @param cy
     * @param cz
     * @param radius
     */
    sphere(cx: number, cy: number, cz: number, radius: number): Array<GeometryResultType>

}