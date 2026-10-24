export default function (begin: number, end: number, step: number, count: number) {
    const val: Array<number> = []
    for (let index = 0; index < count; index++) val[index] = begin

    // 非常类似进制数，每次调用都+1
    return function () {
        for (let i = 0; i < count; i++) {

            // 如果当前位可以进1
            if (val[i] + step < end) {

                // 直接累加，最后一次性格式化，避免每次都做toFixed+Number转换
                // 2026年9月22日 于南宁
                val[i] = val[i] + step
                break
            }

            // 如果当前位不可以，那当前位归0，尝试下一位
            else if (i < count - 1) {
                val[i] = begin
            }
        }

        // 返回前对每一位做一次toFixed(7)，消除浮点累积误差
        for (let k = 0; k < val.length; k++) {
            val[k] = +val[k].toFixed(7)
        }

        return val
    }
}