export default interface ShaderType {

    /**
     * 使用这个程序
     * （后于编译）
     */
    use(): this

    /**
     * 编译着色器程序
     * @param vshaderSource 顶点着色器
     * @param fshaderSource 片段（元）着色器
     */
    compile(vshaderSource: string, fshaderSource: string): this

    /**
     * 编译内置定义好的着色器程序
     * @param shaderName 着色器名称，可选值有：color、colors、image、cube
     */
    compile(shaderName: string): this

}