export default interface MapType {

    /**
     * 返回该点的绘图坐标（特别需要注意，计算出来的位置是偏离中心点的距离）
     * @param λ 经纬度
     * @param φ
     */
    use(λ: number, φ: number): [number, number, number]

}