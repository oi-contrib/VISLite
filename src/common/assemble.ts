export default function (begin: number, end: number, step: number, count: number) {
    let val = []
    for (let index = 0; index < count; index++) val[index] = begin

    // 非常类似进制数，每次调用都+1
    return function () {
        for (let i = 0; i < count; i++) {

            // 如果当前位可以进1
            if (val[i] + step < end) {
                val[i] = +(val[i] + step).toFixed(7)
                break
            }

            // 如果当前位不可以，那当前位归0，尝试下一位
            else if (i < count - 1) {
                val[i] = begin
            }
        }

        return val
    }
}