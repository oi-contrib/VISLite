# @vislite/cli

VISLite 官方命令行工具，提供内置 skills 文档分发与支付宝小程序组件构建。

> v2.0.0 起，CLI 与 skills 不再随 `vislite` 主包分发，需要单独安装。
> CLI 与 `vislite` 版本锁步，请使用与库相同的版本号。

## 安装

```bash
npm install --save-dev @vislite/cli
```

安装后可直接使用 `npx vislite-cli`，未安装时请使用 `npx @vislite/cli`。

## skills

把内置的开发文档复制到当前项目（例如给 AI 编码助手使用）：

```bash
npx @vislite/cli skills --list          # 查看内置 skills
npx @vislite/cli skills --copy ./skills # 复制到 ./skills
npx @vislite/cli skills --copy ./skills -f  # 覆盖已有内容
```

## 构建支付宝小程序组件

```bash
npm install --save-dev vislite
npx @vislite/cli build minialipay
```

命令会读取当前项目安装的 `vislite`，把组件复制到 `components/vislite`。重复执行会先删除旧目录。

## 版本

```bash
npx vislite-cli --version
```

## License

MIT
