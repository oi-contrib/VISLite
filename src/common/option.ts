import { isPlainObject } from "./type"

// 初始化配置
export function initOption(setOption: any, defaultOption: any) {
    for (const key in setOption) {
        defaultOption[key] = setOption[key]
    }

    return defaultOption
}

// 合并配置
export function mergeOption(oldOption: any, newOption: any) {
    (function doit(oldOption, newOption) {

        for (const key in newOption) {
            const value = newOption[key]

            if (isPlainObject(value)) {
                if (!oldOption[key]) oldOption[key] = {}

                doit(oldOption[key], newOption[key])
            } else {
                oldOption[key] = value
            }

        }

    })(oldOption, newOption)
}