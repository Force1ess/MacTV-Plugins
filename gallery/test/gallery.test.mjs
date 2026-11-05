import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createGallery} from '../build/core.mjs';

test('uses arbitrary connection references without MacTV or provider identities', async () => {
  const requests=[];
  const gallery=createGallery({browse(input) {
    requests.push(input);
    return {items:[{id:'p',reference:'connection-opaque:photo',kind:'photo',title:'照片.jpg',url:'private',cookie:'private'}],next:'opaque-next'};
  }});
  const result=await gallery.handle('browse',{folder:'arbitrary-folder',page:'opaque-page'});
  assert.equal(requests[0].reference,'arbitrary-folder');
  assert.equal(result.next,'opaque-next');
  assert.deepEqual(result.items,[{id:'p',reference:'connection-opaque:photo',kind:'photo',title:'照片.jpg',subtitle:'',overview:''}]);
});
test('preserves empty search pages and cursor progression', async () => {
  const gallery=createGallery({browse: input => {assert.equal(input.query,'hello');return {items:[],next:'next'};}});
  assert.deepEqual(await gallery.handle('search',{query:'hello'}),{items:[],next:'next'});
});
test('rejects unsupported actions, oversized requests and non-photo resources', async () => {
  const gallery=createGallery({browse:()=>({items:[{id:'x',title:'Video',reference:'x',kind:'video'}]})});
  await assert.rejects(gallery.handle('execute'));
  await assert.rejects(gallery.handle('search',{query:'x'.repeat(201)}));
  await assert.rejects(gallery.handle('browse'));
});

test('MacTV adapter consumes the generic photo port and preserves its cursor', async () => {
  const {readFile}=await import('node:fs/promises');
  const vm=await import('node:vm');
  const context=vm.createContext({host:{library(service,input){assert.equal(service,'photos');assert.equal(input.reference,'opaque-folder');return {items:[],next:'next'};}}});
  vm.runInContext(await readFile(new URL('../plugin.js',import.meta.url),'utf8'),context);
  assert.deepEqual(JSON.parse(await vm.runInContext('plugin.handle("browse",{folder:"opaque-folder"}).then(JSON.stringify)',context)),{items:[],next:'next'});
});
