**English** · [中文](./README.md) · [📖 Online Docs](https://oi-contrib.github.io/VISLite)

-   💘 Open source is not easy, please <i>[Give a Star on Github](https://github.com/oi-contrib/VISLite) </i>!

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

🚀 A lightweight and elegant cross-platform data visualization solution

`VISLite` is a high-performance visualization library built with `TypeScript`. Official website: [https://oi-contrib.github.io/VISLite](https://oi-contrib.github.io/VISLite)

It provides unified cross-platform canvas drawing and computing capabilities, allowing developers to focus on business logic and easily implement visualization applications across Web, uni-app, WeChat Mini Program, Alipay Mini Program and other platforms. Except for minor platform differences in initialization configuration, the core business code is completely universal.

## Introduction

🎯 Lightweight data visualization development library —— Help you build visualization products faster, simpler and more efficiently.

> This project has been open sourced on [Open Source China](https://www.oschina.net/p/vislite), welcome to follow and leave comments.

## Quick Start

### 📦 Installation

```bash
npm install --save vislite
```

### 🖼️ Prepare Canvas

```html
<div id="root" style="width:500px;height:300px;"></div>
```

### 🎨 Start Drawing

Get the painter to draw any content you need. For example, get the Canvas painter to draw a red circle:

```js
import { Canvas } from 'vislite';

var painter = new Canvas(document.getElementById('root'));

painter.config({
    fillStyle: "red"
}).fillCircle(200, 150, 100);
```

More complex charts? We provide rich auxiliary APIs. Take tree layout as an example, you can draw a tree diagram in just a few steps:

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
    "name": "Frontend",
    "children": [{
        "name": "Basic",
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
        "name": "Framework"
    }, {
        "name": "Techniques"
    }]
};

var tree = treeLayout.use(data);

// Draw connections
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

// Draw nodes and text
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

For detailed usage of tree layout, please refer to: [《Tutorial / Tree Layout》](https://oi-contrib.github.io/VISLite/#/course/tree-layout)

## Core Features

### 🧮 Visualization Algorithm Library

We have encapsulated commonly used algorithms in visualization development to help you easily draw complex charts. Through simple configuration, you can convert any format of data into drawing data with coordinates:

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_1.png" width="400"/>

> Demo: [Left-to-right Tree Diagram](https://oi-contrib.github.io/VISLite/#/example/canvas/tree-layout-lr)

In addition to [Tree Layout](https://oi-contrib.github.io/VISLite/#/api/treeLayout), we also provide: [Ruler Algorithm](https://oi-contrib.github.io/VISLite/#/api/ruler), [Equirectangular Oblique Azimuthal Projection](https://oi-contrib.github.io/VISLite/#/api/eoap), [Mercator Projection](https://oi-contrib.github.io/VISLite/#/api/mercator), [Interpolation Function](https://oi-contrib.github.io/VISLite/#/api/cardinal), [Transformation Matrix](https://oi-contrib.github.io/VISLite/#/api/matrix4), etc.

### 🖌️ Enhanced Painter

The painter has been carefully designed to be simpler to use and more powerful. Taking Canvas as an example, we abstract the concept of "region", so that no matter how irregular the shape is, you can easily implement interactions:

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_2.png" width="400"/>

> Demo: [China Map](https://oi-contrib.github.io/VISLite/#/example/canvas/china)

The painter not only designs regions for interaction, but also elegantly encapsulates native APIs with more user-friendly and intuitive interfaces (e.g., WebGL makes 3D development zero-threshold, SVG eliminates the need to memorize obscure attributes). It also automatically eliminates browser compatibility differences.

### 📱 Cross-platform Support

In addition to Web, it also supports uni-app, WeChat Mini Program, Alipay Mini Program and other platforms with unified APIs, greatly improving code reuse:

<img src="https://oi-contrib.github.io/VISLite/images/docs/what_3.png" width="600"/>

> Demo: [Money Wave Ball](https://oi-contrib.github.io/VISLite/#/example/svg/money-schedule)

Currently `Canvas` supports: Web, native WeChat Mini Program, native Alipay Mini Program, uni-app (compiled to H5, WeChat Mini Program, Alipay Mini Program, etc.). We will continue to expand more platforms and painter types in the future.

## Core Advantages

-   **Flexible import methods**: Supports ES Module / CommonJS import after npm installation, as well as script tag CDN method
-   **On-demand loading**: TS source import, on-demand JS import or full import, multiple modes to choose from
-   **Simplicity and power coexist**: Provides basic visualization components that can be freely combined, and also supports encapsulation solutions for common scenarios
-   **Stable and reliable**: Fully backward compatible within the same major version (except alpha and beta versions), always keep the latest version as the best choice

> Version specification: alpha (development version) → beta (testing version) → rc (release candidate) → next (pre-release version) → official release

## Feedback

We are committed to continuously improving visualization functions and look forward to your valuable suggestions! Welcome to communicate with us through [Issues](https://github.com/oi-contrib/VISLite/issues).

All suggestions will be responded to within one week.

## Changelog

See [CHANGELOG](./CHANGELOG) for details, updated after each official version release.

## Roadmap

Recent work focus:

-   Provide commonly used coordinate systems and layout components to accelerate development
-   Continuously optimize documentation (improve readability, enrich examples, improve tutorials)

Want a feature? [Tell us](https://github.com/oi-contrib/VISLite/issues) and we'll prioritize it!

## Contribution Guide

Welcome to participate in the project through the following ways:

-   **Code maintenance**: Handle new feature development and Bug fixes
-   **Documentation improvement**: Write and optimize interface documentation and tutorials
-   **Test cases**: Supplement test cases in the test directory and examples in the docs directory
-   **Direction discussion**: Participate in discussions on the future development of the project

Interested in joining? Please contact us through [issue](https://github.com/oi-contrib/VISLite/issues), please briefly describe the situation, and we will reply as soon as possible.

See [VISLite Contribution Guide](./.github/CONTRIBUTING.md) and [AUTHORS.txt](./AUTHORS.txt)

## Example Projects

Examples developed based on VISLite and related plugins (such as [@vislite/canvas](https://github.com/oi-contrib/vislite-plugin-canvas), [@vislite/chart](https://github.com/oi-contrib/vislite-plugin-chart)):

<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review1.png" style="width:700px;border:2px solid black;margin-bottom:20px;"/>
<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review2.png" style="width:700px;border:2px solid black;margin-bottom:20px;"/>
<img src="https://oi-contrib.github.io/VISLite/images/docs/examples/review3.png" style="width:300px;border:2px solid black;margin-bottom:20px;"/>

For more examples, please visit: [VISLite Example Projects](https://rapid-start.github.io/VISLite-examples/index.html)

## License

MIT License

<<<<<<< HEAD
Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) Step By Step
=======
Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) Step By Step
>>>>>>> dev
