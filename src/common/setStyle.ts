// 修改样式
export default function (el: HTMLElement | SVGElement, styles: any) {
    for (const key in styles) {
        el.style[key as any] = styles[key]
    }
}