export default interface MapConfigType {

    /**
     * 投影算法，默认Mercator，即墨卡托投影
     */
    api?: "Eoap" | "Mercator"

    /**
     * 地图宽
     */
    width?: number

    /**
     * 地图高
     */
    height?: number

    /**
     * 地图左上角横坐标
     */
    left?: number

    /**
     * 地图左上角枞坐标
     */
    top?: number

}