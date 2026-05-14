# 坐标投影 API

VISLite 提供多种地图坐标投影算法，用于地图可视化开发。

## Mercator 墨卡托投影

墨卡托投影是航海和航空中常用的投影方式。

### 引入

```js
import { Mercator } from 'vislite';
```

### 初始化

```js
var mercator = new Mercator(scale, center);
```

### 参数说明

- **scale**: 缩放比例，默认7
- **center**: 投影中心经纬度 `[经度, 纬度]`，默认 `[107, 36]`（中国中心附近）

### 使用方法

```js
var mercator = new Mercator(7, [107, 36]);

// 将经纬度转换为平面坐标
var [x, y, z] = mercator.use(经度, 纬度);
```

### 使用示例

```js
var mercator = new Mercator(7, [116.4, 39.2]); // 北京

// 北京的经纬度
var [x, y] = mercator.use(116.4, 39.2);
console.log(x, y); // 输出平面坐标
```

---

## Eoap 等角斜方位投影

等角斜方位投影是一种适合显示以某点为中心区域的投影方式。

### 引入

```js
import { Eoap } from 'vislite';
```

### 初始化

```js
var eoap = new Eoap(scale, center);
```

### 参数说明

- **scale**: 缩放比例，默认7
- **center**: 投影中心经纬度 `[经度, 纬度]`，默认 `[107, 36]`

### 使用方法

```js
var eoap = new Eoap(7, [116.4, 39.2]);

// 将经纬度转换为平面坐标
var [x, y, z] = eoap.use(经度, 纬度);
```

### 特点

- 以投影中心为原点，周围的区域变形较小
- 适合绘制局部地图（如某个国家或城市）
- 保持了角度的正确性

---

## MapCoordinate 地图坐标系

MapCoordinate 用于处理地图坐标转换和边界计算。

### 引入

```js
import { MapCoordinate } from 'vislite';
```

### 初始化

```js
var mapCoord = new MapCoordinate(projection, option);
```

### 参数说明

- **projection**: 投影对象（Mercator 或 Eoap）
- **option**: 配置项
  - `width`, `height`: 画布尺寸
  - `x`, `y`: 偏移量

### 主要功能

```js
// 经纬度转屏幕坐标
mapCoord.lonlatToScreen(lon, lat);

// 屏幕坐标转经纬度
mapCoord.screenToLonlat(x, y);

// 获取地图边界
mapCoord.getBoundary();
```

### 使用示例

```js
var mercator = new Mercator(7, [107, 36]);
var mapCoord = new MapCoordinate(mercator, {
    width: 800,
    height: 600
});

// 绘制地图
geoJson.features.forEach(feature => {
    feature.geometry.coordinates.forEach(polygon => {
        painter.beginPath();
        polygon[0].forEach((point, i) => {
            var [x, y] = mapCoord.lonlatToScreen(point[0], point[1]);
            if (i === 0) painter.moveTo(x, y);
            else painter.lineTo(x, y);
        });
        painter.closePath().fill();
    });
});
```

---

## 投影对比

| 特性 | Mercator | Eoap |
|------|----------|------|
| 适用场景 | 全球航海图 | 局部区域图 |
| 中心点 | 固定赤道 | 可自定义 |
| 变形 | 高纬度变形大 | 中心区域变形小 |
| 角度 | 保持方向 | 保持角度 |

## 选择建议

- **全球地图或航海图**: 使用 Mercator
- **某个国家/城市的局部图**: 使用 Eoap
- **复杂地图交互**: 使用 MapCoordinate 配合投影