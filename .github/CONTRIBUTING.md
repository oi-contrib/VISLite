# VISLite 贡献指南

## 环境搭建

* 需要安装 [Node.js](http://nodejs.org/)。
* 克隆仓库到本地后，执行 ```npm install``` 安装开发依赖。
* 安装EditorConfig插件来规范编辑器。

## 开发

直接执行 ```npm run dev``` 即可启动开发环境。

* 如果是编辑文档，访问： http://127.0.0.1:20000/docs/index.html 。
* 如果是调试功能，访问： http://127.0.0.1:20000/test/example 后选择对应的用例即可。

新增调试页面，只需要在test项目中新建即可，比如：

```
- test
    - example
        - newApi
            - index.html
            - index.ts
```

然后在 ```build/webpack.config.js``` 中添加配置：

```js
entry: {
    example_newApi: './test/example/newApi/index.ts'
}
```

然后记得重新启动后就可以正常访问了。

### 新增功能

主体代码写在 ```src``` 目录中，按照功能分类，对外暴露则在 ```package``` 目录中，结构如下：

```
- package
    - newApi
        - index.ts
```

此外，还需要在 ```package/index.ts``` 中进行注册。

接着，在 ```types/index.d.ts``` 中定义类型，大体格式如下：

```js
export default class VISLite {
    static newApi: newApiType
}

export let newApi: newApiType
```

比如，上面的具体类型 ```newApiType``` 或相关参数的类型可以在 ```types``` 中独立定义，方便项目中引入。

一切完毕后，最后在 ```docs``` 中添加文档，并在 ```CHANGELOG``` 中登记就完成了所有内容。

## 测试

除了开发时候的调试外，还需要添加如下测试：

* （可选）基准测试：在 ```test/benchmark/index.ts``` 中添加。
* （可选）单元测试：直接新建文件 ```test/unit/newApi.spec.ts``` 即可。
* （必选）ESLint：直接运行 ```npm run lint``` 并保证没有报错。

除了调试的测试文件和必选项外，上述测试都根据实际情况添加即可。

## 提交 PR

* fork 本仓库，在自己仓库基于 dev 分支创建专用分支用于提交更改。
* commit 内容请说明清楚本次 PR 的主要目的和改动，描述清楚即可。
* 提交之前确保进行了完善的测试。
* 确保 PR 提交到 dev 分支。
* 修复 Bug 请提供详细的描述信息，或链接到对应的 issue。