import {test} from 'node:test';
import assert from 'node:assert/strict';
import {API_VERSION,definePlugin} from '../index.mjs';
test('standalone handler can await injected resources without a MacTV process',async()=>{
  const resources={async list(){return {items:[]};}};
  const plugin=definePlugin(async()=>await resources.list());
  assert.deepEqual(await plugin.handle('browse'),{items:[]});
  assert.equal(API_VERSION,2);assert.ok(Object.isFrozen(plugin));
});
test('async rejection remains visible to the caller',async()=>{
  const plugin=definePlugin(async()=>{throw Error('owned rejection');});
  await assert.rejects(plugin.handle('browse'),/owned rejection/);
});
test('invalid definitions are rejected before invoking any feature code',()=>{
  assert.throws(()=>definePlugin({}),TypeError);
});
