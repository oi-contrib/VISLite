// 修改样式
export default function (el, styles) {
    for (let key in styles) {
        el.style[key] = styles[key]
    }
}