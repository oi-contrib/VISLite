export default function (painter: CanvasRenderingContext2D, contents: string, width: number, height: number, doback: (content: string, top: number) => void) {

    let lineNumber = 0, content = ""
    for (let i = 0; i < contents.length; i++) {
        if (painter.measureText(content + contents[i]).width > width || /\n$/.test(content)) {
            lineNumber += 1
            doback(content, (lineNumber - 0.5) * height)

            content = contents[i]
        } else if (i == contents.length - 1) {
            lineNumber += 1
            doback(content + contents[i], (lineNumber - 0.5) * height)
        } else {
            content += contents[i]
        }
    }

    return lineNumber * height
}