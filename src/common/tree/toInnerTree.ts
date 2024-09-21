import type { default as TreeConfigType, rootType, childrenType, idType } from '../../../types/TreeConfig'

/**
 * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
 *
 * tempTree[id] = {
 *  "data": 原始数据,
 *  "pid": 父亲ID,
 *  "id": 唯一标识ID,
 *  "show": boolean,
 *  "isOpen": boolean,
 *  "children": [cid1、cid2、...]
 * }
 */
export default (initTree: any, config: TreeConfigType) => {
    const tempTree: {
        [key: string]: any
    } = {}

    // 根结点
    const temp = (config.root as rootType)(initTree)
    let id: number | string, rid: number | string
    id = rid = (config.id as idType)(temp)
    tempTree[id] = {
        "data": temp,
        "pid": null,
        "id": id,
        "isOpen": true,
        "show": true,
        "deg": 0,
        "children": []
    }

    let num: number = 1

        // 根据传递的原始数据，生成内部统一结构
        ; (function createTree(pdata: any, pid: number | string) {
            const children = (config.children as childrenType)(pdata, initTree)
            num += children ? children.length : 0
            for (let flag = 0; children && flag < children.length; flag++) {
                id = (config.id as idType)(children[flag])
                tempTree[pid].children.push(id);
                tempTree[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "id": id,
                    "isOpen": true,
                    "show": true,
                    "deg": 0,
                    "children": []
                }
                createTree(children[flag], id)
            }
        })(temp, id)

    return {
        rid,
        value: tempTree,
        num
    }

}