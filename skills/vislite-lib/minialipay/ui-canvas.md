# 支付宝小程序 Canvas

支付宝小程序使用自定义组件方式接入 VISLite Canvas。

## 安装

在支付宝小程序项目中引入 vislite：

```bash
npm install vislite
```

## 使用方式

### 在小程序配置中引入

```json
{
  "usingComponents": {
    "ui-canvas": "vislite/minialipay/ui-canvas/index"
  }
}
```

### 在页面中使用

```xml
<ui-canvas
  id="canvas"
  width="300"
  height="150"
  region="{{true}}"
  onDoTouchstart="onTouchstart"
/>
```

### 在 JS 中获取画笔

```js
Page({
    onLoad() {
        this.selectComponent('#canvas').fetch().then(painter => {
            this.painter = painter;

            // 使用画笔
            this.painter.config({
                fillStyle: 'red'
            }).fillCircle(150, 75, 50);
        });
    },

    onTouchstart(e) {
        console.log('区域:', e.detail.name);
        console.log('坐标:', e.detail.x, e.detail.y);
    }
});
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | Number | 300 | 画布宽度 |
| height | Number | 150 | 画布高度 |
| region | Boolean | true | 是否启用区域检测 |
| onDoTouchstart | Function | - | 点击事件回调 |

## 事件详情

### onDoTouchstart

当用户点击画布时触发，返回对象包含：

```js
{
    name: '区域名称',  // 通过 setRegion 设置的区域名
    x: 100,          // 点击x坐标
    y: 50            // 点击y坐标
}
```

## 注意事项

1. 支付宝小程序的 Canvas 上下文获取方式与 Web 不同
2. 需要使用 `my.createSelectorQuery()` 获取 canvas 节点
3. 区域检测功能依赖透明度拾取，可能影响性能
4. 导出图片使用 `toDataURL()` 方法会返回临时文件路径

## 与 Web 版的差异

| 功能 | Web版 | 支付宝小程序版 |
|------|-------|---------------|
| 初始化 | `new Canvas(el)` | 组件 + `fetch()` |
| 事件绑定 | `bind('click', cb)` | 组件 `onDoTouchstart` |
| 导出 | `toDataURL()` base64 | `toDataURL()` 临时路径 |
| 区域检测 | 自动绑定 | 需要组件属性开启 |