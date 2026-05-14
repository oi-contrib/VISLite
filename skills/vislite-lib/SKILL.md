---
name: vislite-lib
description: "VISLite数据可视化库开发助手。当用户需要创建Canvas/SVG/WebGL图表、实现树布局/饼图/柱状图布局、使用坐标投影（墨卡托/等角斜方位）、矩阵变换、插值函数等可视化算法时使用。"
---

# VISLite 数据可视化库

VISLite 是一款轻量、优雅的跨端数据可视化解决方案，支持 Web、uni-app、微信小程序、支付宝小程序等多平台。

**官网**: [https://oi-contrib.github.io/VISLite](https://oi-contrib.github.io/VISLite)

**GitHub**: [https://github.com/oi-contrib/VISLite](https://github.com/oi-contrib/VISLite)

## 安装

```bash
npm install --save vislite
```

## 模块索引

### 画笔 (Brushes)

#### 跨平台 Canvas（H5 / 微信 / 支付宝 / uni-app）
- [Canvas.md](Canvas.md) - 统一 API，初始化方式因平台而异
- [minialipay/ui-canvas.md](minialipay/ui-canvas.md) - 支付宝小程序 Canvas 组件
- [miniprogram/ui-canvas.md](miniprogram/ui-canvas.md) - 微信小程序 Canvas 组件
- [uniapp/ui-canvas.md](uniapp/ui-canvas.md) - uni-app 跨平台使用指南

#### H5 专用画笔
- [SVG.md](SVG.md) - SVG 矢量图形绘制（仅 H5）
- [WebGL.md](WebGL.md) - WebGL 3D 图形渲染（仅 H5）

### 布局算法 (Layouts)

- [TreeLayout.md](TreeLayout.md) - 树状布局，支持 TB/LR/RL/BT 方向
- [PieLayout.md](PieLayout.md) - 饼图/环形图布局
- [BarLayout.md](BarLayout.md) - 柱状图/条形图布局

### 坐标投影 (Projections)

- [Projections.md](Projections.md) - Mercator 墨卡托投影、Eoap 等角斜方位投影、MapCoordinate 地图坐标系

### 变换与插值

- [Matrix.md](Matrix.md) - 4x4 矩阵变换（平移/旋转/缩放）
- [Interpolation.md](Interpolation.md) - Cardinal/Hermite 三次插值函数

### 工具函数

- [Utilities.md](Utilities.md) - ruler 刻度尺、animation 动画、getLoopColors 循环颜色、throttle 节流

## 画笔平台支持说明

| 画笔 | H5 | 微信小程序 | 支付宝小程序 | uni-app |
|------|-----|-----------|-------------|----------|
| Canvas | ✅ `new Canvas(el)` | ✅ 组件方式 | ✅ 组件方式 | ✅ 组件方式 |
| SVG | ✅ `new SVG(el)` | ❌ | ❌ | ❌ |
| WebGL | ✅ `getWebGLContext()` | ❌ | ❌ | ❌ |
| RawCanvas | ✅ | ✅ | ✅ | ✅ |

**注意**: SVG 和 WebGL 仅支持 H5 端。Canvas 在不同平台的 API 完全一致，但初始化方式不同：
- **H5**: `new Canvas(domElement)`
- **小程序**: 通过 ui-canvas 组件的 `fetch()` 方法获取实例

## 快速使用

### H5 端使用 Canvas

```js
import { Canvas } from 'vislite';

var painter = new Canvas(document.getElementById('root'));

painter.config({
    fillStyle: "red"
}).fillCircle(200, 150, 100);

// 设置区域用于交互
painter.setRegion('circle');
painter.bind('click', (regionName, x, y) => {
    console.log(regionName, x, y);
});
```

### 小程序端使用 Canvas

详见各小程序平台的文档：
- [微信小程序 Canvas](miniprogram/ui-canvas.md)
- [支付宝小程序 Canvas](minialipay/ui-canvas.md)
- [uni-app Canvas](uniapp/ui-canvas.md)

### 树布局

```js
import { Canvas, TreeLayout } from 'vislite';

var treeLayout = new TreeLayout();
treeLayout.setOption({
    type: "rect",
    direction: "TB",
    x: 250,
    y: 20,
    width: 500,
    height: 260
});

var tree = treeLayout.use(data);

// 绘制连线
for (var key in tree.node) {
    var pid = tree.node[key].pid;
    if (pid) {
        painter.beginPath()
            .moveTo(tree.node[key].left, tree.node[key].top)
            .bezierCurveTo(...)
            .stroke();
    }
}

// 绘制节点
painter.fullCircle(tree.node[key].left, tree.node[key].top, 10);
```

## 核心导出

```js
import {
    // 画笔
    Canvas,          // 跨平台（初始化方式不同）
    SVG,             // 仅 H5
    RawCanvas,       // 跨平台

    // 布局
    TreeLayout,
    PieLayout,
    BarLayout,

    // 投影
    Mercator,
    Eoap,
    MapCoordinate,

    // 变换
    Matrix4,
    rotate,
    move,
    scale,

    // 插值
    Cardinal,
    Hermite,

    // 工具
    ruler,
    animation,
    getLoopColors,
    throttle,
    assemble,

    // WebGL（仅 H5）
    getWebGLContext,
    Shader,
    Texture,
    Buffer
} from 'vislite';
```

## 典型场景

- 创建跨平台图表（柱状图、饼图、树图）
- 地图可视化（墨卡托/等角斜方位投影）
- 画布/SVG/WebGL 图形绑制
- 数据可视化算法应用
- 矩阵变换与插值计算
- 小程序/uni-app 多端开发