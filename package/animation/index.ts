import type { animationFun } from "oipage/web/animation/index"
import { animation } from "oipage/web/animation/index"

export default function (doback: animationFun, duration?: number, callback?: animationFun) {
    return animation(doback, duration || 400, callback || function () { }).stop
}