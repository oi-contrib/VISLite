/**
 * 着色器类型定义
 * 用于WebGL着色器的编译和使用
 */
export default interface ShaderType {

    /** 着色器程序对象 */
    program: WebGLProgram

    /**
     * 使用这个着色器程序
     * @returns 返回当前实例，支持链式调用
     */
    use(): this

    /**
     * 编译着色器程序
     * @param vshaderSource 顶点着色器源码
     * @param fshaderSource 片段着色器源码
     * @returns 返回当前实例，支持链式调用
     */
    compile(vshaderSource: string, fshaderSource: string): this
}