export const steamAction = {
  bundleID:'com.valvesoftware.steam',
  url:'steam://open/bigpicture',
  returnWhen:'matched-window-closes',
  windowTitles:['Steam Big Picture Mode'],
  preferredPresentation:'fullscreen',
  readyWhen:'visible-window',
  instructions:{
    en:'Open Steam Big Picture. MacTV returns when its window closes; Accessibility access is used to observe this window.',
    'zh-Hans':'打开 Steam 大屏模式；关闭大屏窗口后返回 MacTV。观察窗口需要辅助功能权限。'
  }
} as const;

/** Any application can bind this feature to its own reviewed launch port. */
export function createSteamLauncher(port: {open(action: typeof steamAction): unknown}) {
  return {enter:()=>port.open(structuredAction())};
}
function structuredAction(): typeof steamAction {
  return {...steamAction,instructions:{...steamAction.instructions}};
}
