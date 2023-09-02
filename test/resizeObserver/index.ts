import resizeObserver from '../../src/resizeObserver'
import throttle from '../../src/throttle'

globalThis.stop1 = resizeObserver(document.getElementById('div1'), throttle(function () {
    console.log('div1')
}, {
    time: 300,
    opportunity: "end",
    keep: true
}))

globalThis.stop2 = resizeObserver(document.getElementById('div2'), function () {
    console.log('div2')
})

globalThis.stop3 = resizeObserver(document.getElementById('div3'), function () {
    console.log('div3')
})