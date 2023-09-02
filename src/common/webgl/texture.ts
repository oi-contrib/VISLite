// 初始化一个纹理对象
// type = gl.TEXTURE_2D 二维纹理
// type = gl.TEXTURE_CUBE_MAP 立方体纹理
// unit表示开启的纹理单元编号
let initTexture = (painter: WebGLRenderingContext, type: number, unit: number) => {

    // 创建纹理对象
    let texture = painter.createTexture()

    // 开启纹理单元，unit表示开启的编号
    painter.activeTexture(painter['TEXTURE' + unit])

    // 绑定纹理对象到目标上
    painter.bindTexture(type, texture)

    return texture
}

// 链接资源图片
// level默认传入0即可，和金字塔纹理有关
// format表示图像的内部格式：
//      gl.RGB(红绿蓝)
//      gl.RGBA(红绿蓝透明度)
//      gl.ALPHA(0.0,0.0,0.0,透明度)
//      gl.LUMINANCE(L、L、L、1L:流明)
//      gl.LUMINANCE_ALPHA(L、L、L,透明度)
// textureType表示纹理数据的格式：
//      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
//      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
//      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
//      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
let linkImage = (painter: WebGLRenderingContext, type: number, level: number, format: number, textureType: number, image: TexImageSource) => {
    painter.texImage2D(type, level, format, format, textureType, image)
}

let linkCube = (painter: WebGLRenderingContext, type: number, level: number, format: number, textureType: number, images: TexImageSource[], width: number, height: number, texture: WebGLTexture) => {

    let types = [
        painter.TEXTURE_CUBE_MAP_POSITIVE_X, // 右
        painter.TEXTURE_CUBE_MAP_NEGATIVE_X, // 左
        painter.TEXTURE_CUBE_MAP_POSITIVE_Y, // 上
        painter.TEXTURE_CUBE_MAP_NEGATIVE_Y, // 下
        painter.TEXTURE_CUBE_MAP_POSITIVE_Z, // 后
        painter.TEXTURE_CUBE_MAP_NEGATIVE_Z // 前
    ], target: number

    for (let i = 0; i < types.length; i++) {
        if (images[i]) {
            target = types[i]
            painter.texImage2D(target, level, format, width, height, 0, format, textureType, null)
            painter.bindTexture(type, texture)
            painter.texImage2D(target, level, format, format, textureType, images[i])
        }
    }

    painter.generateMipmap(type)
}

class TextureObject {

    private __painter: WebGLRenderingContext
    private __type: number

    private __texture: WebGLTexture

    constructor(painter: WebGLRenderingContext, type: string, unit = 0) {
        this.__painter = painter
        this.__type = {
            "2d": painter.TEXTURE_2D,
            "cube": painter.TEXTURE_CUBE_MAP
        }[type]

        // 创建纹理
        this.__texture = initTexture(painter, this.__type, unit)

        // 配置纹理
        painter.texParameteri(this.__type, painter.TEXTURE_MIN_FILTER, painter.NEAREST)
        painter.texParameteri(this.__type, painter.TEXTURE_MAG_FILTER, painter.NEAREST)
        painter.texParameteri(this.__type, painter.TEXTURE_WRAP_S, painter.CLAMP_TO_EDGE)
        painter.texParameteri(this.__type, painter.TEXTURE_WRAP_T, painter.CLAMP_TO_EDGE)
    }

    // 链接图片资源(单一)
    useImage(image: TexImageSource) {
        linkImage(this.__painter, this.__type, 0, this.__painter.RGBA, this.__painter.UNSIGNED_BYTE, image)
        return this
    }

    // 链接图片资源（多张）
    useCube(images: TexImageSource[], width: number, height: number) {
        linkCube(this.__painter, this.__type, 0, this.__painter.RGBA, this.__painter.UNSIGNED_BYTE, images, width, height, this.__texture)
        return this
    }

}

export default TextureObject