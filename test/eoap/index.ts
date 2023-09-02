let el = document.getElementById("root")

import Canvas from '../../src/Canvas'
import Eoap from '../../src/Eoap'

fetch("/docs/data/china.json", {
    method: "GET"
}).then(res => {
    if (res.status === 200) {
        return res.json()
    } else {
        return Promise.reject(res.json())
    }
}).then(res => {

    let eoap = new Eoap(), cx = 350, cy = 300

    console.log(eoap)

    let painter = new Canvas(el).config({
        fillStyle: 'pink',
        strokeStyle: 'white'
    })

    let drawPolygon = data => {
        for (let t = 0; t < data.length; t++) {
            painter.beginPath()
            for (let p = 0; p < data[t].length; p++) {
                let point = eoap.use(data[t][p][0], data[t][p][1])
                painter.lineTo(point[0] + cx, point[1] + cy)
            }
            painter.closePath().full()
        }
    }

    for (let i = 0; i < res.features.length; i++) {
        for (let j = 0; j < res.features[i].geometry.coordinates.length; j++) {
            if (res.features[i].geometry.type == "Polygon") {
                drawPolygon(res.features[i].geometry.coordinates)
            } else {
                for (let k = 0; k < res.features[i].geometry.coordinates.length; k++) {
                    drawPolygon(res.features[i].geometry.coordinates[k])
                }
            }
        }
    }

}).catch(err => {
    console.error(err)
})