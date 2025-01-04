import Cardinal from "./Cardinal/index"
import Hermite from "./Hermite/index"

import Matrix4 from "./Matrix4/index"
import rotate from "./rotate/index"
import move from "./move/index"
import scale from "./scale/index"

import getLoopColors from "./getLoopColors/index"
import animation from "./animation/index"
import ruler from "./ruler/index"

import SVG from "./SVG/index"
import Canvas from "./Canvas/index"
import RawCanvas from "../src/common/canvas/index"

import getWebGLContext from "./getWebGLContext/index"
import Shader from "./Shader/index"
import Texture from "./Texture/index"
import Buffer from "./Buffer/index"

import Eoap from "./Eoap/index"
import Mercator from "./Mercator/index"

import throttle from "./throttle/index"

import MapCoordinate from "./MapCoordinate/index"

import TreeLayout from "./TreeLayout/index"

import initOption from "./initOption/index"
import mergeOption from "./mergeOption/index"

import assemble from "./assemble/index"

export default {

    // 插值
    Cardinal,
    Hermite,

    // 变换
    Matrix4,
    rotate,
    move,
    scale,

    // 工具
    getLoopColors,
    animation,
    ruler,

    // 画笔
    SVG,
    Canvas,
    RawCanvas,

    // WebGL
    getWebGLContext,
    Shader,
    Texture,
    Buffer,

    // 投影
    Eoap,
    Mercator,

    // 辅助
    throttle,
    assemble,

    // 坐标系
    MapCoordinate,

    // 布局
    TreeLayout,

    // 配置项
    initOption,
    mergeOption
}