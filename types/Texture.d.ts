export default interface TextureType {

    /**
     * 链接图片资源(单一)
     * @param image 纹理图片
     */
    useImage(image: TexImageSource): this

    /**
     * 链接图片资源（多张）
     * @param images 纹理图片集
     * @param width 图片宽
     * @param height 图片高
     */
    useCube(images: TexImageSource[], width: number, height: number): this

}