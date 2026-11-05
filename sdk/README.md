# MacTV Plugin SDK 2

Independent TypeScript contracts and a small optional handler helper. No MacTV
source, native framework, Xcode or account is needed to test or pack this SDK.
Run `npm ci && npm test`; `npm pack` produces a development SDK tarball.

Manifest `apiVersion: 2` opts into Promise-returning `host.library` and
`host.fetchJSON`. Both sync and async handler results are accepted. Native calls
are multiplexed with request IDs; up to four operations run concurrently, with
64 requests per invocation. Await all host calls before returning. Navigation,
disable and update cancel the invocation and owned work. Replies from an ended
invocation cannot update a replacement view. Host resource/domain capabilities
still require manifest declarations and review. Credentials never enter scripts.

`definePlugin(handler)` returns an immutable handler object; adapters can export
its `handle` for an esbuild IIFE with global name `plugin`, or implement the
structural interface directly. Feature libraries take injected ports; they do
not import the application. Gallery/Steam are standalone examples of that split.

Version 1 remains supported. Version 2 is request-scoped: there are no persistent
background workers, arbitrary SwiftUI injection, timers or shell/Git access.
No npm namespace is published by this repository; the SDK is distributed as
source or a packable artifact until separate registry publication is authorized.

## 中文

独立的 v2 类型契约与可选处理器工具。接口通过 Promise 返回，支持并行、乱序响应和整轮取消。
每轮最多 64 次原生请求，同时执行 4 次。返回前必须等待全部原生调用完成。
业务库注入接口，不依赖 MacTV 主程序。v1 保持兼容；v2 当前是请求级生命周期，
不提供长期后台进程、任意 SwiftUI 注入、定时器或系统命令能力。
