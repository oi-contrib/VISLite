# 工具函数 API

VISLite 提供多种实用的工具函数。

## ruler 刻度尺算法

根据数值范围计算合适的刻度尺刻度。

### 引入

```js
import { ruler } from 'vislite';
```

### 使用方法

```js
var scales = ruler(maxValue, minValue, num);
```

### 参数说明

- **maxValue**: 最大值
- **minValue**: 最小值
- **num**: 刻度数量（建议值）

### 返回值

返回刻度数组，例如 `[0, 20, 40, 60, 80, 100]`

### 示例

```js
var scales = ruler(85, 12, 5);
console.log(scales); // 可能输出 [0, 20, 40, 60, 80, 100]
```

---

## animation 动画控制

提供基于requestAnimationFrame的动画控制。

### 引入

```js
import { animation } from 'vislite';
```

### 使用方法

```js
var stop = animation(function(percent) {
    // percent: 0-1 的动画进度
    var x = startX + (endX - startX) * percent;
    // 更新绘制...
}, duration, function() {
    // 动画结束回调
});
```

### 返回值

`stop` 函数，调用可停止动画。

### 示例

```js
var stop = animation(function(percent) {
    var x = 0 + (200 - 0) * percent;
    painter.clearRect(0, 0, 300, 300);
    painter.fillCircle(x, 100, 20);
}, 1000, function() {
    console.log('动画结束');
});

// 1秒后停止
setTimeout(stop, 1000);
```

---

## getLoopColors 循环颜色

生成一组循环使用的颜色数组。

### 引入

```js
import { getLoopColors } from 'vislite';
```

### 使用方法

```js
var colors = getLoopColors(num, alpha, colorsFactory);
```

### 参数说明

- **num**: 需要的颜色数量
- **alpha**: 透明度（0-1），默认 1
- **colorsFactory**: 自定义颜色工厂函数

### 返回值

返回颜色数组，例如 `['rgba(84,112,198,1)', 'rgba(145,204,117,1)', ...]`

### 示例

```js
// 获取10个颜色
var colors = getLoopColors(10);

// 获取半透明颜色
var colors = getLoopColors(10, 0.5);

// 自定义颜色
var colors = getLoopColors(5, 1, function(alpha) {
    return [
        'rgba(255,0,0,' + alpha + ')',
        'rgba(0,255,0,' + alpha + ')'
    ];
});
```

---

## throttle 节流函数

限制函数执行频率。

### 引入

```js
import { throttle } from 'vislite';
```

### 使用方法

```js
var throttleFunc = throttle(func, delay);
```

### 参数说明

- **func**: 要节流的函数
- **delay**: 延迟时间（毫秒）

### 返回值

返回节流后的函数。

### 示例

```js
// 滚动事件节流
var handleScroll = throttle(function() {
    console.log('scrolling');
}, 100);

window.addEventListener('scroll', handleScroll);
```

---

## assemble 颜色组装

内部使用的颜色组装工具，用于区域检测的颜色编码。

### 引入

```js
import { assemble } from 'vislite';
```

返回给定范围内的随机颜色值，用于 Canvas 区域检测功能。