import { mergeOption } from '../../../src/common/option'

const newOption = {
    radiusAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    angleAxis: {
        type: 'value'
    }
}
const oldOption: any = {}

mergeOption(oldOption, newOption)

oldOption.angleAxis.data = [1, 2, 3, 4, 5, 6, 7]
console.log("newOption", newOption)
console.log("oldOption", oldOption)