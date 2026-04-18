/**
 * WebGL纹理类型定义
 * 用于管理WebGL中的纹理资源
 */
export default interface TextureType {

    /**
     * 绑定单一图片作为纹理
     * @param image 纹理图片资源
     * @returns 返回当前实例，支持链式调用
     */
    useImage(image: TexImageSource): this

    /**
     * 绑定立方体贴图纹理
     * @param images 纹理图片数组（6张图片）
     * @param width 图片宽度
     * @param height 图片高度
     * @returns 返回当前实例，支持链式调用
     */
    useCube(images: TexImageSource[], width: number, height: number): this

}