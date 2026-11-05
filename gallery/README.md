# Gallery example plugin

An independently buildable photo experience. Photo connections and folders are
resources used by Gallery, not additional plugins.

```sh
npm ci
npm test
```

`build/core.mjs` exports `createGallery(resources)` for another app or a Node
program. Supply a `browse` function; no MacTV process, source checkout, Xcode or
account is required. The MacTV binding is only `src/mactv.ts`. `dist/` is the
installable package directory, including license and documentation. Install it
through MacTV's plugin manager; it can be updated, disabled and removed live.

Version 0.3 uses API 2: the photo resource port and handler return Promises.
Await `createGallery(resources).handle(...)` in standalone consumers. MacTV
multiplexes native requests and cancels the invocation on navigation/disable.
No provider-specific native service or application source is imported.

## 中文

这是相册插件本身。图片目录、NAS 和云盘连接是它使用的资源，不是其他插件。
核心代码不依赖 MacTV；可以在独立目录执行上述命令并通过自己的测试。
安装产物位于 `dist/`，可通过应用内插件管理安装、启停、更新和移除。
