import type BarLayoutType from '../../types/BarLayout'
import type { BarResultType } from '../../types/Bar'
import type BarOptionType from '../../types/BarOption'
import type BarConfigType from '../../types/BarConfig'

import { initOption } from '../common/option'
import ruler from '../ruler'
import { animation } from "oipage/web/animation/index"

class BarLayout implements BarLayoutType {
    readonly name: string = 'BarLayout'

    private __config: BarConfigType

    constructor(config: BarConfigType = {}) {
        this.__config = initOption(config, {

        })
    }

    private __option = {
        x: 50,
        y: 350,
        width: 400,
        height: 300,
        category: "xAxis",
        duration: 200
    }

    setOption(option: BarOptionType) {
        initOption(option, this.__option)
        return this
    }

    private __rback: (bar: BarResultType) => void
    private __oralBar: any
    private __preBar: BarResultType | null
    private __stopAnimation: any = null

    use(initBar: any) {
        const bar: BarResultType = {
            coordinate: {
                x: this.__option.x,
                y: this.__option.y,
                width: this.__option.width,
                height: this.__option.height,
                xAxis: {
                    type: this.__option.category === "xAxis" ? "category" : "value",
                    data: []
                },
                yAxis: {
                    type: this.__option.category === "xAxis" ? "value" : "category",
                    data: []
                }
            },
            node: []
        }

        let maxValue = void 0, minValue = void 0

        // 求解一维最值
        if (initBar.data) {
            for (const val of initBar.data) {
                if (maxValue === void 0 || val > maxValue) maxValue = val
                if (minValue === void 0 || val < minValue) minValue = val
            }
        }

        // 求解二维最值
        else if (initBar.value) {
            for (const item of initBar.value) {
                for (const val of item.data) {
                    if (maxValue === void 0 || val > maxValue) maxValue = val
                    if (minValue === void 0 || val < minValue) minValue = val
                }
            }
        } else {
            throw new Error('No data leads to parsing errors')
        }

        // 修复：使用 || 0 会把全负数据的最大值/最小值误归零
        const rulerArray = ruler(
            maxValue === void 0 ? 0 : maxValue,
            minValue === void 0 ? 0 : minValue,
            5
        )

        let categoryLen // 分类轴长度
        let valueLen // 数值轴长度

        if (this.__option.category === "xAxis") {

            // 设置刻度尺刻度
            bar.coordinate.xAxis.data = initBar.category
            bar.coordinate.yAxis.data = rulerArray

            // 设置轴长度
            categoryLen = this.__option.width
            valueLen = -1 * this.__option.height
        } else {
            bar.coordinate.xAxis.data = rulerArray
            bar.coordinate.yAxis.data = initBar.category
            categoryLen = this.__option.height
            valueLen = this.__option.width
        }

        // 求解分类轴刻度
        const category: any = []

        // 一维
        const categorySingle1Width = categoryLen / initBar.category.length
        const categorySingle2Width = categorySingle1Width * 0.9
        const categoryStart = categorySingle1Width * 0.05
        if (initBar.data) {
            for (let i = 0; i < initBar.data.length; i++) {
                category.push([
                    categoryStart + categorySingle1Width * i,
                    categorySingle2Width
                ])
            }
        }

        // 二维
        else {
            const categorySingle3Width = categorySingle2Width / initBar.value.length
            const categorySingle4Width = categorySingle3Width * 0.9
            const categoryStartBlance = categorySingle3Width * 0.05
            for (let i = 0; i < initBar.value[0].data.length; i++) {
                category[i] = []
                for (let j = 0; j < initBar.value.length; j++) {
                    category[i].push([
                        categoryStart + categorySingle1Width * i + categorySingle3Width * j + categoryStartBlance,
                        categorySingle4Width
                    ])
                }
            }
        }

        // 根据值获取长度（所有值相同时刻度尺只有一个元素，避免除零得到 NaN）
        const rulerMin = rulerArray[0]
        const rulerMax = rulerArray[rulerArray.length - 1]
        const singleValueLen = rulerMax === rulerMin ? 0 : valueLen / (rulerMax - rulerMin)
        const getLenByValue = (value: number) => {
            return singleValueLen * (value - rulerArray[0])
        }

        // 计算小矩形
        if (this.__option.category === "xAxis") { // 分类在x轴，从左到右
            if (initBar.data) {
                const nodeBar = []
                for (let i = 0; i < initBar.data.length; i++) {
                    nodeBar.push({
                        x: this.__option.x + category[i][0],
                        y: this.__option.y,
                        width: category[i][1],
                        height: getLenByValue(initBar.data[i]),
                        value: initBar.data[i]
                    })
                }
                bar.node.push({
                    bar: nodeBar
                })
            } else {
                for (let j = 0; j < initBar.value.length; j++) {
                    const nodeBar = []
                    for (let i = 0; i < initBar.value[j].data.length; i++) {
                        nodeBar.push({
                            x: this.__option.x + category[i][j][0],
                            y: this.__option.y,
                            width: category[i][j][1],
                            height: getLenByValue(initBar.value[j].data[i]),
                            value: initBar.value[j].data[i]
                        })
                    }
                    bar.node.push({
                        name: initBar.value[j].name,
                        bar: nodeBar
                    })
                }
            }
        } else { // 分类在y轴，从上到下
            if (initBar.data) {
                const nodeBar = []
                for (let i = 0; i < initBar.data.length; i++) {
                    nodeBar.push({
                        x: this.__option.x,
                        y: this.__option.y - this.__option.height + category[i][0],
                        width: getLenByValue(initBar.data[i]),
                        height: category[i][1],
                        value: initBar.data[i]
                    })
                }
                bar.node.push({
                    bar: nodeBar
                })
            } else {
                for (let j = 0; j < initBar.value.length; j++) {
                    const nodeBar = []
                    for (let i = 0; i < initBar.value[j].data.length; i++) {
                        nodeBar.push({
                            x: this.__option.x,
                            y: this.__option.y - this.__option.height + category[i][j][0],
                            width: getLenByValue(initBar.value[j].data[i]),
                            height: category[i][j][1],
                            value: initBar.value[j].data[i]
                        })
                    }
                    bar.node.push({
                        name: initBar.value[j].name,
                        bar: nodeBar
                    })
                }
            }
        }

        return bar
    }

