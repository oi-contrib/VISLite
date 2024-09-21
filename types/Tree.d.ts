export interface TreeResultType {

    /**
     * 树的层数
     */
    deep: number

    node: {
        [id: string]: {

            /**
             * 当前结点的孩子的结点id集合
             */
            children: Array<string>

            /**
             * 当前结点的原始数据
             */
            data: any

            /**
             * 当前结点的id
             */
            id: string

            /**
             * 当前结点的父结点id
             */
            pid: string

            /**
             * 当前结点的横坐标
             */
            left: number

            /**
             * 当前结点的纵坐标
             */
            top: number

            /**
             * 当前结点的打开还是关闭
             */
            isOpen: boolean

            /**
             * 当前结点本身是否显示
             */
            show: boolean

            /**
             * 文字建议旋转弧度
             */
            deg: number
        }
    }

    /**
     * 根结点id
     */
    root: string

    /**
     * 树的宽数
     */
    size: number
}

export default interface TreeType {

    /**
     * 求解单一值
     */
    use(initTree: any): TreeResultType
}