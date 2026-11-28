# 微信小程序 Canvas

微信小程序使用自定义组件方式接入 VISLite Canvas。

## 安装

在微信小程序项目中引入 vislite：

```bash
npm install vislite
```

## 使用方式

### 在小程序配置中引入

```json
{
  "usingComponents": {
    "ui-canvas": "vislite/miniprogram/ui-canvas/index"
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
  bind:dotouchstart="onTouchstart"
/>
```

### 在 JS 中获取画笔

```js
Component({
    lifetimes: {
        ready() {
            this.selectComponent('#canvas').fetch().then(painter => {
                this.painter = painter;

                // 使用画笔
                this.painter.config({
                    fillStyle: 'red'
                }).fillCircle(150, 75, 50);
            });
        }
    },

    methods: {
        onTouchstart(e) {
            console.log('区域:', e.detail.name);
            console.log('坐标:', e.detail.x, e.detail.y);
        }
    }
});
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | Number | 300 | 画布宽度 |
| height | Number | 150 | 画布高度 |
| region | Boolean | true | 是否启用区域检测 |

## 事件

### dotouchstart

当用户点击画布时触发，返回对象包含：

```js
{
    name: '区域名称',  // 通过 setRegion 设置的区域名
    x: 100,          // 点击x坐标
    y: 50            // 点击y坐标
}
```

## 注意事项

1. 微信小程序使用 `wx.createSelectorQuery()` 获取 canvas 节点
2. 需要处理高清屏的 dpr（设备像素比）缩放
3. 导出图片需要使用 `wx.canvasToTempFilePath` 转换
4. 区域检测依赖 `getImageData`，可能存在性能问题

## 与 Web 版的差异

| 功能 | Web版 | 微信小程序版 |
|------|-------|------------|
| 初始化 | `new Canvas(el)` | 组件 + `fetch()` |
| 事件绑定 | `bind('click', cb)` | 组件 `bind:dotouchstart` |
| 导出 | `toDataURL()` base64 | `toDataURL()` 需转换 |
| dpr处理 | 需手动处理 | 组件自动处理 |