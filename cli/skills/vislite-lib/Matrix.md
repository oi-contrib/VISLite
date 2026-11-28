# Matrix4 矩阵变换

Matrix4 提供 4x4 矩阵变换能力，用于复杂的图形变换。

## 引入

```js
import { Matrix4 } from 'vislite';
```

## 初始化

```js
var matrix = new Matrix4();
// 或指定初始矩阵
var matrix = new Matrix4([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
```

## 基本变换

### 平移

```js
matrix.move(dis, a, b, c);
```

参数说明：
- **dis**: 移动距离
- **a, b, c**: 移动方向向量的 x, y, z 分量

```js
// 向x轴正方向移动10
matrix.move(10, 1, 0, 0);

// 向y轴负方向移动5
matrix.move(-5, 0, 1, 0);
```

### 旋转

```js
matrix.rotate(deg, a1, b1, c1, a2, b2, c2);
```

参数说明：
- **deg**: 旋转角度（弧度制）
- **a1, b1, c1**: 旋转轴向量（确定旋转平面）
- **a2, b2, c2**: 旋转正方向向量

```js
// 绕x轴旋转
matrix.rotate(Math.PI, 1, 0, 0);

// 绕y轴旋转
matrix.rotate(Math.PI, 0, 1, 0);

// 绕z轴旋转
matrix.rotate(Math.PI, 0, 0, 1);
```

### 缩放

```js
matrix.scale(xTimes, yTimes, zTimes, cx, cy, cz);
```

参数说明：
- **xTimes, yTimes, zTimes**: 各轴缩放比例
- **cx, cy, cz**: 缩放中心点坐标

```js
// 以原点为中心放大2倍
matrix.scale(2, 2, 2);

// 以(10, 10, 0)为中心放大
matrix.scale(2, 2, 1, 10, 10, 0);
```

## 矩阵运算

### 矩阵乘法

```js
matrix.multiply(newMatrix4, flag);
```

- **flag**: false（默认）新矩阵左乘当前矩阵；true 则右乘

### 应用变换

```js
var [x, y, z, w] = matrix.use(px, py, pz, pw);
```

将变换应用到坐标点，返回变换后的齐次坐标。

### 获取矩阵值

```js
var values = matrix.value();
```

返回 4x4 矩阵的 16 个元素数组（列主序存储）。

### 重置矩阵

```js
matrix.setValue([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
```

## 使用示例

### 组合变换

```js
var matrix = new Matrix4();

// 先平移再旋转
matrix.move(100, 1, 0, 0);
matrix.rotate(Math.PI / 4, 0, 0, 1);

// 应用到点
var [x, y] = matrix.use(10, 20, 0);
```

### 3D 变换

```js
var matrix = new Matrix4();

// 绕x轴旋转45度
matrix.rotate(Math.PI / 4, 1, 0, 0);

// 绕y轴旋转30度
matrix.rotate(Math.PI / 6, 0, 1, 0);

// 应用到3D点
var [x, y, z, w] = matrix.use(10, 20, 30);
```

---

## 基础变换函数

除 Matrix4 类外，还提供独立的基础变换函数：

### rotate 旋转

```js
import { rotate } from 'vislite';

var [x, y] = rotate(cx, cy, deg, px, py);
```

绕点 (cx, cy) 旋转 deg 弧度后的 (px, py) 坐标。

### move 平移

```js
import { move } from 'vislite';

var [x, y, z] = move(dis, a, b, c, px, py, pz);
```

沿向量 (a, b, c) 方向移动 dis 距离后的坐标。

### scale 缩放

```js
import { scale } from 'vislite';

var [x, y, z] = scale(times, cx, cy, cz, px, py, pz);
```

以 (cx, cy, cz) 为中心缩放 times 倍后的坐标。