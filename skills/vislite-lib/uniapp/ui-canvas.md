# uni-app Canvas

uni-app 是一个跨平台框架，VISLite Canvas 可以直接用于 uni-app 项目。

## 安装

```bash
npm install vislite
```

## Web 平台使用

```js
import { Canvas } from 'vislite';

export default {
    onReady() {
        this.painter = new Canvas(this.$refs.canvas);
        this.painter.config({
            fillStyle: 'red'
        }).fillCircle(150, 75, 50);
    }
}
```

```html
<template>
    <view ref="canvas" style="width: 300px; height: 150px;"></view>
</template>
```

## 小程序平台使用

### 方式一：使用原生 Canvas

uni-app 编译到微信/支付宝小程序时，可以获取原生 canvas 上下文：

```js
import { RawCanvas } from 'vislite';

onLoad() {
    uni.createSelectorQuery()
        .select('#canvas')
        .node()
        .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            const dpr = uni.getSystemInfoSync().pixelRatio;

            canvas.width = 300 * dpr;
            canvas.height = 150 * dpr;
            ctx.scale(dpr, dpr);

            this.painter = new RawCanvas({
                getContext() { return ctx; }
            });
        });
}
```

### 方式二：使用各平台组件

各小程序平台也可以使用对应的 ui-canvas 组件：

#### 微信小程序

```json
{
    "usingComponents": {
        "ui-canvas": "vislite/miniprogram/ui-canvas/index"
    }
}
```

#### 支付宝小程序

```json
{
    "usingComponents": {
        "ui-canvas": "vislite/minialipay/ui-canvas/index"
    }
}
```

## 跨平台注意事项

### 平台差异

| 功能 | H5 | 微信 | 支付宝 |
|------|-----|------|--------|
| new Canvas() | ✅ | ⚠️ 需用组件 | ⚠️ 需用组件 |
| region检测 | ✅ | ⚠️ 性能差 | ⚠️ 性能差 |
| toDataURL() | ✅ | ⚠️ 需转换 | ⚠️ 需转换 |

### 建议

1. **H5 优先**：核心逻辑使用 H5 Canvas 实现
2. **平台检测**：使用 `uni.getSystemInfo()` 判断平台
3. **降级处理**：小程序平台可关闭 region 功能提升性能

```js
import { Canvas } from 'vislite';

onReady() {
    const systemInfo = uni.getSystemInfoSync();

    if (systemInfo.platform === 'h5') {
        this.painter = new Canvas(this.$refs.canvas);
    } else {
        // 小程序平台使用组件
        // ...
    }
}
```