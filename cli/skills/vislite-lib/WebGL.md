# WebGL API

WebGL 相关模块，用于 3D 图形渲染。**仅支持 H5 端**。

## 获取 WebGL 上下文

```js
import { getWebGLContext } from 'vislite';

var canvas = document.getElementById('canvas');
var gl = getWebGLContext(canvas, scale, {
    preserveDrawingBuffer: true
}, 'scaleToFill');
```

### 参数说明

- **canvas**: HTMLCanvasElement
- **scale**: 缩放比例，默认1
- **opts**: 配置项
  - `preserveDrawingBuffer`: 是否保留绘制缓冲区
- **mode**: 缩放模式
  - `scaleToFill`: 拉伸填充
  - `aspectFit`: 适应（保持比例）
  - `aspectFill`: 覆盖（保持比例）

### 返回值

返回 `WebGL2RenderingContext` 对象。

## Shader (着色器)

```js
import { Shader } from 'vislite';

var shader = new Shader(gl, {
    vertexShader: '...',      // 顶点着色器源码
    fragmentShader: '...'      // 片元着色器源码
});

shader.use();
```

### 方法

- `use()`: 使用该着色器程序
- `setAttribute(name, data)`: 设置顶点属性
- `setUniform(name, type, value)`: 设置 uniform 变量

## Buffer (缓冲区)

```js
import { Buffer } from 'vislite';

var buffer = new Buffer(gl);
buffer.setAttribute('position', data);
buffer.bind();
```

## Texture (纹理)

```js
import { Texture } from 'vislite';

var texture = new Texture(gl);
texture.bind();
texture.setImage(image);
texture.setParameter(params);
```

## 使用示例

```js
import { getWebGLContext, Shader, Buffer, Texture } from 'vislite';

var gl = getWebGLContext(canvas, 1);

// 创建着色器
var shader = new Shader(gl, {
    vertexShader: `
        attribute vec4 position;
        void main() {
            gl_Position = position;
        }
    `,
    fragmentShader: `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
});

shader.use();

// 创建缓冲区
var buffer = new Buffer(gl);
buffer.setAttribute('position', new Float32Array([
    0, 0.5, 0,
    -0.5, -0.5, 0,
    0.5, -0.5, 0
]));
buffer.bind();

// 绘制
gl.drawArrays(gl.TRIANGLES, 0, 3);
```