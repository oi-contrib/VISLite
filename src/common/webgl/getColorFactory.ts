export default function (painter: WebGLRenderingContext) {
    let width = painter.drawingBufferWidth, height = painter.drawingBufferHeight

    let pixels = new Uint8Array(
        4 * width * height
    )
    painter.readPixels(
        0,
        0,
        width,
        height,
        painter.RGBA,
        painter.UNSIGNED_BYTE,
        pixels
    )

    return function (x: number, y: number): string {
        y = height - y

        let pixelR = pixels[4 * (y * width + x)]
        let pixelG = pixels[4 * (y * width + x) + 1]
        let pixelB = pixels[4 * (y * width + x) + 2]
        let pixelA = pixels[4 * (y * width + x) + 3]

        return "rgba(" + pixelR + "," + pixelG + "," + pixelB + "," + pixelA + ")"
    }
}