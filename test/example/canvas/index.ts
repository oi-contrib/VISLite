const el = document.getElementById("root")

import Canvas from "../../../src/Canvas"

let painter = new Canvas(el, {
    // region: false
})

painter = new Canvas(el, {})

console.log(painter)

painter
    .config({
        fontSize: 50,
        textAlign: "center",
    })
    .setRegion("【这是文字】")
    .strokeText("这是文字", 200, 200, 45)

painter
    .save()
    .beginPath()
    .moveTo(200, 100)
    .arc(150, 100, 250, 0, Math.PI * 2)
    .config({
        fillStyle: "rgba(25,0,0,0.1)",
    })
    .fill()
    .clip()

painter
    .config({
        strokeStyle: "red",
        lineWidth: 5,
    })
    .setRegion("红色十字连线和一个黑色的球")
    .beginPath()
    .moveTo(0, 200)
    .lineTo(400, 200)
    .stroke()
    .beginPath()
    .moveTo(200, 0)
    .lineTo(200, 400)
    .stroke()

painter.fullCircle(100, 300, 100)

painter.restore()

painter
    .config({
        fillStyle: "blue",
    })
    .setRegion("蓝色的矩形")
    .fillRect(300, 100, 50, 200)

// el?.addEventListener("click", (event) => {
//     painter.getRegion(event.offsetX, event.offsetY).then((data) => {
//         console.log(data)
//     })
// })

painter.bind("click", (reginName: string) => {
    console.log("当前区域:" + reginName)
})

// 多行文字
const textH = painter
    .strokeRect(50, 250, 100, 100)
    .config({
        textAlign: "left",
        fontSize: 20,
        strokeStyle: "green",
        lineWidth: 1,
    })
    .fillTexts(
        `  如果文字特别多，是需要换行的，那么，你就可以考虑使用这个方法！
   tips：这是新的一行 `,
        50,
        250,
        100
    )

painter.fillCircle(50, 250 + textH, 2)

// 原生画笔

painter.setRegion("原生画笔")

const ctx = painter.getContext()
ctx?.fillRect(0, 0, 100, 50)

const ctxRegion = painter.getContext(true)
ctxRegion?.fillRect(0, 0, 100, 50)

// 渐变色

painter.setRegion("环形渐变")

painter
    .config({
        fillStyle: painter
            .createRadialGradient(300, 120, 100)
            .setColor(0, "white")
            .setColor(1, "red")
            .value(),
    })
    .fillCircle(300, 120, 70)

painter.setRegion("线性渐变")

painter
    .config({
        fillStyle: painter
            .createLinearGradient(0, 0, 200, 200)
            .setColor(0, "white")
            .setColor(1, "green")
            .value(),
    })
    .fillCircle(100, 100, 100)

painter.setRegion("角度渐变")

painter
    .config({
        fillStyle: painter
            .createConicGradient(200, 200, 3.14, 5)
            .setColor(0, "red")
            .setColor(0.25, "pink")
            .setColor(0.5, "blue")
            .setColor(0.75, "yellow")
            .setColor(1, "green")
            .value(),
    })
    .fillCircle(200, 200, 100)

painter
    .config({
        fillStyle: "red",
        arcStartCap: "-round",
    })
    .fillArc(100, 100, 10, 50, 0, Math.PI)

console.log(painter
    // .onlyRegion(true)
    .config({
        fontSize: 10
    })
    // .onlyRegion(true)
    .textWidth('看看宽度0'))

painter
    .onlyRegion(true)
    .setRegion('看不见的蓝色球').config({
        fillStyle: "blue"
    }).fillCircle(900, 100, 100).onlyRegion(false).setRegion("").fillCircle(700, 100, 100).strokeCircle(900, 100, 100)

painter.config({
    strokeStyle: "red"
}).strokeRect(300, 200, 300, 300)

painter.setRegion("图片哦～").drawImage("/docs/images/logo.png", 300, 200, 300, 100).then(() => {
    console.log("绘制完毕")
})

painter.setRegion("line设置").beginPath().config({
    lineWidth: 20,
    lineCap: "round",
    lineJoin: "round",
    lineDash: [10, 20]
})
    // .reset()
    .moveTo(900, 600).lineTo(800, 500).lineTo(400, 650).stroke();

painter.setRegion("圆角矩形").config({
    rectRadius: [10, 20, 30, 50],
    fillStyle: "pink"
}).fullRect(50, 400, 300, 200);

painter.clearCircle(200, 200, 30);