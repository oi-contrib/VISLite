// 着色器分为两类：顶点着色器 + 片段着色器
// 前者用于定义一个点的特性，比如位置，大小，颜色等
// 后者用于针对每个片段（可以理解为像素）进行处理

// 着色器采用的语言是：GLSL ES语言

// 把着色器字符串加载成着色器对象
const loadShader = (painter: WebGLRenderingContext, type: number, source: string) => {

    // 创建着色器对象
    const shader = painter.createShader(type)
    if (shader == null) throw new Error('Unable to create shader!')

    // 绑定资源
    painter.shaderSource(shader, source)

    // 编译着色器
    painter.compileShader(shader)

    // 检测着色器编译是否成功
    if (!painter.getShaderParameter(shader, painter.COMPILE_STATUS))
        throw new Error('Failed to compile shader:' + painter.getShaderInfoLog(shader))

    return shader
}

//  建立着色器
const useShader = (painter: WebGLRenderingContext, vshaderSource: string, fshaderSource: string) => {

    // 分别加载顶点着色器对象和片段着色器对象
    const vertexShader = loadShader(painter, painter.VERTEX_SHADER, vshaderSource)
    const fragmentShader = loadShader(painter, painter.FRAGMENT_SHADER, fshaderSource)

    // 创建一个着色器程序
    const glProgram = painter.createProgram() as WebGLProgram

    // 把前面创建的两个着色器对象添加到着色器程序中
    painter.attachShader(glProgram, vertexShader)
    painter.attachShader(glProgram, fragmentShader)

    // 把着色器程序链接成一个完整的程序
    painter.linkProgram(glProgram)

    // 检测着色器程序链接是否成功
    if (!painter.getProgramParameter(glProgram, painter.LINK_STATUS))
        throw new Error('Failed to link program: ' + painter.getProgramInfoLog(glProgram))

    return glProgram
}

class ShaderObject {

    private __painter: WebGLRenderingContext

    program: WebGLProgram | null = null

    constructor(painter: WebGLRenderingContext) {
        this.__painter = painter
    }

    // 使用这个程序
    // （后于编译）
    use() {
        this.__painter.useProgram(this.program)
        return this
    }

    // 编译着色器程序
    compile(vshaderSource: string, fshaderSource: string) {
        this.program = useShader(this.__painter, vshaderSource, fshaderSource) as WebGLProgram
        return this
    }

}

export default ShaderObject