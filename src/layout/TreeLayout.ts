import type TreeLayoutType from '../../types/TreeLayout'
import type { TreeResultType } from '../../types/Tree'
import type TreeOptionType from '../../types/TreeOption'

import Tree from '../common/tree/index'
import { initOption } from '../common/option'
import { animation } from "oipage/corejs/animation/index"
import rotate from '../rotate'

class TreeLayout extends Tree implements TreeLayoutType {
    readonly name: string = 'TreeLayout'

    private __option = {
        offsetX: 0,
        offsetY: 0,
        duration: 500,
        type: "plain",
        direction: "LR",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        radius: 100
    }

    private __rback: (tree: TreeResultType) => void
    private __oralTree: any
    private __preTree: TreeResultType | null

    private __noOpens = {}

    setOption(option: TreeOptionType) {
        initOption(option, this.__option)
        return this
    }

    use(initTree: any, noOpens = {}) {
        const tree = super.use(initTree, noOpens)

        // 校对偏差
        if (this.__option.offsetX != 0 || this.__option.offsetY != 0) {
            for (const key in tree.node) {
                if (!tree.node[key].show) {

                    let deep = 0, pid = key
                    do {
                        pid = tree.node[pid].pid
                        deep++
                    } while (!tree.node[pid].show)

                    tree.node[key].left += this.__option.offsetX * deep
                    tree.node[key].top += this.__option.offsetY * deep
                }
            }
        }

        if (this.__option.type == 'rect') {
            if (this.__option.direction == 'LR' || this.__option.direction == "RL") {

                const perW = this.__option.height / tree.size
                const perD = this.__option.width / (tree.deep - 1)

                const balanceW = this.__option.y - this.__option.height * 0.5
                const flag = this.__option.direction == 'LR' ? 1 : -1

                for (const key in tree.node) {
                    if (tree.deep == 1) {
                        tree.node[key].left = this.__option.x + this.__option.width * 0.5 * flag
                        tree.node[key].top = this.__option.y
                    } else {
                        tree.node[key].left = this.__option.x + (tree.node[key].left - 0.5) * perD * flag
                        tree.node[key].top = tree.node[key].top * perW + balanceW
                    }
                }
            } else if (this.__option.direction == 'TB' || this.__option.direction == "BT") {

                const perW = this.__option.width / tree.size
                const perD = this.__option.height / (tree.deep - 1)

                const balanceW = this.__option.x - this.__option.width * 0.5
                const flag = this.__option.direction == 'TB' ? 1 : -1



                for (const key in tree.node) {
                    tree.node[key].deg = this.__option.direction == 'TB' ? Math.PI * 0.5 : Math.PI * -0.5

                    if (tree.deep == 1) {
                        tree.node[key].left = this.__option.x
                        tree.node[key].top = this.__option.y + this.__option.height * 0.5 * flag
                    } else {
                        const left = tree.node[key].left
                        tree.node[key].left = tree.node[key].top * perW + balanceW
                        tree.node[key].top = this.__option.y + (left - 0.5) * perD * flag
                    }
                }

            }

        } else if (this.__option.type == 'circle') {
            const cx = this.__option.x, cy = this.__option.y
            const deg = Math.PI * 2 / tree.size
            const per = this.__option.radius / (tree.deep - 1)

            for (const key in tree.node) {
                if (tree.node[key].left == 0.5) {
                    tree.node[key].left = cx
                    tree.node[key].top = cy
                } else {
                    const position = rotate(cx, cy, deg * tree.node[key].top, cx + (tree.node[key].left - 0.5) * per, cy)

                    tree.node[key].deg = deg * tree.node[key].top
                    tree.node[key].left = position[0]
                    tree.node[key].top = position[1]
                }
            }
        }

        return tree
    }

    bind(initTree: any, renderBack: (tree: TreeResultType) => void, noOpens = {}) {
        this.__rback = renderBack
        this.__oralTree = initTree
        this.__noOpens = noOpens

        this.__preTree = this.use(this.__oralTree, this.__noOpens)
        this.__rback(this.__preTree)

        return this
    }

    unbind() {
        this.__rback = () => null
        this.__oralTree = null
        this.__preTree = null
        this.__noOpens = {}
        return this
    }

    doUpdate() {
        const newTree = this.use(this.__oralTree, this.__noOpens)

        const cacheTree = JSON.parse(JSON.stringify(newTree))

        animation((deep) => {

            if (this.__preTree) {
                for (const key in cacheTree.node) {
                    if (newTree.node[key].show || this.__preTree.node[key].show) {
                        cacheTree.node[key].show = true

                        cacheTree.node[key].left = this.__preTree.node[key].left + (newTree.node[key].left - this.__preTree.node[key].left) * deep
                        cacheTree.node[key].top = this.__preTree.node[key].top + (newTree.node[key].top - this.__preTree.node[key].top) * deep
                    }
                }
            }
            this.__rback(cacheTree)


        }, this.__option.duration, () => {
            this.__preTree = newTree
            this.__rback(this.__preTree)
        })

        return this
    }

    closeNode(id: string) {
        if (!this.__preTree) return this
        this.__noOpens[id] = true

        this.doUpdate()
        return this
    }

    openNode(id: string) {
        if (!this.__preTree) return this
        this.__noOpens[id] = false

        this.doUpdate()
        return this
    }

    toggleNode(id: string) {
        if (!this.__preTree) return this
        this.__noOpens[id] = !this.__noOpens[id]

        this.doUpdate()
        return this
    }

}

export default TreeLayout