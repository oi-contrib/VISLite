# BarLayout 柱状图布局

BarLayout 用于绘制柱状图/条形图。

## 引入

```js
import { BarLayout } from 'vislite';
```

## 初始化

```js
var barLayout = new BarLayout();
```

## setOption 设置布局行为

```js
barLayout.setOption({
    x: 50,              // 左上角x坐标
    y: 350,             // 左上角y坐标
    width: 400,         // 宽度
    height: 300,        // 高度
    category: 'xAxis',  // 分类轴：xAxis|yAxis
    duration: 200       // 动画时长(ms)
});
```

### category 方向

- **xAxis**: 分类在x轴，柱状图从下往上
- **yAxis**: 分类在y轴，条形图从左往右

## use 坐标计算

### 一维数据

```js
var data = {
    category: ['HTML', 'CSS', 'JS'],
    data: [30, 20, 50]
};
var bar = barLayout.use(data);
```

### 二维数据（分组柱状图）

```js
var data = {
    category: ['HTML', 'CSS', 'JS'],
    value: [
        { name: '男生', data: [30, 20, 50] },
        { name: '女生', data: [25, 30, 40] }
    ]
};
var bar = barLayout.use(data);
```

### 返回值 bar 结构

```js
{
    coordinate: {
        x, y, width, height,    // 坐标系位置
        xAxis: { type: 'category' | 'value', data: [...] },
        yAxis: { type: 'category' | 'value', data: [...] }
    },
    node: [
        {
            name: '分组名称',     // 分组柱状图时有效
            bar: [
                {
                    x, y, width, height,  // 矩形位置
                    value: 数值
                }
            ]
        }
    ]
}
```

## 使用示例

```js
var barLayout = new BarLayout();

barLayout.setOption({
    x: 50,
    y: 350,
    width: 400,
    height: 300,
    category: 'xAxis'
});

var data = {
    category: ['HTML', 'CSS', 'JavaScript'],
    data: [30, 20, 50]
};

var bar = barLayout.use(data);

// 绘制坐标系
painter.config({ strokeStyle: 'black' })
    .beginPath()
    .moveTo(bar.coordinate.x, bar.coordinate.y)
    .lineTo(bar.coordinate.x + bar.coordinate.width, bar.coordinate.y)
    .lineTo(bar.coordinate.x + bar.coordinate.width, bar.coordinate.y - bar.coordinate.height)
    .stroke();

// 绘制柱状图
var colors = ['red', 'green', 'blue'];
for (var i = 0; i < bar.node[0].bar.length; i++) {
    var rect = bar.node[0].bar[i];
    painter.config({ fillStyle: colors[i] })
        .fillRect(rect.x, rect.y, rect.width, rect.height);
}
```