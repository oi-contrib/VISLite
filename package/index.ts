import Cardinal from "./Cardinal/index"
import Hermite from "./Hermite/index"

import Matrix4 from "./Matrix4/index"
import rotate from "./rotate/index"

import getLoopColors from "./getLoopColors/index"
import animation from "./animation/index"
import ruler from "./ruler/index"

import SVG from "./SVG/index"
import Canvas from "./Canvas/index"
import WebGL from "./WebGL/index"

import Eoap from "./Eoap/index"
import Mercator from "./Mercator/index"

import viewHandler from "./viewHandler/index"

export default {

    // 插值
    Cardinal,
    Hermite,

    // 变换
    Matrix4,
    rotate,

    // 工具
    getLoopColors,
    animation,
    ruler,

    // 画笔
    SVG,
    Canvas,
    WebGL,

    // 投影
    Eoap,
    Mercator,

    // 辅助
    viewHandler
}