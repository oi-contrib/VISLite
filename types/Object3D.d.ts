import Matrix4Type from './Matrix4'

export type geometryType = "LINES" | "INE_STRIP" | "LINE_LOOP" | "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN"

export interface meshType {

    // 形状
    geometry: {
        attributes: {

            // 点坐标
            position: {
                array: number[] | Float32Array
                count: number
                itemSize: number
            }

            // 法向量
            normal?: {
                array: number[] | Float32Array
                count: number
                itemSize: number
            }

            // 纹理坐标
            uv?: {
                array: number[] | Float32Array
                count: number
                itemSize: number
            }

        }

        // 索引
        index?: {
            array: number[] | Uint8Array
            count: number
            itemSize: number
        }

        // 线、还是三角形
        type: geometryType
    }

    // 材质
    material: {

        // 单一的颜色
        color?: {
            r: number
            g: number
            b: number
            alpha: number
        }

        // 多颜色
        colors?: {
            array: number[] | Float32Array
            count: number
            itemSize: number
        }

        // 立方体纹理
        cube?: {
            left?: {
                image: {
                    value?: TexImageSource
                }
            },
            right?: {
                image: {
                    value?: TexImageSource
                }
            }
            near?: {
                image: {
                    value?: TexImageSource
                }
            }
            far?: {
                image: {
                    value?: TexImageSource
                }
            }
            top?: {
                image: {
                    value?: TexImageSource
                }
            }
            bottom?: {
                image: {
                    value?: TexImageSource
                }
            }
        }

        // 二维纹理
        image?: {
            value?: TexImageSource
        }

    }
}

export default interface Object3D {

    // 区域名称，不设置或设置为空字符串，表示此区域无需记录
    region?: string

    // 变换矩阵
    matrix?: Matrix4Type

    // 图形
    mesh: meshType[]
}