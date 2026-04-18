/**
 * 获取根节点函数类型定义
 */
export interface rootType {
    /**
     * 获取根节点
     * @param initTree 原始树数据
     * @returns 返回根节点
     */
    (initTree: any): any
}

/**
 * 获取子节点函数类型定义
 */
export interface childrenType {
    /**
     * 获取子节点数组
     * @param parentTree 父节点
     * @param initTree 原始树数据
     * @returns 返回子节点数组
     */
    (parentTree: any, initTree: any): any[]
}

/**
 * 获取节点ID函数类型定义
 */
export interface idType {
    /**
     * 获取节点唯一标识
     * @param treedata 节点数据
     * @returns 返回节点唯一ID
     */
    (treedata: any): string
}

/**
 * 树布局配置类型定义
 * 用于配置树形布局的各种参数和方法
 */
export default interface TreeConfigType {

    /** 获取根节点的方法 */
    root?: rootType

    /** 获取子节点的方法 */
    children?: childrenType

    /** 获取节点ID方法 */
    id?: idType

}