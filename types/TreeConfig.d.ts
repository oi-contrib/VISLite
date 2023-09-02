export default interface TreeConfigType {

    /**
     * 获取根结点的方法
     * @param initTree 原始数据
     * @returns 返回根结点
     */
    root?: (initTree: any) => any

    /**
     * 获取子结点的方法
     * @param parentTree 父结点
     * @param initTree 原始数据
     * @returns 返回当前父结点的所有子结点数组
     */
    children?: (parentTree: any, initTree: any) => any[]

    /**
     * 获取结点ID方法
     * @param treedata 当前结点
     * @returns 返回可以唯一标识当前结点的id
     */
    id?: (treedata: any) => string

}