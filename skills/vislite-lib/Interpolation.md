# 插值函数 API

VISLite 提供 Cardinal 和 Hermite 两种三次插值函数，用于平滑曲线绘制。

## Hermite 插值

Hermite 插值需要指定两个端点和两个端点处的斜率。

### 引入

```js
import { Hermite } from 'vislite';
```

### 初始化

```js
var hermite = new Hermite(u);
```

- **u**: 张弛系数，控制曲线在端点处的弯曲程度，默认 0.5

### 设置点位置

```js
hermite.setP(x1, y1, x2, y2, s1, s2);
```

参数说明：
- **x1, y1**: 左边点位置
- **x2, y2**: 右边点位置
- **s1**: 左边点的切线斜率
- **s2**: 右边点的切线斜率

### 计算插值

```js
var y = hermite.use(x);
```

根据 x 值返回对应的 y 值。

### 示例

```js
var hermite = new Hermite(0.5);

hermite.setP(0, 0, 100, 100, 0, 1);

// 计算x=50时的y值
var y = hermite.use(50);
```

---

## Cardinal 插值

Cardinal 插值是 Hermite 的扩展，只需提供点序列，系统自动计算斜率。

### 引入

```js
import { Cardinal } from 'vislite';
```

### 初始化

```js
var cardinal = new Cardinal(t);
```

- **t**: 张弛系数，控制曲线走势，默认 0
  - t = 0：默认曲线
  - t = -1：分水岭效果
  - |t| 越大，曲线调整越剧烈

### 设置点序列

```js
cardinal.setP([[x1, y1], [x2, y2], [x3, y3], ...]);
```

至少需要两个点。

### 计算插值

```js
var y = cardinal.use(x);
```

根据 x 值返回对应的 y 值。

### 示例

```js
var cardinal = new Cardinal(0);

cardinal.setP([
    [0, 0],
    [25, 25],
    [50, 10],
    [75, 50],
    [100, 100]
]);

// 绘制平滑曲线
for (var x = 0; x <= 100; x += 1) {
    var y = cardinal.use(x);
    painter.lineTo(x, y);
}
painter.stroke();
```

---

## 对比与选择

| 特性 | Hermite | Cardinal |
|------|---------|----------|
| 端点斜率 | 手动指定 | 自动计算 |
| 参数数量 | 6个 | 2个（点序列） |
| 灵活性 | 高（可自定义斜率） | 中（受邻近点影响） |
| 适用场景 | 精确控制曲线形状 | 自然平滑的曲线 |

## 应用场景

- **折线图平滑**: 使用 Cardinal
- **动画路径**: 使用 Hermite 自定义缓动
- **字体渲染**: 使用 Cardinal 平滑字形边缘
- **地图等高线**: 使用 Hermite 精确控制地形变化