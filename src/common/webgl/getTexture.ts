import TextureObject from './texture'

const textures = {}
export default function (type: string, painter: WebGLRenderingContext, kind: string) {
    const uniqueName = type + "-" + kind

    if (!textures[uniqueName]) {
        textures[uniqueName] = new TextureObject(painter, kind)
    }

    return textures[uniqueName]
}