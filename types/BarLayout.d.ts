import { BarResultType } from "./Bar"
import BarOptionType from './BarOption'

interface dataType {
    category: Array<string>
}

interface singleDataType extends dataType {
    data: Array<number>
}

interface doublieDataType extends dataType {
    value: Array<{
        name: string,
        data: Array<number>
    }>
}

export default interface BarLayoutType {

    /**
     * 设置布局的行为
     * @param option
     */
    setOption(option: BarOptionType): this

    /**
     * 单纯的直方图计算
     * @param initBar 原始数据
     */
    use(initBar: singleDataType | doublieDataType): BarResultType

    /**
     * 绑定新的数据和渲染方法
     * @param initBar 原始数据
     * @param renderBack 渲染方法
     */
    bind(initBar: singleDataType | doublieDataType, renderBack: (bar: BarResultType) => void): this

    /**
     * 解除绑定
     */
    unbind(): this

    /**
    * 主动触发绘制更新
    */
    doUpdate(): this
}