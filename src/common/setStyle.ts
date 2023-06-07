// 修改样式
export default function (el: HTMLElement | SVGElement, styles: any) {
    for (let key in styles) {
        el.style[key] = styles[key]
    }
}