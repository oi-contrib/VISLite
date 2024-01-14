- 💘 开源不易，去 <i>[Github给个Star](https://github.com/oi-contrib/VISLite) </i>吧！

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
    <a href="https://github.com/oi-contrib/VISLite" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/VISLite?style=social">
    </a>
     <a href="https://gitee.com/oi-contrib/VISLite" target='_blank'>
        <img alt="Gitee repo stars" src="https://gitee.com/oi-contrib/VISLite/badge/star.svg?theme=dark">
    </a>
</p>

# VISLite

```VISLite```是一个使用```TypeScript```开发的可视化库。官网地址：[https://oi-contrib.github.io/VISLite](https://oi-contrib.github.io/VISLite)

主要提供了跨端的画布和计算，开发人员只需要按照文档的描述就可以非常简单的完成包括Web、uni-app、微信小程序等平台的可视化开发，除了必要的初始化差异，主要的业务代码部分不同端完全一致。

## 简介

这是一个轻量级的数据可视化资源库，目标是：帮助你更快速、简单、高效的开发出任意的可视化业务产品。

> 本项目已在[开源中国](https://www.oschina.net/p/vislite)中开源，欢迎关注和留言。

### 常用的算法

我们通过提供可视化常用的算法来帮助你绘制复杂图表。比如下面的树图，通过简单的配置就可以把任意格式的数据变成任意绘制的带坐标的数据：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_1.png" width="400"/>

> 上述例子的运行地址：[从左到右树状图](https://oi-contrib.github.io/VISLite/#/example/canvas/tree-layout-lr)。

除了[树布局](https://oi-contrib.github.io/VISLite/#/api/treeLayout)外，我们还提供了：[刻度尺算法](https://oi-contrib.github.io/VISLite/#/api/ruler)来帮助你计算刻度应该如何确定、[等角斜方位投影](https://oi-contrib.github.io/VISLite/#/api/eoap)和[墨卡托投影](https://oi-contrib.github.io/VISLite/#/api/mercator)来绘制地图、[插值函数](https://oi-contrib.github.io/VISLite/#/api/cardinal)来完成折线变光滑的曲线、[变换矩阵](https://oi-contrib.github.io/VISLite/#/api/matrix4)提供各种坐标变换等。

### 画笔加强

我们对画笔进行了加强，使得其更简单好用。比如canvas、webgl，抽象出区域的概念，使得无论你绘制的图形多么的不规则，都可以很轻松的实现交互功能：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_2.png" width="400"/>

> 上述例子的运行地址：[中国地图](https://oi-contrib.github.io/VISLite/#/example/canvas/china)。

画笔除了像上面那样为了方便交互而补充区域的设计外，还对原来的API进行了一次抽象，使得API更友好简单```（比如WebGL，即使不会3D的人也可以轻松使用，而SVG的使用，你无需去记忆那些晦涩难懂的属性）```，同时，我们还抹平了不同版本浏览器等之间的差异。

### 数据驱动的3D

通过一个简单```立方体JSON```表达立方体意图，从而快速实现3D图表开发：

<img src="https://oi-contrib.github.io/VISLite/images/docs/ring-simple.png" width="400"/>

> 上述例子的运行地址：[环图](https://oi-contrib.github.io/VISLite/#/example/webgl/ring-simple)。

### 立方体运算

借助我们提供的[立方体运算](https://oi-contrib.github.io/VISLite/#/api/geometry)就可以快速获得常见的立方体的```立方体JSON```数据：

<img src="https://oi-contrib.github.io/VISLite/images/docs/H2O.png" width="400"/>

> 上述例子的运行地址：[水分子式H2O](https://oi-contrib.github.io/VISLite/#/example/webgl/H2O)。

### 支持跨端开发

除了Web端外，我们还针对uni-app、微信小程序等端进行了支持，并且不同端API保持一致，大大提高了代码的复用性：

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_3.png" width="600"/>

> 上述例子的运行地址：[金额波浪球](https://oi-contrib.github.io/VISLite/#/example/svg/money-schedule)。

基于实际需要，我们目前对 ```Canvas``` 提供了跨端支持，除 ```Web端``` 外，还支持 ```原生微信小程序``` 和 ```uni-app端``` （编译成H5、微信小程序、支付宝小程序等） ，如果后续有必要，我们会对Canvas支持的端或SVG、WebGL等画笔进行更多端扩展。

### 可视化大屏

当然，按照业务和UI设计，快速开发一个大屏也是相对容易的：

<img src="https://oi-contrib.github.io/VISLite/images/docs/bigview.jpeg" width="700"/>

> 上述例子的运行地址：[数据看板大屏](https://oi-contrib.github.io/VISLite/#/bigview?page=databoard)。

## 特点

- 灵活的引入方式：包括npm安装后按照```ES Module```或```CommonJS```规范引入或直接使用script标签的```CDN```方式。
- 按需引入或全局引入：支持源码TS引入、按需JS引入或者全量引入等多种方式。
- 简单与复杂共存：一方面我们提供了可视化需要的基础功能，你可以按照自己的需要组合使用；另一方面，为了加速开发，我们针对常见的可视化业务场景进行了封装，可以帮助你快速完成，你可以根据实际情况进行选择。
- 向下兼容：我们向你保证，始终向下兼容```（alpha和beta版本为测试版本，不包括）```，因此，无论何时，最新版本总是最好的选择。

> 版本说明：alpha为开发阶段、beta为发布前测试、rc为候选版本、无后缀的为正式版本。

## 需求墙

我们的目标是不断完善丰富可视化功能，非常希望获得你宝贵的建议和批评，无论任何想法，都可以给我们[留言](https://github.com/oi-contrib/VISLite/issues)告诉我们。

你所提的任何建议我们都会在最长一周内进行反馈说明。

## 更新日志

详见[正式版更新日志](./CHANGELOG)，我们会在每次发布完正式版本后更新其内容。

## 下一步

我们会在这里列出接下来的工作重心：

- Canvas、SVG和WebGL画笔功能丰富
- 为加速开发，提供常用坐标系和布局
- 文档优化（提高可读性、丰富用例、补充教程）

给我们[留言](https://github.com/oi-contrib/VISLite/issues)告诉我们你希望快速扩展的功能，我们会优先你的建议考虑哦～

## 参与贡献

你可以选择下列一项或多项进行参与：

- 代码维护：由于新功能或一些BUG的出现，对代码进行维护和升级。
- 文档编辑：主要是接口文档和教程需要编辑，这很重要。
- 用例开发和测试：在项目的test文件夹下有一些测试，而在docs文档中存在一些例子需要补充。
- 参与讨论：主要是讨论未来如何发展，改造的方向等。

如果有意向加入我们，你可以通过提 [issue](https://github.com/oi-contrib/VISLite/issues) 和我们取到联系，请简单说明一下情况，我们会尽快回复。

你可以查看[VISLite 贡献指南](./.github/CONTRIBUTING.md)文件了解更多细节，查看[AUTHORS.txt](./AUTHORS.txt)了解所有的贡献者。

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步
