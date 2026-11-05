import {definePlugin,type Host,type MediaItem,type Playback} from '../index';
const item:MediaItem={id:'owned',title:'Photo',subtitle:'',overview:'',source:'example',reference:'opaque',kind:'photo'};
definePlugin(async (_action,input)=>({items:[item],next:input.page}));
async function read(host:Host) {
  const page=await host.library('photos',{});
  const response:unknown=await host.fetchJSON('https://example.invalid/list');
  return {page,response};
}
// @ts-expect-error Native credentials cannot be attached by plugin playback output.
const headers:Playback['headers']={Cookie:'not-allowed'};
// @ts-expect-error Cards require the complete presentation metadata contract.
const incomplete:MediaItem={id:'owned',title:'Photo'};
// @ts-expect-error A provider-specific connection is not another native plugin service.
const invalid=(host:Host)=>host.library('quark-pictures',{});
void read;void headers;void incomplete;void invalid;

import type {ApplicationLaunch} from '../index';
const intent:ApplicationLaunch={bundleID:'example.app',url:'example://open',returnWhen:'matched-window-closes',windowTitles:['Example Window'],preferredPresentation:'fullscreen'};
// @ts-expect-error Named-window lifecycles require an explicit window selector.
const missing:ApplicationLaunch={bundleID:'example.app',url:'example://open',returnWhen:'matched-window-closes'};
void intent;void missing;
