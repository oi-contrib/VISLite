let el = document.getElementById("root")

import Canvas from "../../../src/Canvas"
import getLoopColors from "../../../src/getLoopColors"

let painter = new Canvas(el, {
    // region: false
})

import BarLayout from "../../../src/layout/BarLayout"

let barLayout = new BarLayout({

})

// 一维
// const oralData = {
//     category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     data: [120, 200, 150, 80, 70, 110, 130]
// }

// 二维
const oralData = {
    category: ['一月', '二月', '三月'],
    value: [{
        name: "City Alpha",
        data: [165, 170, 30]
    }, {
        name: "City Beta",
        data: [150, 105, 110]
    }, {
        name: "City Gamma",
        data: [220, 82, 63]
    }]
}

barLayout.setOption({
    y: 650,
    width: 600,
    height: 600,
    category: "yAxis"
}).bind(oralData, function (bar) {
    console.log(bar)

    let colors = getLoopColors(bar.node.length)
    for (let i = 0; i < bar.node.length; i++) {
        painter.config({
            fillStyle: colors[i]
        })

        for (let item of bar.node[i].bar) {
            painter.fillRect(item.x, item.y, item.width, item.height)
        }
    }

})

// console.log(painter, BarLayout)