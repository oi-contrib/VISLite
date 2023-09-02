export type treeType = "plain" | "rect" | "circle"
export type treeDirectionType = "LR" | "RL" | "TB" | "BT"

export default interface TreeOptionType {

    offsetX?: number
    offsetY?: number

    /**
     * 树图类型
     */
    type?: treeType

    /**
     * 设置成矩形树图（rect）时有效，表示树图方向
     */
    direction?: treeDirectionType

    /**
     * 树图x坐标
     */
    x?: number

    /**
     * 树图y坐标
     */
    y?: number

    /**
     * 设置成矩形树图（rect）时有效，表示矩形宽
     */
    width?: number

    /**
     * 设置成矩形树图（rect）时有效，表示矩形高
     */
    height?: number

    /**
     * 设置成圆树图（circle）时有效，表示圆树的半径
     */
    radius?: number

    /**
     * 切换时长
     */
    duration?: number

}