/**
 * WebGL缓冲区类型定义
 * 用于管理WebGL中的顶点缓冲数据和元素缓冲数据
 */
export default interface BufferType {

    /**
     * 使用这个缓冲区对象
     * 必须先调用此方法，然后才能写入数据或分配使用
     * @returns 返回当前实例，支持链式调用
     */
    use(): this

    /**
     * 向缓冲区写入数据
     * @param data 具体的数据内容，支持多种类型数组
     * @returns 返回当前实例，支持链式调用
     */
    write(data: Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): this

    /**
     * 分配缓冲区数据到着色器变量
     * @param location 着色器变量位置
     * @param size 每个顶点的数据分量数
     * @param stride 每组数据的总字节数
     * @param offset 数据偏移量（字节）
     * @returns 返回当前实例，支持链式调用
     */
    divide(location: number, size: number, stride: number, offset?: number): this

}