let el = document.getElementById("root")

import Canvas from '../../src/Canvas'

let painter = new Canvas(el)

console.log(painter)

painter.config({
    "font-size": 50,
    "textAlign": "center"
}).setRegion("【这是文字】").fillText("这是文字", 200, 200, 45)

painter
    .config({
        "strokeStyle": "red",
        "lineWidth": 5
    })
    .setRegion("红色十字连线和一个黑色的球")
    .beginPath().moveTo(0, 200).lineTo(400, 200).stroke()
    .beginPath().moveTo(200, 0).lineTo(200, 400).stroke()

painter.fullCircle(100, 300, 100)

painter.config({
    "fillStyle": "blue"
}).setRegion("蓝色的矩形").fillRect(300, 100, 50, 200)

el.addEventListener("click", event => {
    painter.getRegion(event.offsetX, event.offsetY).then(data => {
        console.log(data)
    })
})