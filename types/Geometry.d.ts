import GeometryResultType from './GeometryResult'
import GeometryOptionType from './GeometryOption'

export default interface GeometryType {

    /**
     * 配置对象
     */
    config(option: GeometryOptionType): this

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