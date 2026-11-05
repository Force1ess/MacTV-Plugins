# MacTV Plugins

[简体中文](README.zh-CN.md)

Independent Gallery and Steam UI example plugins for [MacTV](https://github.com/Force1ess/MacTV).
Photo folders, NAS shares and cloud accounts are resources used by Gallery, not additional plugins.

| Plugin | Package | Behavior |
| --- | --- | --- |
| Gallery | [gallery](gallery/README.md) | Photo browsing through an injected resource interface |
| Steam UI | [steam](steam/README.md) | Reviewed handoff to Steam Big Picture |

```sh
npm test
npm run build
```

Tests build each package in an isolated plugin-only checkout. No MacTV source,
Xcode, account or running application is required. Node 22+ is used in CI.
Each directory also supports `npm ci && npm test` independently.

Install the generated `gallery/dist` or `steam/dist` folder through MacTV's plugin
manager. Packages can be installed, updated, disabled and removed without
recompiling or restarting MacTV. The host currently provides both legacy API 1 and Promise-based API 2 with generic native resource services. SDK 2 contracts and helpers are in [sdk](sdk/README.md).
Steam must be installed and configured for Big Picture. Physical fullscreen return
has not been verified. Gallery's domain code imports no MacTV application code.

MacTV pins this repository as its `examples` Git submodule, so app builds use a
reviewable plugin revision rather than implicitly following the latest version.
Plugin development and releases belong here. GPL-3.0; see [LICENSE](LICENSE).

## Git plugin source

MacTV clones/fetches this repository using system Git and the user's existing SSH configuration, keys/agent or Git credential helper. It reads `catalog.json` (schema 2) and prebuilt package files from one immutable commit. Each entry declares its package `directory`; no npm install, checkout hooks or runtime compilation is involved in application installation. Sources remain private until the owner changes visibility. MacTV stores neither SSH private keys nor separate GitHub access tokens. The ZIP releases remain manual distribution artifacts, not the Git installation transport.
