let el = document.getElementById("root")

import Canvas from "../../src/Canvas"

let painter = new Canvas(el, {
    // region: false
})

import TreeLayout from "../../src/TreeLayout"

let treeLayout = new TreeLayout()
console.log(treeLayout)

let oralData = {
    name: "手绘",
    children: [{
        name: "水粉"
    }, {
        name: "油画",
        children: [{
            name: "题材"
        }, {
            name: "画法"
        }]
    }, {
        name: "素描",
        children: [{
            name: "空间透视",
            children: [{
                name: "一点透视"
            }, {
                name: "两点透视"
            }, {
                name: "三点透视"
            }]
        }, {
            name: "色彩五大调"
        }]
    }, {
        name: "中国画"
    }]
}

let doDraw = tree => {
    // console.log(tree)

    painter.clearRect(0, 0, 700, 500).config({
        fillStyle: 'red',
        textAlign: 'center'
    })

    for (let key in tree.node) {

        if (!tree.node[key].show) continue

        // console.log(tree.node[key])

        let x = tree.node[key].left // * 150
        let y = tree.node[key].top // * 100

        // 绘制矩形框子
        if (!tree.node[key].isOpen && tree.node[key].children.length > 0) {
            painter.fillRect(x - 30, y - 10, 60, 20)
        } else {
            painter.strokeRect(x - 30, y - 10, 60, 20)
        }

        // 绘制文字
        painter.fillText(tree.node[key].id, x, y - 20)

            // 区域
            .setRegion(key).onlyRegion(true).fillRect(x - 30, y - 10, 60, 20).onlyRegion(false).setRegion("")

        // 绘制连线
        if (tree.node[key].pid != null) {
            painter.beginPath()
                // .moveTo(x - 30, y)
                // .lineTo(tree.node[tree.node[key].pid].left * 150 + 30, tree.node[tree.node[key].pid].top * 100)
                .moveTo(x, y)
                .lineTo(tree.node[tree.node[key].pid].left, tree.node[tree.node[key].pid].top)
                .stroke()
        }
    }

}

// 用法一

// let tree = treeLayout.use(oralData)

// console.log(tree)

// doDraw(tree)

// el.addEventListener('click', event => {
//     painter.getRegion(event.offsetX, event.offsetY).then(regionName => {
//         console.log(regionName)
//     })

// })

// 用法二

treeLayout.setOption({
    // offsetX: 60 / 150,
    duration: 500,

    // type: "circle",
    // x: 350,
    // y: 250,
    // radius: 200

    type: "rect",
    width: 700,
    height: 500,

    direction: "LR",
    x: 0,
    y: 250,

    // direction: "RL",
    // x: 700,
    // y: 250,

    // direction: "TB",
    // x: 350,
    // y: 0,

    // direction: "BT",
    // x: 350,
    // y: 500,

}).bind(oralData, doDraw, {
    "油画": true
})

el.addEventListener('click', event => {
    painter.getRegion(event.offsetX, event.offsetY).then(regionName => {
        if (regionName) {
            console.log(regionName)
            treeLayout.toggleNode(regionName)
        }
    })

})