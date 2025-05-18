export interface nameType {
    (pieData: any, initPie: Array<any>): string
}

export interface valueType {
    (pieData: any, initPie: Array<any>): number
}

export default interface PieConfigType {

    /**
     * 获取条目名称的方法
     * @param pieData 当前条目
     * @param initPie 原始数据
     * @returns 返回条目名称
     */
    name?: nameType

    /**
     * 获取条目值的方法
     * @param pieData 当前条目
     * @param initPie 原始数据
     * @returns 返回条目值
     */
    value?: valueType

}