import throttleOptionType from './throttleOption'

export default interface throttle {
    (callback: Function, option?: throttleOptionType): Function
}