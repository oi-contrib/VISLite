// 线性渐变
export let linearGradient = function (painter: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
    let gradient = painter.createLinearGradient(x0, y0, x1, y1)
    let enhanceGradient = {
        "value": function () {
            return gradient
        },
        "setColor": function (stop: number, color: string) {
            gradient.addColorStop(stop, color)
            return enhanceGradient
        }
    };
    return enhanceGradient
}

// 环形渐变
export let radialGradient = function (painter: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
    let gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r)
    let enhanceGradient = {
        "value": function () {
            return gradient
        },
        "setColor": function (stop: number, color: string) {
            gradient.addColorStop(stop, color)
            return enhanceGradient
        }
    }
    return enhanceGradient
}
