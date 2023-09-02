export interface paramsType {
    type: string
    value: number,
    normal: number[],
    event: Event
}

export interface callbackFun {
    (params: paramsType): void
}

export default interface viewHandlerType {
    (callback: callbackFun): void
}