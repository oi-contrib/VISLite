import { callbackFun } from '../types/viewHandler'

let mousePosition = (el: HTMLElement, event: any) => {
    let bounding = el.getBoundingClientRect()
    return {
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
    }
}

let getKeyString = (event: any) => {
    return {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    }[event.keyCode || event.which]
}

export default function (callback: callbackFun) {

    let el = document.getElementsByTagName('body')[0]

    // 键盘控制
    el.addEventListener("keydown", function (event) {
        let keyCode = getKeyString(event)

        // 视角向上
        if (keyCode == 'up') {
            callback({
                type: "lookUp",
                normal: [],
                value: 0.1
            })
        }

        // 视角向下
        else if (keyCode == 'down') {
            callback({
                type: "lookDown",
                normal: [],
                value: 0.1
            })
        }

        // 视角向左
        else if (keyCode == 'left') {
            callback({
                type: "lookLeft",
                normal: [],
                value: 0.1
            })
        }

        // 视角向右
        else if (keyCode == 'right') {
            callback({
                type: "lookRight",
                normal: [],
                value: 0.1
            })
        }

    })

    // 鼠标控制
    let mouseP = null;
    let doMove = function (event) {
        if (mouseP == null) return

        let tempMouseP = mousePosition(el, event)

        // 先求解出轨迹向量
        let normal = [tempMouseP.x - mouseP.x, tempMouseP.y - mouseP.y]

        // 方向向量旋转90deg得到旋转向量
        let rotateNormal = [
            normal[1],
            normal[0],
            0
        ]

        // 非法射线忽略
        if (rotateNormal[0] == 0 && rotateNormal[1] == 0) return

        callback({
            type: "rotate",
            normal: rotateNormal,
            value: (Math.abs(tempMouseP.x - mouseP.x) + Math.abs(tempMouseP.y - mouseP.y)) * 0.01
        })

        mouseP = tempMouseP
    }

    el.addEventListener("mousedown", (event) => {
        mouseP = mousePosition(el, event)
    })
    el.addEventListener("mouseup", (event) => {
        mouseP = null
    })
    el.addEventListener("mousemove", (event) => {
        doMove(event)
    })

    // 手指控制
    el.addEventListener("touchend", (event) => {
        mouseP = null;
    })
    el.addEventListener("touchstart", (event) => {
        mouseP = mousePosition(el, event)
    })
    el.addEventListener("touchmove", (event) => {
        doMove(event.touches[0])
    })

    let doScale = function (value: number) {
        if (value == 0) return

        let baseTimes = 0.899
        callback({
            type: "scale",
            value: value < 0 ? baseTimes : 2 - baseTimes,
            normal: []
        })
    }

    // 滚轮控制
    el.addEventListener("mousewheel", function (event: any) {
        doScale(event.wheelDelta)
    })

    if (window.addEventListener) {

        // 针对火狐浏览器
        window.addEventListener('DOMMouseScroll', function (event: any) {
            doScale(-1 * event.detail)
        }, false)
    }

}