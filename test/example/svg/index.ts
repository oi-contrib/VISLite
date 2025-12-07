const el = document.getElementById("root")

import SVG from "../../../src/SVG"

const painter = new SVG(el)

console.log(painter)

painter
    .appendBoard("text")
    .config({
        fontSize: 50,
        textAlign: "center",
    })
    .fillText("这是文字", 200, 200, 45)

painter
    .config({
        strokeStyle: "red",
    })
    .appendBoard("path")
    .beginPath()
    .moveTo(0, 200)
    .lineTo(400, 200)
    .stroke()
    .appendBoard("path")
    .beginPath()
    .moveTo(200, 0)
    .lineTo(200, 400)
    .stroke()

painter.appendBoard("circle").fullCircle(100, 300, 100).bind('click', (event, target) => {
    console.log(event, this, target)
})

class Demo {
    constructor() {
        console.log(this)

        painter
            .config({
                fillStyle: "blue",
            })
            .appendBoard("rect")
            .fillRect(300, 100, 50, 200).bind('click', (event, target) => {
                console.log(event, this, target)
            })
    }
}

new Demo()

painter
    .appendBoard("arc")
    .config({
        arcStartCap: "-round",
        arcEndCap: "round"
    })
    .fullArc(100, 100, 30, 50, 45, 180)


painter.appendBoard("path").beginPath().config({
    lineWidth: 20,
    lineCap: "round",
    lineJoin: "round",
    lineDash: [40, 100, 40]
})
    // .reset()
    .moveTo(900, 600).lineTo(800, 500).lineTo(400, 650).stroke()

painter.appendBoard("path").config({
    rectRadius: [10, 20, 30, 50],
    fillStyle: "pink"
}).fullRect(50, 400, 300, 200)

painter
    .appendBoard("circle")
    .fullCircle(400, 300, 70)

// 渐变色

painter
    .appendBoard("circle")
    .config({
        fillStyle: painter
            .createRadialGradient(50, 25, 100)
            .setColor(0, "rgb(255,255,255)")
            .setColor(1, "rgb(255,0,0)")
            .value(),
    })
    .fillCircle(300, 120, 70)

painter
    .appendBoard("circle")
    .config({
        fillStyle: painter
            .createLinearGradient(0, 0, 100, 100)
            .setColor(0, "rgb(255,255,255)")
            .setColor(1, "rgb(0,255,0)")
            .value(),
    })
    .fillCircle(300, 240, 100)

// painter
//     .appendBoard("circle")
//     .config({
// fillStyle: painter
//     .createConicGradient(200, 200, 3.14, 5)
//     .setColor(0, "red")
//     .setColor(0.25, "pink")
//     .setColor(0.5, "blue")
//     .setColor(0.75, "yellow")
//     .setColor(1, "green")
//     .value(),
// })
// .fillCircle(200, 200, 100)

// painter.toDataURL().then(function (base64) {
//     console.log(base64);
// })

painter
    .appendBoard("arc")
    .save()
    .translate(100, 0)
    .rotate(30)
    .beginPath()
    .moveTo(200, 100)
    .arc(250, 100, 100, 0, 340)
    .config({
        fillStyle: "green",
    })
    .fill()

painter.restore()

painter
    .appendBoard("rect")
    .config({
        fillStyle: "blue",
        rectRadius: [0, 0, 0, 0],
    })
    .fillRect(300, 100, 50, 200)