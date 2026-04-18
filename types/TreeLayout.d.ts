import TreeType from "./Tree"
import { TreeResultType } from "./Tree"
import TreeOptionType from './TreeOption'

/**
 * 树布局类型定义
 * 继承自TreeType，提供树形布局的计算和操作功能
 */
export default interface TreeLayoutType extends TreeType {

    /**
     * 设置布局的行为
     * @param option 布局选项
     * @returns 返回当前实例，支持链式调用
     */
    setOption(option: TreeOptionType): this

    /**
     * 计算树图坐标
     * @param initTree 原始树数据
     * @param noOpens 可选，节点初始是否闭合控制
     * @returns 返回计算后的树结构数据
     */
    use(initTree: any, noOpens?: {
        [id: string]: boolean
    }): TreeResultType

    /**
     * 绑定数据和渲染方法
     * @param initTree 原始树数据
     * @param renderBack 渲染回调函数
     * @param noOpens 可选，节点初始是否闭合控制
     * @returns 返回当前实例，支持链式调用
     */
    bind(initTree: any, renderBack: (tree: TreeResultType) => void, noOpens?: {
        [id: string]: boolean
    }): this

    /**
     * 解除数据绑定
     * @returns 返回当前实例，支持链式调用
     */
    unbind(): this

    /**
     * 闭合指定节点
     * @param id 节点ID
     * @returns 返回当前实例，支持链式调用
     */
    closeNode(id: string): this

    /**
     * 展开指定节点
     * @param id 节点ID
     * @returns 返回当前实例，支持链式调用
     */
    openNode(id: string): this

    /**
     * 切换指定节点的展开/闭合状态
     * @param id 节点ID
     * @returns 返回当前实例，支持链式调用
     */
    toggleNode(id: string): this

    /**
     * 主动触发绘制更新
     * @returns 返回当前实例，支持链式调用
     */
    doUpdate(): this

}