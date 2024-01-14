let el = document.getElementById("root")

import Canvas from "../../../src/Canvas"

let painter = new Canvas(el, {
    region: false
})

import Tree from "../../../src/common/tree"

let tree = new Tree({
    root: function (initTree) {
        return initTree[0]
    },
    children: function (parentTree, initTree) {
        let children = []
        for (let i = 0; i < initTree.length; i++) {
            if (initTree[i][1] == parentTree[0])
                children.push(initTree[i])
        }
        return children
    },
    id: function (initTree) {
        return initTree[0]
    }
}).use([

    // 结点名称、父节点名称
    ["手绘", null],
    ["水粉", "手绘"],
    ["油画", "手绘"],
    ['题材', '油画'],
    ['画法', '油画'],
    ["素描", "手绘"],
    ["中国画", "手绘"],
    ["空间透视", "素描"],
    ["色彩五大调", "素描"]

])

console.log(tree)

painter.config({
    fillStyle: 'red',
    textAlign: 'center'
})

for (let key in tree.node) {
    // console.log(tree.node[key])

    let x = tree.node[key].left * 150
    let y = tree.node[key].top * 100

    // 绘制矩形框子
    painter.strokeRect(x - 30, y - 30, 60, 60)

        // 绘制文字
        .fillText(tree.node[key].id, x, y)

    // 绘制连线
    if (tree.node[key].pid != null) {
        painter.beginPath()
            .moveTo(x - 30, y)
            .lineTo(tree.node[tree.node[key].pid].left * 150 + 30, tree.node[tree.node[key].pid].top * 100)
            .stroke()
    }
}