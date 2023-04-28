export default interface EoapType {

    /**
     * 返回该点的绘图坐标（特别需要注意，计算出来的位置是偏离中心点的距离）
     * @param longitude 经纬度
     * @param latitude 
     */
    use(longitude: number, latitude: number): number[]

}