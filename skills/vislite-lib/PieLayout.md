# PieLayout 饼图布局

PieLayout 用于绘制饼图/环形图，支持交互和动画。

## 引入

```js
import { PieLayout } from 'vislite';
```

## 初始化

```js
var pieLayout = new PieLayout(config);
```

### config 配置

```js
{
    // 获取名称
    name: function(pieData, initPie) {
        return pieData.name;
    },

    // 获取值
    value: function(pieData, initPie) {
        return pieData.value;
    }
}
```

## setOption 设置布局行为

```js
pieLayout.setOption({
    cx: 200,                    // 圆心x坐标
    cy: 200,                    // 圆心y坐标
    radius: [50, 100],          // 半径：[内半径, 外半径]
    duration: 200               // 动画时长(ms)
});
```

## use 坐标计算

```js
var pie = pieLayout.use(initPie, hoverIndex);
```

### 返回值 pie 结构

```js
{
    count: 数据项数量,
    cx: 圆心x,
    cy: 圆心y,
    radius: [内半径, 外半径],
    hoverIndex: 当前悬浮项索引,
    node: [
        {
            value: 数值,
            name: 名称,
            beginDeg: 开始弧度,
            deg: 跨越弧度,
            isHover: 是否悬浮,
            radius: [当前内半径, 当前外半径],
            label: {
                line: [[x1,y1], [x2,y2], [x3,y3]],  // 标签线
                position: [x, y],                  // 标签位置
                align: 'left' | 'right'             // 对齐方式
            }
        }
    ]
}
```

## bind 绑定渲染

```js
pieLayout.bind(initPie, function(pie) {
    // 绘制饼图
    for (var i = 0; i < pie.count; i++) {
        var node = pie.node[i];
        // 绘制扇形...
    }
});
```

## 交互方法

```js
// 设置悬浮项
pieLayout.setHover(index);

// 更新布局
pieLayout.doUpdate();

// 解绑
pieLayout.unbind();
```

## 使用示例

```js
var pieLayout = new PieLayout();

pieLayout.setOption({
    cx: 200,
    cy: 200,
    radius: [30, 100],
    duration: 300
});

var data = [
    { name: 'HTML', value: 30 },
    { name: 'CSS', value: 20 },
    { name: 'JavaScript', value: 50 }
];

var pie = pieLayout.use(data);

// 绘制饼图
for (var i = 0; i < pie.count; i++) {
    var node = pie.node[i];
    var colors = ['red', 'green', 'blue'];

    painter.config({
        fillStyle: colors[i]
    }).fillArc(pie.cx, pie.cy, node.radius[0], node.radius[1],
               node.beginDeg, node.deg);
}
```