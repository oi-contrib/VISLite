// 缓冲区分为两种：
// 1.缓冲区中保存了包含顶点的数据
// 2.缓冲区保存了包含顶点的索引值

// 获取一个新的缓冲区
// isElement默认false，创建第一种缓冲区，为true创建第二种
const newBuffer = (painter: WebGLRenderingContext) => {
    return painter.createBuffer()
}

// 数据写入缓冲区
// data是一个类型化数组，表示写入的数据
// usage表示程序如何使用存储在缓冲区的数据
const writeBuffer = (painter: WebGLRenderingContext, data: ArrayBuffer, isElement: boolean, usage: number) => {
    const TYPE = isElement ? painter.ELEMENT_ARRAY_BUFFER : painter.ARRAY_BUFFER
    painter.bufferData(TYPE, data, usage)
}

// 使用缓冲区数据
// location指定待分配的attribute变量的存储位置
// size每个分量个数
// type数据类型，应该是以下的某个：
//      gl.UNSIGNED_BYTE    Uint8Array
//      gl.SHORT            Int16Array
//      gl.UNSIGNED_SHORT   Uint16Array
//      gl.INT              Int32Array
//      gl.UNSIGNED_INT     Uint32Array
//      gl.FLOAT            Float32Array
// stride相邻两个数据项的字节数
// offset数据的起点字节位置
// normalized是否把非浮点型的数据归一化到[0,1]或[-1,1]区间
const useBuffer = (painter: WebGLRenderingContext, location: number, size: number, type: number, stride: number, offset: number, normalized: boolean) => {

    // 把缓冲区对象分配给目标变量
    painter.vertexAttribPointer(location, size, type, normalized, stride, offset)

    // 连接目标对象和缓冲区对象
    painter.enableVertexAttribArray(location)
}

class BufferObject {

    private __painter: WebGLRenderingContext
    private __isElement: boolean

    private __buffer: WebGLBuffer
    private __type: number
    private __fsize: number

    constructor(painter: WebGLRenderingContext, isElement: boolean = false) {
        this.__painter = painter
        this.__isElement = isElement

        this.__buffer = newBuffer(painter) as WebGLBuffer
        this.__type = isElement ? painter.ELEMENT_ARRAY_BUFFER : painter.ARRAY_BUFFER
    }

    // 使用这个缓冲区对象
    // （先于写入和分配）
    use() {
        this.__painter.bindBuffer(this.__type, this.__buffer) // 绑定到目标
        return this
    }

    // 写入数据
    write(data: Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array) {
        writeBuffer(this.__painter, data, this.__isElement, this.__painter.STATIC_DRAW)
        this.__fsize = data.BYTES_PER_ELEMENT
        return this
    }

    // 分配使用
    // 第2～4位参数分别表示：一个完整数据的长度、一组数据的长度、读取位置偏移
    divide(location: number, size: number, stride: number, offset: number = 0) {
        useBuffer(this.__painter, location, size, this.__painter.FLOAT, stride * this.__fsize, offset * this.__fsize, false)
        return this
    }
}

export default BufferObject