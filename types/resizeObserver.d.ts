/**
 * 节点缩放监听
 */
export default interface resizeObserver {
    (el: HTMLElement | null, callback: Function): Function
}