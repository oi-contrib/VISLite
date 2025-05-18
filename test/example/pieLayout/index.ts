const el = document.getElementById("root")

import Canvas from "../../../src/Canvas"
import getLoopColors from "../../../src/getLoopColors"

const painter = new Canvas(el, {
    // region: false
})

import PieLayout from "../../../src/layout/PieLayout"

const pieLayout = new PieLayout({

})

const oralData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
]

pieLayout.setOption({
    radius: [0, 150]
}).bind(oralData, function (pie) {
    console.log(pie)

    painter.clearRect(0, 0, 700, 700)

    let colors = getLoopColors(pie.count)

    for (let i = 0; i < pie.count; i++) {

        painter.setRegion(i + 1).config({
            fillStyle: colors[i]
        }).fillArc(pie.cx, pie.cy, pie.node[i].radius[0], pie.node[i].radius[1], pie.node[i].beginDeg, pie.node[i].deg)

        let label = pie.node[i].label

        painter.config({
            strokeStyle: colors[i],
            lineWidth: 1.5
        }).beginPath().moveTo(label.line[0][0], label.line[0][1]).lineTo(label.line[1][0], label.line[1][1]).lineTo(label.line[2][0], label.line[2][1]).stroke()

        painter.config({
            fillStyle: "#929292",
            textAlign: label.align,
            fontSize: 12,
            fontWeight: 400
        }).fillText(pie.node[i].name, label.position[0], label.position[1])

    }

})

painter.bind("mousemove", (reginName: string) => {
    // console.log("当前区域:" + reginName)

    pieLayout.setHover(reginName ? (+reginName - 1) : -1)
})

// console.log(painter, PieLayout)