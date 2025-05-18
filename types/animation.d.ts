interface animationFun {
    (deep: number): void
}

interface animationType {
    (doback: animationFun, duration?: number, callback?: animationFun): Function
}

/**
 * 轮询动画，返回一个函数，调用该函数，可以提前结束动画
 */
export default animationType