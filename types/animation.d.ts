interface animationFun {
    (deep: number): void
}

export default interface animationType {
    (doback: animationFun, duration?: number, callback?: animationFun): Function
}