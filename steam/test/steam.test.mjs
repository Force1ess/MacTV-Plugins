import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createSteamLauncher,steamAction} from '../build/core.mjs';
import {readFile} from 'node:fs/promises';

test('launches through an injected port without MacTV or Steam installed', () => {
  let action;
  const launcher=createSteamLauncher({open(value){action=value;return 'opened';}});
  assert.equal(launcher.enter(),'opened');
  assert.deepEqual(action,steamAction);
  action.instructions.en='modified';
  assert.notEqual(action.instructions.en,steamAction.instructions.en);
});
test('installable package contains exactly the independently tested launch action',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../dist/manifest.json',import.meta.url),'utf8'));
  assert.deepEqual(manifest.applicationLaunch,steamAction);
});

test('MacTV bundle uses the manifest rather than network or shell access',async()=>{
  const vm=await import('node:vm');
  const context=vm.createContext({});
  vm.runInContext(await readFile(new URL('../plugin.js',import.meta.url),'utf8'),context);
  assert.deepEqual(JSON.parse(await vm.runInContext('plugin.handle("browse",{}).then(JSON.stringify)',context)),{items:[]});
  await assert.rejects(vm.runInContext('plugin.handle("execute",{})',context));
});
