let observer: ResizeObserver

let attrValueToCallback = {}, uniqueid = 0

export default function (el: HTMLElement | null, callback: Function) {

    try {

        if (!observer) {
            observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    attrValueToCallback[(entry.target as any)._resize_observer_]()
                }
            })
        }

        uniqueid++

        (el as any)._resize_observer_ = uniqueid
        attrValueToCallback[uniqueid] = callback

        observer.observe(el)

        return function () {
            if (observer) {
                observer.unobserve(el)
                delete attrValueToCallback[(el as any)._resize_observer_]
            }
        }

    } catch (e) {
        callback()

        // 如果浏览器不支持此接口
        console.error('ResizeObserver undefined!')
    }
}