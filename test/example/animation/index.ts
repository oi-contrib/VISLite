import animation from '../../../package/animation/index'

console.log(animation)

let stop1 = animation((deep) => {
    console.log("1=>" + deep)
}, 1000, (deep) => {
    console.log("1=>stop deep=" + deep)
})

animation((deep) => {
    console.log("2=>" + deep)
}, 600, (deep) => {
    stop1()
    console.log("2=>stop deep=" + deep)
})