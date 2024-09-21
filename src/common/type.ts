const toString = Object.prototype.toString

// 获取一个值的类型字符串[object type]
export function getType(value: any) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

// 判断一个值是不是一个朴素的'对象'
export function isPlainObject(value: any) {
    if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
        return false
    }

    // 如果原型为null
    if (Object.getPrototypeOf(value) === null) {
        return true
    }

    let proto = value
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(value) === proto
}