import { PieResultType } from "./Pie"
import PieOptionType from './PieOption'

export default interface PieLayoutType {

    /**
     * 设置布局的行为
     * @param option
     */
    setOption(option: PieOptionType): this

    /**
    * 单纯的饼图计算
    * @param initPie 原始数据
    * @param hoverIndex 悬浮序号，可选
    */
    use(initPie: any,hoverIndex?:number): PieResultType

    /**
     * 绑定新的数据和渲染方法
     * @param initPie 原始数据
     * @param renderBack 渲染方法
     */
    bind(initPie: Array<any>, renderBack: (pie: PieResultType) => void): this

    /**
     * 解除绑定
     */
    unbind(): this

    /**
     * 设置当前悬浮序号
     * @param index 序号，-1表示取消悬浮
     */
    setHover(index: number): this

    /**
    * 主动触发绘制更新
    */
    doUpdate(): this
}