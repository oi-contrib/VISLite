import Matrix4Type from './Matrix4'
import CanvasType from './Canvas'
import SVGType from './SVG'
import EoapType from './Eoap'
import HermiteType from './Hermite'
import CardinalType from './Cardinal'
import rotateType from './rotate'
import animationType from './animation'
import getLoopColorsType from './getLoopColors'
import rulerType from './ruler'

interface NewCanvasType extends CanvasType {
    new(el: HTMLElement | null): this
}

interface NewCardinalType extends CardinalType {
    new(t?: number): this
}

interface NewEoapType extends EoapType {
    new(scale?: number, center?: number[]): this
}

interface NewHermiteType extends HermiteType {
    new(u: number): this
}

interface NewMatrix4Type extends Matrix4Type {
    new(initMatrix4?: number[]): this
}

interface NewSVGType extends SVGType {
    new(el: HTMLElement | null): this
}

export default class VISLite {
    static Matrix4: NewMatrix4Type
    static Canvas: NewCanvasType
    static SVG: NewSVGType
    static Eoap: NewEoapType
    static rotate: rotateType
    static Hermite: NewHermiteType
    static Cardinal: NewCardinalType
    static getLoopColors: getLoopColorsType
    static animation: animationType
    static ruler: rulerType
}

export let Matrix4: NewMatrix4Type
export let Canvas: NewCanvasType
export let SVG: NewSVGType
export let Eoap: NewEoapType
export let rotate: rotateType
export let Hermite: NewHermiteType
export let Cardinal: NewCardinalType
export let getLoopColors: getLoopColorsType
export let animation: animationType
export let ruler: rulerType