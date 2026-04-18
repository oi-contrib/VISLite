/**
 * 动画回调函数类型定义
 * @param deep 动画进度值，范围0-1
 */
interface animationFun {
    (deep: number): void
}

/**
 * 动画函数类型定义
 * 用于创建平滑的动画效果
 */
interface animationType {
    /**
     * 执行动画
     * @param doback 动画执行函数，接收一个0-1之间的进度值
     * @param duration 动画持续时间（毫秒），可选，默认为500ms
     * @param callback 动画完成后的回调函数，可选
     * @returns 返回一个函数，调用该函数可提前结束动画
     */
    (doback: animationFun, duration?: number, callback?: animationFun): Function
}

/**
 * 轮询动画，返回一个函数，调用该函数，可以提前结束动画
 */
export default animationType