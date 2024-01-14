let el = document.getElementById("root")

import Canvas from '../../../src/Canvas'
import Cardinal from '../../../src/interpolation/Cardinal'

let painter = new Canvas(el)

let points = [
    [0, 300], [100, 320], [150, 350], [200, 100], [250, 150], [300, 160], [350, 150], [400, 350], [500, 200]
]

let cardinal = new Cardinal().setP(points)

painter.beginPath()
for (let index = 0; index <= 500; index += 5) {
    painter.lineTo(index + 50, cardinal.use(index))
}
painter.stroke()

for (let index = 0; index < points.length; index++) {
    painter.fillCircle(points[index][0] + 50, points[index][1], 5)
}
