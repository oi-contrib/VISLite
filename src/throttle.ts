import type throttleOptionType from '../types/throttleOption'

import mergeOption from './common/mergeOption'

export default function (callback: Function, option: throttleOptionType = {}) {

    // 校对缺省值
    option = mergeOption(option, <throttleOptionType>{
        time: 200,
        keep: false,
        opportunity: "end"
    })

    let hadInterval = false
    let hadClick = false
    let oneClick = false

    let arg: any
    return function () {
        let _this = this
        arg = arguments

        // 如果前置任务都完成了
        if (!hadInterval) {
            if (option.opportunity != 'end') {
                callback.apply(_this, arg)
            }
            hadInterval = true

            let interval = setInterval(() => {
                if (hadClick) {
                    if (!option.keep) {
                        callback.apply(_this, arg)
                    }
                } else {
                    if (option.opportunity != 'begin') {
                        if (oneClick || option.opportunity == 'end') callback.apply(_this, arg)
                    }
                    hadInterval = false
                    oneClick = false
                    clearInterval(interval)
                }
                hadClick = false
            }, option.time)
        } else {
            hadClick = true
            oneClick = true
        }

    }

}