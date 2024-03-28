import throttleOptionType from './throttleOption'

/**
 * 节流函数
 */
export default interface throttle {
    (callback: Function, option?: throttleOptionType): Function
}