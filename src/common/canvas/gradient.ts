const enhanceGradient = function (gradient: CanvasGradient, calcStop?: Function) {
    const enhanceGradient = {
        "value": function () {
            return gradient
        },
        "setColor": function (stop: number, color: string) {
            gradient.addColorStop(calcStop ? calcStop(stop) : stop, color)
            return enhanceGradient
        }
    };
    return enhanceGradient
}

// 线性渐变
export const linearGradient = function (painter: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) {
    const gradient = painter.createLinearGradient(x0, y0, x1, y1)
    return enhanceGradient(gradient)
}

// 环形渐变
export const radialGradient = function (painter: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
    const gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r)
    return enhanceGradient(gradient)
}

// 角度渐变
export const conicGradient = function (painter: CanvasRenderingContext2D, cx: number, cy: number, startDeg: number, deg?: number) {
    const gradient = painter.createConicGradient(startDeg, cx, cy)
    return enhanceGradient(gradient, deg ? (stop: number) => {
        return deg / (Math.PI * 2) * stop
    } : undefined)
}