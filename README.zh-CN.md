# MacTV Plugins

[English](README.md)

独立的相册与 Steam UI 示例插件仓库。图片目录、NAS 和云盘账号是相册使用的资源，不是插件。

- `gallery`：独立相册功能库和 MacTV 适配器。
- `steam`：Steam 大屏启动动作和 MacTV 适配器。

执行 `npm test` 在隔离目录分别构建和测试；执行 `npm run build` 生成安装包目录。
不需要 MacTV 源码、Xcode、运行实例或个人账号。
也可以单独进入任一插件目录执行 `npm ci`、`npm test`。

通过 MacTV 插件管理安装 `gallery/dist`、`steam/dist`，无需重新编译或重启 MacTV。
0.3 示例使用支持并行和取消的异步 API 2，独立 SDK 位于 sdk；Steam 真实全屏退出返回尚未验收。
MacTV 主仓库只通过 `examples` Git 子模块固定引用本仓库的版本，不再保留两套插件源码。
许可为 GPL-3.0。
