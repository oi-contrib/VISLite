export default interface BufferType {

    /**
     * 使用这个缓冲区对象
     * （先于写入和分配）
     */
    use(): this

    /**
     * 写入数据
     * @param data 具体的数据内容
     */
    write(data: Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): this

    /**
     * 分配使用
     * @param location 变量位置
     * @param size 一个数据的长度
     * @param stride 一组数据的长度(可能包含多组)
     * @param offset 读取位置偏移
     */
    divide(location: number, size: number, stride: number, offset?: number): this

}