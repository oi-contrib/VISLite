/**
 * VISLite 主类型定义文件
 * 包含所有核心组件的类型定义
 */

/// <reference path="./uni-canvas.d.ts" />
/// <reference path="./module.d.ts" />

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

// 插值构造函数类型
interface NewCardinalType extends CardinalType {
    new(t?: number): CardinalType
}
interface NewHermiteType extends HermiteType {
    new(u?: number): HermiteType
}

// 变换构造函数类型
interface NewMatrix4Type extends Matrix4Type {
    new(initMatrix4?: number[]): Matrix4Type
}

// 画笔构造函数类型
interface NewSVGType extends SVGType {
    new(el: HTMLElement | null): SVGType
}
interface NewCanvasType extends CanvasType {
    new(el: HTMLElement | null, option?: CanvasOptionType, width?: number, height?: number): CanvasType
}
interface NewRawCanvasType extends CanvasType {
    new(canvas: any, region?: any, scaleSize?: number): CanvasType
}

// WebGL构造函数类型
interface NewShaderType extends ShaderType {
    new(painter: WebGLRenderingContext): ShaderType
}
interface NewBufferType extends BufferType {
    new(painter: WebGLRenderingContext, isElement?: boolean): BufferType
}
interface NewTextureType extends TextureType {
    new(painter: WebGLRenderingContext, type: string, unit?: number): TextureType
}

// 投影构造函数类型
interface NewEoapType extends MapType {
    new(scale?: number, center?: number[]): MapType
}
interface NewMercatorType extends MapType {
    new(scale?: number, center?: number[]): MapType
}

// 坐标系构造函数类型
interface NewMapCoordinateType extends MapCoordinateType {
    new(config?: MapConfigType): MapCoordinateType
}

// 布局构造函数类型
interface NewTreeLayoutType extends TreeLayoutType {
    new(config?: TreeConfigType): TreeLayoutType
}
interface NewPieLayoutType extends PieLayoutType {
    new(config?: PieConfigType): PieLayoutType
}
interface NewBarLayoutType extends BarLayoutType {
    new(config?: BarConfigType): BarLayoutType
}

/**
 * VISLite 主类
 * 提供所有核心功能的静态访问入口
 */
export default class VISLite {

    /** Cardinal插值函数 */
    static Cardinal: NewCardinalType
    /** Hermite插值函数 */
    static Hermite: NewHermiteType

    /** 4x4矩阵变换 */
    static Matrix4: NewMatrix4Type
    /** 旋转变换函数 */
    static rotate: rotateType
    /** 平移变换函数 */
    static move: moveType
    /** 缩放变换函数 */
    static scale: scaleType

    /** 循环颜色获取函数 */
    static getLoopColors: getLoopColorsType
    /** 动画函数 */
    static animation: animationType
    /** 刻度尺计算函数 */
    static ruler: rulerType

    /** SVG绘图类 */
    static SVG: NewSVGType
    /** Canvas绘图类 */
    static Canvas: NewCanvasType
    /** 原始Canvas绘图类 */
    static RawCanvas: NewRawCanvasType

    /** WebGL上下文获取函数 */
    static getWebGLContext: getWebGLContextType
    /** WebGL着色器类 */
    static Shader: NewShaderType
    /** WebGL缓冲区类 */
    static Buffer: NewBufferType
    /** WebGL纹理类 */
    static Texture: NewTextureType

    /** Eoap投影类 */
    static Eoap: NewEoapType
    /** Mercator投影类 */
    static Mercator: NewMercatorType

    /** 节流函数 */
    static throttle: throttleType
    /** 数据组装函数 */
    static assemble: assembleType

    /** 地图坐标系类 */
    static MapCoordinate: NewMapCoordinateType

    /** 树形布局类 */
    static TreeLayout: NewTreeLayoutType
    /** 饼图布局类 */
    static PieLayout: NewPieLayoutType
    /** 柱状图布局类 */
    static BarLayout: NewBarLayoutType

    /** 配置项初始化函数 */
    static initOption: initOptionType
    /** 配置项合并函数 */
    static mergeOption: mergeOptionType
}

// 插值函数导出
export let Cardinal: NewCardinalType
export let Hermite: NewHermiteType

// 变换函数导出
export let Matrix4: NewMatrix4Type
export let rotate: rotateType
export let move: moveType
export let scale: scaleType

// 工具函数导出
export let getLoopColors: getLoopColorsType
export let animation: animationType
export let ruler: rulerType

// 画笔类导出
export let SVG: NewSVGType
export let Canvas: NewCanvasType
export let RawCanvas: NewRawCanvasType

// WebGL相关导出
export let getWebGLContext: getWebGLContextType
export let Shader: NewShaderType
export let Buffer: NewBufferType
export let Texture: NewTextureType

// 投影类导出
export let Eoap: NewEoapType
export let Mercator: NewMercatorType

// 辅助函数导出
export let throttle: throttleType
export let assemble: assembleType

// 坐标系类导出
export let MapCoordinate: NewMapCoordinateType

// 布局类导出
export let TreeLayout: NewTreeLayoutType
export let PieLayout: NewPieLayoutType
export let BarLayout: NewBarLayoutType

// 配置项函数导出
export let initOption: initOptionType
export let mergeOption: mergeOptionType