export default function (painter: WebGLRenderingContext) {
    const width = painter.drawingBufferWidth, height = painter.drawingBufferHeight

    const pixels = new Uint8Array(
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

        const pixelR = pixels[4 * (y * width + x)]
        const pixelG = pixels[4 * (y * width + x) + 1]
        const pixelB = pixels[4 * (y * width + x) + 2]
        const pixelA = pixels[4 * (y * width + x) + 3]

        return "rgba(" + pixelR + "," + pixelG + "," + pixelB + "," + pixelA + ")"
    }
}