# Canvas 画笔 API

Canvas 是 VISLite 的核心画笔之一，**绘制 API 完全一致**，但初始化方式因平台而异。

## 平台初始化方式

### H5 端

```js
import { Canvas } from 'vislite';

var painter = new Canvas(document.getElementById('root'), {
    scale: 2,              // 缩放倍率，默认2
    region: true,          // 是否启用区域检测，默认true
    willReadFrequently: false
}, width, height);
```

### 微信/支付宝小程序

小程序端需要使用 ui-canvas 组件，详见：
- [微信小程序 Canvas](miniprogram/ui-canvas.md)
- [支付宝小程序 Canvas](minialipay/ui-canvas.md)

### uni-app

uni-app 根据编译目标平台选择上述方式，详见：
- [uni-app Canvas](uniapp/ui-canvas.md)

## 配置项 (config)

```js
painter.config({
    fillStyle: 'red',           // 填充色
    strokeStyle: 'black',       // 轮廓色
    lineWidth: 1,               // 线宽
    lineCap: 'butt',            // 线端点类型：butt|round|square
    lineJoin: 'miter',          // 线拐角：miter|bevel|round
    lineDash: [],               // 虚线样式
    textAlign: 'left',          // 文字水平对齐：left|center|right
    textBaseline: 'middle',     // 文字垂直对齐：middle|top|bottom
    shadowBlur: 0,              // 阴影模糊
    shadowColor: 'black',       // 阴影颜色
    fontSize: 16,               // 字体大小
    fontFamily: 'sans-serif',   // 字体
    fontWeight: 400,            // 字重
    fontStyle: 'normal',        // 字类型
    arcStartCap: 'butt',       // 圆弧开始端闭合：butt|round|-round
    arcEndCap: 'butt',          // 圆弧结束端闭合
    rectRadius: [10, 10, 10, 10] // 矩形圆角
});
```

### 渐变色

```js
// 线性渐变
var gradient = painter.createLinearGradient(x1, y1, x2, y2);
gradient.setColor(0, 'red').setColor(1, 'blue');
painter.config({ fillStyle: gradient.value() });

// 环形渐变
var gradient = painter.createRadialGradient(cx, cy, r1, r2);
gradient.setColor(0, 'red').setColor(1, 'blue');

// 角度渐变 (1.2.0+)
var gradient = painter.createConicGradient(cx, cy, beginDeg, deg);
gradient.setColor(0, 'red').setColor(1, 'blue');
```

## 文字绘制

```js
painter.fillText(text, x, y, deg);       // 填充文字
painter.strokeText(text, x, y, deg);     // 轮廓文字
painter.fullText(text, x, y, deg);        // 填充+轮廓文字

// 多行文字
painter.fillTexts(contents, x, y, width, lineHeight, deg);
painter.strokeTexts(contents, x, y, width, lineHeight, deg);
painter.fullTexts(contents, x, y, width, lineHeight, deg);

// 计算文字宽度
painter.textWidth(text);
```

## 路径操作

```js
painter.beginPath();    // 开始路径
painter.closePath();    // 闭合路径
painter.moveTo(x, y);   // 移动起点
painter.lineTo(x, y);   // 画线
painter.arc(x, y, r, beginDeg, deg);  // 圆弧
painter.quadraticCurveTo(cpx, cpy, x, y);  // 二次贝塞尔
painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);  // 三次贝塞尔
painter.fill();         // 填充
painter.stroke();       // 描边
painter.full();         // 填充+描边
painter.clip();         // 裁剪
```

## 画布操作

```js
painter.save();         // 保存状态
painter.restore();      // 恢复状态
painter.clearRect(x, y, w, h);  // 清除矩形区域
painter.clearCircle(cx, cy, r); // 清除圆形区域

// 缩放
painter.scale(x, y);

// 获取画布信息
painter.getInfo();  // { width, height }

// 获取原始画布上下文
painter.getContext();  // CanvasRenderingContext2D
```

## 区域交互

```js
// 设置当前绑定的区域名称
painter.setRegion('regionName');

// 获取点击所在的区域名称
painter.getRegion(x, y).then(regionName => {
    console.log(regionName);
});

// 绑定点击事件
painter.bind('click', (regionName, x, y) => {
    console.log(regionName, x, y);
});

// 只绘制区域（用于交互检测）
painter.onlyRegion(true);

// 只绘制视图
painter.onlyView(true);
```

## 图形绘制（便捷方法）

```js
// 圆
painter.fillCircle(x, y, r);      // 填充圆
painter.strokeCircle(x, y, r);    // 描边圆
painter.fullCircle(x, y, r);      // 填充+描边圆

// 矩形
painter.fillRect(x, y, w, h);
painter.strokeRect(x, y, w, h);
painter.fullRect(x, y, w, h);

// 圆环 (1.1.0+)
painter.fillRing(x, y, r1, r2);
painter.strokeRing(x, y, r1, r2);
painter.fullRing(x, y, r1, r2);

// 椭圆 (1.1.0+)
painter.fillEllipse(x, y, r1, r2, deg);
painter.strokeEllipse(x, y, r1, r2, deg);
```

## 导出

```js
// 导出为图片
painter.toDataURL(type, encoderOptions).then(dataUrl => {
    // dataUrl 即为 base64 图片
});
```

## 重置

```js
// 重置为默认配置
painter.reset();

// 带自定义配置重置
painter.reset({ fillStyle: 'blue', fontSize: 20 });
```