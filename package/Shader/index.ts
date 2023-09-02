import type ShaderType from '../../types/Shader'

import OralShader from '../../src/common/webgl/shader'

import vsColor from '../../src/shader/vsColor.c'
import vsColors from '../../src/shader/vsColors.c'
import vsImage from '../../src/shader/vsImage.c'
import vsCube from '../../src/shader/vsCube.c'

import fsColor from '../../src/shader/fsColor.c'
import fsColors from '../../src/shader/fsColors.c'
import fsImage from '../../src/shader/fsImage.c'
import fsCube from '../../src/shader/fsCube.c'

class Shader extends OralShader implements ShaderType {

    compile(vshaderSource: string, fshaderSource: string): this
    compile(shaderName: string): this
    compile(arg1: string, arg2?: string) {
        if (arg2) {
            super.compile(arg1, arg2)
        } else {
            super.compile({
                "color": vsColor,
                "colors": vsColors,
                "image": vsImage,
                "cube": vsCube
            }[arg1], {
                "color": fsColor,
                "colors": fsColors,
                "image": fsImage,
                "cube": fsCube
            }[arg1])
        }
        return this
    }

}

export default Shader