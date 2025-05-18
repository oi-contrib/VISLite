export interface PieResultItemType {

    /**
     * 值
     */
    value: number

    /**
     * 名称
     */
    name: string

    /**
     * 开始弧度
     */
    beginDeg: number

    /**
     * 结束弧度
     */
    deg: number

    /**
     * 半径
     */
    radius: Array<number>

    /**
     * 提示
     */
    label: {
        line: Array<Array<number>>
        position: Array<number>
        align: "left" | "right"
    }

    /**
     * 是否悬浮
     */
    isHover: boolean
}

export interface PieResultType {

    /**
     * 个数
     */
    count: number

    /**
     * 圆心横坐标
     */
    cx: number

    /**
     * 圆心纵坐标
     */
    cy: number

    /**
     * 半径
     */
    radius: Array<number>

    /**
     * 一个个条目
     */
    node: Array<PieResultItemType>

    /**
     * 当前悬浮位置
     */
    hoverIndex: number
}