let el = document.getElementById("root")

import SVG from "../../src/SVG"

let painter = new SVG(el)

console.log(painter)

painter
  .appendBoard("text")
  .config({
    // fontSize: 50,
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

painter.appendBoard("circle").fullCircle(100, 300, 100)

painter
  .config({
    fillStyle: "blue",
  })
  .appendBoard("rect")
  .fillRect(300, 100, 50, 200)

painter
  .appendBoard("arc")
  .config({
    arcStartCap: "-round",
  })
  .fillArc(100, 100, 10, 50, 45, 180)
