/// <reference path="./uni-canvas.d.ts" />

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
import assembleType from './assemble'

import MapConfigType from './MapConfig'
import MapCoordinateType from './MapCoordinate'

import TreeConfigType from './TreeConfig'
import TreeLayoutType from './TreeLayout'

import PieConfigType from './PieConfig'
import PieLayoutType from './PieLayout'

import BarConfigType from './BarConfig'
import BarLayoutType from './BarLayout'

import { initOptionType, mergeOptionType } from './option'

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
    new(el: HTMLElement | null, option?: CanvasOptionType, width?: number, height?: number): this
}
interface NewRawCanvasType extends CanvasType {
    new(canvas: any, region?: any, scaleSize?: number): this
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

// 坐标系
interface NewMapCoordinateType extends MapCoordinateType {
    new(config?: MapConfigType): this
}

// 布局
interface NewTreeLayoutType extends TreeLayoutType {
    new(config?: TreeConfigType): this
}
interface NewPieLayoutType extends PieLayoutType {
    new(config?: PieConfigType): this
}
interface NewBarLayoutType extends BarLayoutType {
    new(config?: BarConfigType): this
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
    static RawCanvas: NewRawCanvasType

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
    static assemble: assembleType

    // 坐标系
    static MapCoordinate: NewMapCoordinateType

    // 布局
    static TreeLayout: NewTreeLayoutType
    static PieLayout: NewPieLayoutType
    static BarLayout: NewBarLayoutType

    // 配置项
    static initOption: initOptionType
    static mergeOption: mergeOptionType
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
export let RawCanvas: NewRawCanvasType

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
export let assemble: assembleType

// 坐标系
export let MapCoordinate: NewMapCoordinateType

// 布局
export let TreeLayout: NewTreeLayoutType
export let PieLayout: NewPieLayoutType
export let BarLayout: NewBarLayoutType

// 配置项
export let initOption: initOptionType
export let mergeOption: mergeOptionType