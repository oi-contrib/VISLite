# TreeLayout 树布局

TreeLayout 用于绘制树状图，支持多种布局方向和交互。

## 引入

```js
import { TreeLayout } from 'vislite';
```

## 初始化

```js
var treeLayout = new TreeLayout(config);
```

### config 配置

```js
{
    // 获取根节点方法
    root: function(initTree) {
        return initTree;
    },

    // 获取子节点方法
    children: function(parentTree, initTree) {
        return parentTree.children;
    },

    // 获取节点ID方法
    id: function(treedata) {
        return treedata.name;
    }
}
```

## setOption 设置布局行为

```js
treeLayout.setOption({
    offsetX: 0,           // 水平方向隐藏节点偏差
    offsetY: 0,           // 垂直方向隐藏节点偏差
    duration: 500,        // 切换动画时长(ms)
    type: 'rect',         // 树图类型：plain|rect|circle
    direction: 'LR',      // 方向：LR|RL|TB|BT
    x: 250,               // 根一侧的中间位置x坐标
    y: 20,                // 根一侧的中间位置y坐标
    width: 500,           // 矩形树图宽度(type=rect时有效)
    height: 260,          // 矩形树图高度(type=rect时有效)
    radius: 100           // 圆树图半径(type=circle时有效)
});
```

### type 类型

- **plain**: 普通树图（默认）
- **rect**: 矩形树图
- **circle**: 圆树图

### direction 方向

- **LR**: 从左往右
- **RL**: 从右往左
- **TB**: 从上往下（默认）
- **BT**: 从下往上

## use 坐标计算

```js
var tree = treeLayout.use(initTree, noOpens);
```

### 返回值 tree 结构

```js
{
    node: {
        '节点ID': {
            left: x坐标,
            top: y坐标,
            pid: 父节点ID,
            show: 是否显示,
            deg: 旋转角度(circle类型时)
        }
    },
    size: 节点数量,
    deep: 深度
}
```

### noOpens 参数

控制节点展开/闭合状态：

```js
treeLayout.use(initTree, {
    'nodeId1': false,  // 闭合
    'nodeId2': true    // 打开
});
```

## bind 绑定渲染

```js
treeLayout.bind(initTree, function(tree) {
    // 绘制树图
    for (var key in tree.node) {
        var node = tree.node[key];
        // 绘制节点...
    }
}, noOpens);
```

## 交互方法

```js
// 关闭节点
treeLayout.closeNode('nodeId');

// 打开节点
treeLayout.openNode('nodeId');

// 切换节点状态
treeLayout.toggleNode('nodeId');

// 更新布局
treeLayout.doUpdate();

// 解绑
treeLayout.unbind();
```

## 使用示例

```js
var treeLayout = new TreeLayout();

treeLayout.setOption({
    type: 'rect',
    direction: 'TB',
    x: 250,
    y: 20,
    width: 500,
    height: 260
});

var data = {
    name: '前端',
    children: [{
        name: '基础',
        children: [{ name: 'HTML' }, { name: 'CSS' }]
    }, {
        name: '框架'
    }]
};

var tree = treeLayout.use(data);

// 绘制连线
painter.config({ strokeStyle: 'red' });
for (var key in tree.node) {
    var pid = tree.node[key].pid;
    if (pid) {
        painter
            .beginPath()
            .moveTo(tree.node[key].left, tree.node[key].top)
            .bezierCurveTo(...)
            .stroke();
    }
}

// 绘制节点
for (var key in tree.node) {
    painter.fullCircle(tree.node[key].left, tree.node[key].top, 10);
}
```