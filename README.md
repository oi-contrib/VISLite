-   💘 开源不易，去 <i>[Github给个Star](https://github.com/oi-contrib/VISLite) </i>吧！

<img src='https://oi-contrib.github.io/VISLite/images/logo.png' height='300px'/>

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=vislite&interval=7">
        <img src="https://img.shields.io/npm/dm/vislite.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/vislite">
        <img src="https://img.shields.io/npm/v/vislite.svg" alt="npm">
    </a>
    <a href="https://www.jsdelivr.com/package/npm/vislite">
        <img src="https://data.jsdelivr.com/v1/package/npm/vislite/badge" alt="cdn">
    </a>
    <a href="https://github.com/oi-contrib/VISLite/issues">
        <img src="https://img.shields.io/github/issues/oi-contrib/VISLite" alt="issue">
    </a>
    <a href="https://github.com/oi-contrib/VISLite" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/VISLite">
    </a>
    <a href="https://github.com/oi-contrib/VISLite">
        <img src="https://img.shields.io/github/forks/oi-contrib/VISLite" alt="forks">
    </a>
    <a href="https://gitee.com/oi-contrib/VISLite" target='_blank'>
        <img alt="Gitee repo stars" src="https://gitee.com/oi-contrib/VISLite/badge/star.svg">
    </a>
    <a href="https://gitee.com/oi-contrib/VISLite">
        <img src="https://gitee.com/oi-contrib/VISLite/badge/fork.svg" alt="forks">
    </a>
</p>

<img src="https://nodei.co/npm/vislite.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

# VISLite

🚀 一款轻量、优雅的跨端数据可视化解决方案

`VISLite` 是一个使用 `TypeScript` 构建的高性能可视化库。官网地址：[https://oi-contrib.github.io/VISLite](https://oi-contrib.github.io/VISLite)

它提供了统一的跨端画布绘制与计算能力，让开发者只需关注业务逻辑，即可轻松实现 Web、uni-app、微信小程序、支付宝小程序等多平台的可视化应用。除初始化配置存在细微平台差异外，核心业务代码完全通用。

## 简介

🎯 轻量级数据可视化开发库 —— 助你更快速、简洁、高效地构建可视化产品。

> 本项目已在[开源中国](https://www.oschina.net/p/vislite)中开源，欢迎关注和留言。

## 快速开始

### 📦 安装

```bash
npm install --save vislite
```

### 🖼️ 准备画布

```html
<div id="root" style="width:500px;height:300px;"></div>
```

### 🎨 开始绘制

获取画笔即可绘制你需要的任意内容。例如，获取 Canvas 画笔绘制一个红色圆：

```js
import { Canvas } from 'vislite';

var painter = new Canvas(document.getElementById('root'));

painter.config({
    fillStyle: "red"
}).fillCircle(200, 150, 100);
```

更复杂的图表？我们提供了丰富的辅助 API。以树布局为例，只需简单几步即可绘制树图：

<img src="https://oi-contrib.github.io/VISLite/images/docs/tree.png" width="500"/>

```js
import { Canvas, TreeLayout } from 'vislite';

var painter = new Canvas(document.getElementById('root'));
var treeLayout = new TreeLayout();

treeLayout.setOption({
    type: "rect",
    direction: "TB",
    x: 250,
    y: 20,
    width: 500,
    height: 260
});

var data = {
    "name": "前端",
    "children": [{
        "name": "基础",
        "children": [{
            "name": "HTML"
        }, {
            "name": "CSS"
        }, {
            "name": "JavaScript"
        }, {
            "name": "DOM"
        }]
    }, {
        "name": "框架"
    }, {
        "name": "小技术"
    }]
};

var tree = treeLayout.use(data);

// 绘制连线
painter.config({
    strokeStyle: 'red'
});
for (var key in tree.node) {
    var pid = tree.node[key].pid;

    if (pid) {
        var dist = (tree.node[key].top - tree.node[pid].top) * 0.5;

        painter
            .beginPath()
            .moveTo(tree.node[key].left, tree.node[key].top)
            .bezierCurveTo(
                tree.node[key].left, tree.node[key].top - dist,
                tree.node[pid].left, tree.node[pid].top + dist,
                tree.node[pid].left, tree.node[pid].top
            ).stroke();
    }
}

// 绘制节点和文字
painter.config({
    strokeStyle: 'red',
    fontSize: 12
});
for (var key in tree.node) {
    painter.config({
        fillStyle: "white"
    }).fullCircle(tree.node[key].left, tree.node[key].top, 10);

    painter.config({
        fillStyle: "black"
    }).fillText(key, tree.node[key].left + 15, tree.node[key].top);
}
```

树布局的详细用法，请参阅：[《教程 / 树布局》](https://oi-contrib.github.io/VISLite/#/course/tree-layout)

## 核心功能

### 🧮 可视化算法库

我们封装了可视化开发中常用的算法，助你轻松绘制复杂图表。通过简单的配置，即可将任意格式的数据转换为带坐标的绘制数据：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_1.png" width="400"/>

> 示例运行地址：[从左到右树状图](https://oi-contrib.github.io/VISLite/#/example/canvas/tree-layout-lr)

除[树布局](https://oi-contrib.github.io/VISLite/#/api/treeLayout)外，还提供：[刻度尺算法](https://oi-contrib.github.io/VISLite/#/api/ruler)、[等角斜方位投影](https://oi-contrib.github.io/VISLite/#/api/eoap)、[墨卡托投影](https://oi-contrib.github.io/VISLite/#/api/mercator)、[插值函数](https://oi-contrib.github.io/VISLite/#/api/cardinal)、[变换矩阵](https://oi-contrib.github.io/VISLite/#/api/matrix4)等。

### 🖌️ 增强型画笔

画笔经过精心设计，使用更简单、功能更强大。以 Canvas 为例，抽象出「区域」概念，无论图形多么不规则，都能轻松实现交互：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_2.png" width="400"/>

> 示例运行地址：[中国地图](https://oi-contrib.github.io/VISLite/#/example/canvas/china)

画笔不仅为交互而设计区域，还对原生 API 进行了优雅封装，接口更友好直观（如 WebGL 让3D开发零门槛，SVG 无需记忆晦涩属性）。同时自动抹平浏览器兼容性差异。

### 📱 跨端支持

除 Web 端外，还支持 uni-app、微信小程序、支付宝小程序等多端，API 统一，极大提升代码复用率：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_3.png" width="600"/>

> 示例运行地址：[金额波浪球](https://oi-contrib.github.io/VISLite/#/example/svg/money-schedule)

目前 `Canvas` 已支持：Web、原生微信小程序、原生支付宝小程序、uni-app（编译为 H5、微信小程序、支付宝小程序等）。后续将持续扩展更多端和画笔类型。

## 核心优势

-   **灵活的引入方式**：支持 npm 安装后的 ES Module / CommonJS 引入，以及 script 标签 CDN 方式
-   **按需加载**：源码 TS 引入、按需 JS 引入或全量引入，多种模式按需选择
-   **简洁与强大并存**：提供可视化基础组件可自由组合，同时也支持常见场景的封装方案
-   **稳定可靠**：同一大版本完全向下兼容（alpha、beta 版本除外），始终保持最新版本为最优选择

> 版本规范：alpha（开发版）→ beta（测试版）→ rc（候选版）→ next（预发布版）→ 正式版

## 需求反馈

我们致力于不断完善可视化功能，期待你的宝贵建议！欢迎通过 [留言](https://github.com/oi-contrib/VISLite/issues) 与我们交流。

所有建议将在一周内得到回复。

## 更新日志

详见[正式版更新日志](./CHANGELOG)，每次正式版本发布后更新。

## Roadmap

近期工作重点：

-   提供常用坐标系和布局组件，加速开发
-   持续优化文档（提升可读性、丰富示例、完善教程）

有想要的功能？[告诉我们](https://github.com/oi-contrib/VISLite/issues)，我们会优先考虑！

## 贡献指南

欢迎通过以下方式参与项目：

-   **代码维护**：处理新功能开发与 Bug 修复
-   **文档完善**：接口文档和教程的编写与优化
-   **测试用例**：补充 test 目录下的测试用例和 docs 目录下的示例
-   **方向讨论**：参与项目未来发展的讨论

有意加入？请通过 [issue](https://github.com/oi-contrib/VISLite/issues) 联系我们，请简要说明情况，我们会尽快回复。

详见 [VISLite 贡献指南](./.github/CONTRIBUTING.md) 和 [AUTHORS.txt](./AUTHORS.txt)

## 示例项目

基于 VISLite 及相关插件（如 [@vislite/canvas](https://github.com/oi-contrib/vislite-plugin-canvas)、[@vislite/chart](https://github.com/oi-contrib/vislite-plugin-chart)）开发的示例：

<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review1.png" style="width:700px;border:2px solid black;margin-bottom:20px;"/>
<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review2.png" style="width:700px;border:2px solid black;margin-bottom:20px;"/>
<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review3.png" style="width:300px;border:2px solid black;margin-bottom:20px;"/>

更多示例请访问：[VISLite 示例项目](https://rapid-start.github.io/VISLite-examples/index.html)

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步
