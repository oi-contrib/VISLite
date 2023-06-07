import TextureObject from './texture'

let textures = {}
export default function (type: string, painter: WebGLRenderingContext, kind: string) {
    let uniqueName = type + "-" + kind

    if (!textures[uniqueName]) {
        textures[uniqueName] = new TextureObject(painter, kind)
    }

    return textures[uniqueName]
}