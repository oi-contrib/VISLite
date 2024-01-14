import ruler from '../../../src/ruler'

console.log(ruler(2, 98, 5), [2, 98, 5])

console.log(ruler(1.97, 99, 6, {

}), [1.97, 99, 6])

console.log(ruler(1.97, 99, 6, {
    max: 100
}), [1.97, 99, 6], {
    max: 100
})

console.log(ruler(1.97, 99, 6, {
    max: 100,
    min: 0
}), [1.97, 99, 6], {
    max: 100,
    min: 0
})

console.log(ruler(23.97, 97, 6, {
    max: 98,
    min: 22
}), [23.97, 97, 6], {
    max: 98,
    min: 22
})


console.log(ruler(-83.03, 83.03, 10, {

}), [-83.03, 83.03, 10])

console.log(ruler(5, 83.03, 5, {
    min: 5
}), [5, 83.03, 5], {
    min: 5
})

console.log(ruler(1.4, 1.17, 4, {

}), [1.45, 1.17, 4])

console.log(ruler(1.45, 1.17, 4, {

}), [1.45, 1.17, 4])

import assemble from "../../../src/common/assemble"

// let assembleFun = assemble(0, 1, 0.2, 3)
// for (let i = 0; i < 6 * 6 * 6 - 1; i++) {
//     console.log(assembleFun())
// }

import formatColor from '../../../src/formatColor'

console.log(formatColor('#f008', 'hexAlpha'))