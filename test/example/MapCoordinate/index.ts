let el = document.getElementById("root")

import Canvas from '../../../src/Canvas'
import MapCoordinate from '../../../src/coordinate/MapCoordinate'

fetch("/docs/data/china.json", {
    method: "GET"
}).then(res => {
    if (res.status === 200) {
        return res.json()
    } else {
        return Promise.reject(res.json())
    }
}).then(res => {

    let el = document.getElementById("root")

    let mapCoordinate = new MapCoordinate({
        api: "Eoap",
        width: el?.clientWidth,
        height: el?.clientHeight
    }).setGeos(res)

    let painter = new Canvas(el).config({
        fillStyle: 'pink',
        strokeStyle: 'white'
    })

    let drawPolygon = (data: any) => {
        for (let t = 0; t < data.length; t++) {
            painter.beginPath()
            for (let p = 0; p < data[t].length; p++) {
                let point = mapCoordinate.use(data[t][p][0], data[t][p][1])
                painter.lineTo(point[0], point[1])
            }
            painter.closePath().full()
        }
    }

    for (let i = 0; i < res.features.length; i++) {
        painter.setRegion(res.features[i].properties.name)

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