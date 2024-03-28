import CardinalType from './Cardinal'
import HermiteType from './Hermite'

import Matrix4Type from './Matrix4'
import rotateType from './rotate'
import moveType from './move'
import scaleType from './scale'

import getLoopColorsType from './getLoopColors'
import animationType from './animation'
import rulerType from './ruler'

import SVGType from './SVG'
import CanvasType from './Canvas'

import CanvasOptionType from './CanvasOption'

import getWebGLContextType from './getWebGLContext'
import ShaderType from './Shader'
import BufferType from './Buffer'
import TextureType from './Texture'

import MapType from './Map'

import throttleType from './throttle'
import resizeObserverType from './resizeObserver'

import TreeLayoutType from './TreeLayout'
import TreeConfigType from './TreeConfig'

// 插值
interface NewCardinalType extends CardinalType {
    new(t?: number): this
}
interface NewHermiteType extends HermiteType {
    new(u?: number): this
}

// 变换
interface NewMatrix4Type extends Matrix4Type {
    new(initMatrix4?: number[]): this
}

// 画笔
interface NewSVGType extends SVGType {
    new(el: HTMLElement | null): this
}
interface NewCanvasType extends CanvasType {
    new(el: HTMLElement | null, option?: CanvasOptionType): this
}

// WebGL
interface NewShaderType extends ShaderType {
    new(painter: WebGLRenderingContext): this
}
interface NewBufferType extends BufferType {
    new(painter: WebGLRenderingContext, isElement?: boolean): this
}
interface NewTextureType extends TextureType {
    new(painter: WebGLRenderingContext, type: string, unit?: number): this
}

// 投影
interface NewEoapType extends MapType {
    new(scale?: number, center?: number[]): this
}
interface NewMercatorType extends MapType {
    new(scale?: number, center?: number[]): this
}

// 布局
interface NewTreeLayoutType extends TreeLayoutType {
    new(config?: TreeConfigType): this
}

export default class VISLite {

    // 插值
    static Cardinal: NewCardinalType
    static Hermite: NewHermiteType

    // 变换
    static Matrix4: NewMatrix4Type
    static rotate: rotateType
    static move: moveType
    static scale: scaleType

    // 工具
    static getLoopColors: getLoopColorsType
    static animation: animationType
    static ruler: rulerType

    // 画笔
    static SVG: NewSVGType
    static Canvas: NewCanvasType

    // WebGL
    static getWebGLContext: getWebGLContextType
    static Shader: NewShaderType
    static Buffer: NewBufferType
    static Texture: NewTextureType

    // 投影
    static Eoap: NewEoapType
    static Mercator: NewMercatorType

    // 辅助
    static throttle: throttleType
    static resizeObserver: resizeObserverType

    // 布局
    static TreeLayout: NewTreeLayoutType
}

// 插值
export let Cardinal: NewCardinalType
export let Hermite: NewHermiteType

// 变换
export let Matrix4: NewMatrix4Type
export let rotate: rotateType
export let move: moveType
export let scale: scaleType

// 工具
export let getLoopColors: getLoopColorsType
export let animation: animationType
export let ruler: rulerType

// 画笔
export let SVG: NewSVGType
export let Canvas: NewCanvasType

// WebGL
export let getWebGLContext: getWebGLContextType
export let Shader: NewShaderType
export let Buffer: NewBufferType
export let Texture: NewTextureType

// 投影
export let Eoap: NewEoapType
export let Mercator: NewMercatorType

// 辅助
export let throttle: throttleType
export let resizeObserver: resizeObserverType

// 布局
export let TreeLayout: NewTreeLayoutType