    bind(initBar: any, renderBack: (bar: BarResultType) => void) {
        this.__rback = renderBack
        this.__oralBar = initBar

        this.__preBar = this.use(this.__oralBar)
        this.__rback(this.__preBar)

        return this
    }

    unbind() {
        if (this.__stopAnimation) {
            this.__stopAnimation.stop()
            this.__stopAnimation = null
        }
        this.__rback = () => null
        this.__oralBar = null
        this.__preBar = null
        return this
    }

    // 按进度插值生成中间态（结构不一致时直接返回目标态，保证不会出现空白）
    private __interpolate(from: BarResultType | null, to: BarResultType, deep: number): BarResultType {
        const result = JSON.parse(JSON.stringify(to))

        if (!from || !from.node || from.node.length !== result.node.length) return result

        for (let i = 0; i < result.node.length; i++) {
            const fromNode = from.node[i], toNode = result.node[i]
            if (!fromNode || !fromNode.bar || fromNode.bar.length !== toNode.bar.length) return result

            for (let j = 0; j < toNode.bar.length; j++) {
                const fromBar: any = fromNode.bar[j], toBar: any = toNode.bar[j]

                for (const key of ["x", "y", "width", "height"]) {
                    if (typeof fromBar[key] === "number" && typeof toBar[key] === "number") {
                        toBar[key] = fromBar[key] + (toBar[key] - fromBar[key]) * deep
                    }
                }
            }
        }

        return result
    }

    doUpdate() {
        const newBar = this.use(this.__oralBar)

        // 首次渲染或结构变化时直接展示最终结果
        if (!this.__preBar) {
            this.__preBar = newBar
            this.__rback(JSON.parse(JSON.stringify(newBar)))
            return this
        }

        if (this.__stopAnimation) this.__stopAnimation.stop()

        this.__stopAnimation = animation((deep) => {
            this.__rback(this.__interpolate(this.__preBar, newBar, deep))
        }, this.__option.duration, () => {
            this.__stopAnimation = null
            this.__preBar = newBar
            this.__rback(this.__preBar)
        })
        return this
    }
}

export default BarLayout