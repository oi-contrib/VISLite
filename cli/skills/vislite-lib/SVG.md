# SVG 画笔 API

SVG 画笔用于绘制矢量图形，支持导出为图片。**仅支持 H5 端**。

## 初始化

```js
import { SVG } from 'vislite';

var painter = new SVG(document.getElementById('root'));
```

## 配置项 (config)

```js
painter.config({
    fillStyle: 'red',           // 填充色
    strokeStyle: 'black',       // 轮廓色
    lineWidth: 1,               // 线宽
    lineCap: 'butt',            // 线端点类型
    lineJoin: 'miter',          // 线拐角类型
    lineDash: [],               // 虚线样式
    textAlign: 'left',          // 文字水平对齐
    textBaseline: 'middle',     // 文字垂直对齐
    fontSize: 16,               // 字体大小
    fontFamily: 'sans-serif',   // 字体
    opacity: 1                  // 透明度
});
```

## 节点操作

```js
// 标记当前应用节点
painter.useEl(el);

// 获取当前应用节点
painter.getEl();

// 追加节点（el可以是元素或字符串如'text'）
painter.appendEl(el, context);

// 追加绘制板（自动创建对应类型的SVG元素）
painter.appendBoard('text');   // 文字
painter.appendBoard('circle'); // 圆形
painter.appendBoard('path');   // 路径
painter.appendBoard('arc');    // 弧形
painter.appendBoard('rect');   // 矩形

// 删除当前节点
painter.remove();

// 设置/获取节点属性
painter.attr({ x: 10, y: 20 });
var x = painter.attr('x');
```

## 文字绘制

```js
painter.fillText(text, x, y, deg);     // 填充文字
painter.strokeText(text, x, y, deg);   // 轮廓文字
painter.fullText(text, x, y, deg);     // 填充+轮廓文字
```

## 路径操作

```js
painter.beginPath();
painter.closePath();
painter.moveTo(x, y);
painter.lineTo(x, y);
painter.arc(x, y, r, beginDeg, deg);
painter.quadraticCurveTo(cpx, cpy, x, y);
painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
painter.stroke();
painter.fill();
painter.full();
```

## 图形绘制

```js
// 弧形
painter.fillArc(cx, cy, r1, r2, beginDeg, deg);
painter.strokeArc(cx, cy, r1, r2, beginDeg, deg);
painter.fullArc(cx, cy, r1, r2, beginDeg, deg);

// 圆形
painter.fillCircle(cx, cy, r);
painter.strokeCircle(cx, cy, r);
painter.fullCircle(cx, cy, r);

// 矩形
painter.fillRect(x, y, w, h);
painter.strokeRect(x, y, w, h);
painter.fullRect(x, y, w, h);
```

## 渐变色

```js
// 线性渐变
painter.createLinearGradient(x1, y1, x2, y2);

// 环形渐变
painter.createRadialGradient(cx, cy, r);

// 使用方式同 Canvas
```

## 变换

```js
// 平移
painter.translate(x, y);

// 旋转（deg为角度值）
painter.rotate(deg);

// 缩放
painter.scale(x, y);
```

## 导出

```js
// 导出为图片
painter.toDataURL().then(dataUrl => {
    // dataUrl 即为 base64 图片
});
```

## 重置

```js
painter.reset(config);
```