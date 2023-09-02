import type TreeConfigType from '../../../types/TreeConfig'
import type { TreeResultType } from '../../../types/Tree'

import toPlainTree from './toPlainTree'
import mergeOption from '../mergeOption'

class Tree {
    readonly name: string = 'Tree'

    private __config: TreeConfigType

    constructor(config: TreeConfigType = {}) {
        this.__config = mergeOption(config, {
            root: (initTree: any) => initTree,
            children: (parentTree: any) => parentTree.children,
            id: (treedata: any) => treedata.name
        })
    }

    use(initTree: any, noOpens = {}): TreeResultType {
        return toPlainTree(initTree, this.__config, noOpens)
    }

}

export default Tree