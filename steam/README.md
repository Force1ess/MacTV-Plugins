# Steam UI example plugin

This plugin opens the installed Steam client's Big Picture UI and declares when
MacTV should return. It does not reimplement Steam or require a Steam account to
build or test.

```sh
npm ci
npm test
```

Use `createSteamLauncher({open})` from `build/core.mjs` in another application.
The launch declaration in the installable `dist/` package is generated from the
same tested feature code. MacTV handles OS launching/window tracking through its
generic reviewed application service. The adapter uses API 2. Steam must be installed. Cold startup waits for a visible client window before dispatching the fixed URI. The package declares its exact mode-window title and fullscreen preference; the generic host observes its close/exit and returns to MacTV.

## 中文

首批示例插件之一：进入已安装 Steam 的大屏 UI，并声明何时返回 MacTV。
可独立构建、测试；安装产物是 `dist/`。核心启动动作通过注入接口使用，
不依赖 MacTV 源码，也不要求测试机器安装 Steam。
