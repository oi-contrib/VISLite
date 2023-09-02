import TreeType from "./Tree"
import { TreeResultType } from "./Tree"
import TreeOptionType from './TreeOption'

export default interface TreeLayoutType extends TreeType {

    /**
     * 设置布局的行为
     * @param option
     */
    setOption(option: TreeOptionType): this

    /**
     * 单纯的树图坐标计算
     * @param initTree 原始数据
     */
    use(initTree: any, noOpens?: {}): TreeResultType

    /**
     * 绑定新的数据和渲染方法
     * @param initTree 原始数据
     * @param renderBack 渲染方法
     */
    bind(initTree: any, renderBack: (tree: TreeResultType) => void): this

    /**
     * 解除绑定
     */
    unbind(): this

    /**
     * 闭合指定节点
     * @param id
     */
    closeNode(id: string): this

    /**
     * 展开指定节点
     * @param id
     */
    openNode(id: string): this

    /**
     * 闭合或展开指定节点
     * @param id
     */
    toggleNode(id: string): this

}