let toHex = (value: number) => {
    let hex = value.toString(16)
    return hex.length == 1 ? ("0" + hex) : hex
}

export default function (color: string, format: string) {

    let colorNode = document.getElementsByTagName('head')[0]
    colorNode.style['color'] = color

    // 获取结点的全部样式
    let allStyle = document.defaultView && document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(colorNode, null) :
        (colorNode as any).currentStyle

    let oralFormat = allStyle.getPropertyValue('color').replace(/rgba?\(/, '').replace(")", "").split(',')
    for (let index = 0; index < oralFormat.length; index++) {
        oralFormat[index] = +oralFormat[index]
    }
    oralFormat.push(1)

    switch (format) {
        case "3d": {
            return [
                oralFormat[0] / 255,
                oralFormat[1] / 255,
                oralFormat[2] / 255,
                oralFormat[3]
            ]
        }
        case "rgba": {
            return `rgba(${oralFormat[0]}, ${oralFormat[1]}, ${oralFormat[2]}, ${oralFormat[3]})`
        }
        case "rgb": {
            return `rgb(${oralFormat[0]}, ${oralFormat[1]}, ${oralFormat[2]})`
        }
        case "hexAlpha": {
            return `#${toHex(oralFormat[0])}${toHex(oralFormat[1])}${toHex(oralFormat[2])}${toHex(+(oralFormat[3] * 255).toFixed(0))}`
        }
        case "hex": {
            return `#${toHex(oralFormat[0])}${toHex(oralFormat[1])}${toHex(oralFormat[2])}`
        }
    }
    throw new Error("Unsupported color format: " + format)
}