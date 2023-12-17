// 线性渐变
export const linearGradient = function (painter: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
    const gradient = painter.createLinearGradient(x0, y0, x1, y1)
    const enhanceGradient = {
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
export const radialGradient = function (painter: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
    const gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r)
    const enhanceGradient = {
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
