import ruler from '../../src/ruler'

console.log(ruler(2, 98, 5))

import assemble from "../../src/common/assemble"

let assembleFun = assemble(0, 1, 0.2, 3)
for (let i = 0; i < 6 * 6 * 6 - 1; i++) {
    console.log(assembleFun())
}