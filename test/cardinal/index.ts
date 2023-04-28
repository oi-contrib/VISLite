let el = document.getElementById("root")

import Canvas from '../../src/Canvas'
import Cardinal from '../../src/interpolation/Cardinal'

let painter = new Canvas(el)

let cardinal = new Cardinal().setP([
    [0, 50], [100, 400], [200, 100], [300, 150], [400, 350], [500, 200]
])

painter.beginPath()
for (let index = 0; index < 500; index += 5) {
    painter.lineTo(index, cardinal.use(index))
}
painter.stroke()
