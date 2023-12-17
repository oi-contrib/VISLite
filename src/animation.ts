//当前正在运动的动画的tick函数堆栈
let $timers: any[] = []
//唯一定时器的定时间隔
const $interval = 13
//定时器ID
let $timerId: any

/**
 * 动画轮播
 * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
 * @param {number} duration 动画时长，可选
 * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
 *
 * @returns {function} 返回一个函数，调用该函数，可以提前结束动画
 */
export default function (doback: (deep: number) => void, duration: number = 400, callback: (deep: number) => void = () => { }): Function {

    const clock = {
        //把tick函数推入堆栈
        "timer": function (tick: (deep: number) => void, duration: number, callback: (deep: number) => void) {
            if (!tick) {
                throw new Error('Tick is required!')
            }
            const id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0)
            $timers.push({
                "id": id,
                "createTime": new Date(),
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            clock.start()
            return id
        },

        //开启唯一的定时器timerId
        "start": function () {
            if (!$timerId) {
                $timerId = setInterval(clock.tick, $interval)
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function () {
            let createTime: Date, flag: number, tick: (deep: number) => void, callback: (deep: number) => void, timer: any, duration: number, passTime: number
            const timers: any[] = $timers
            $timers = []
            $timers.length = 0
            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag]
                createTime = timer.createTime
                tick = timer.tick
                duration = timer.duration
                callback = timer.callback

                //执行
                passTime = (+new Date().valueOf() - createTime.valueOf()) / duration
                passTime = passTime > 1 ? 1 : passTime
                tick(passTime)
                if (passTime < 1 && timer.id) {
                    //动画没有结束再添加
                    $timers.push(timer)
                } else {
                    callback(passTime)
                }
            }
            if ($timers.length <= 0) {
                clock.stop()
            }
        },

        //停止定时器，重置timerId=null
        "stop": function () {
            if ($timerId) {
                clearInterval($timerId)
                $timerId = null
            }
        }
    }

    const id = clock.timer(function (deep: number) {
        //其中deep为0-1，表示改变的程度
        doback(deep)
    }, duration, callback)

    // 返回一个函数
    // 用于在动画结束前结束动画
    return function () {
        let i: string
        for (i in $timers) {
            if ($timers[i].id == id) {
                $timers[i].id = void 0
                return
            }
        }
    }

}