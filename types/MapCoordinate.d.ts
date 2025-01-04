import MapConfigType from './MapConfig'

export default interface MapCoordinateType {

    /**
     * 修改配置
     * @param config
     */
    setConfig(config: MapConfigType): this

    /**
     * 地理数据
     * @param geos
     */
    setGeos(...geos: any[]): this

    /**
    * 返回该点的绘图坐标
    * @param λ 经纬度
    * @param φ
    */
    use(λ: number, φ: number): [number, number]
}