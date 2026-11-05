#!/usr/bin/env node
// Independent package builds/tests. Temporary directories contain owned test
// fixtures, never generated scripts or copies of the MacTV application source.
import {cp, mkdtemp, readFile, rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const root=join(dirname(fileURLToPath(import.meta.url)),'../..');
const mode=process.argv[2];
if (!['build','test'].includes(mode)) throw Error('Use build or test');
function run(args,cwd) {
  const result=spawnSync('npm',args,{cwd,stdio:'inherit'});
  if (result.error) throw result.error;
  if (result.status!==0) throw Error('Independent example command failed: npm '+args.join(' '));
}
const catalog=JSON.parse(await readFile(join(root,'catalog.json'),'utf8'));
assert.equal(catalog.schemaVersion,2);
for (const name of ['gallery','steam']) {
  const source=join(root,name);
  const manifest=JSON.parse(await readFile(join(source,'manifest.json'),'utf8'));
  const entry=catalog.plugins.find(item=>item.directory===name);
  assert.ok(entry && entry.id===manifest.id && entry.version===manifest.version && entry.apiVersion===manifest.apiVersion,'Git catalog must match the committed package');
  const temporary=mode==='test' ? await mkdtemp(join(tmpdir(),'mactv-example-')) : undefined;
  const work=temporary ? join(temporary,name) : source;
  try {
    if (temporary) await cp(source,work,{recursive:true,filter:path=>!['node_modules','build','dist'].includes(path.split('/').at(-1))});
    run(['ci','--ignore-scripts','--no-audit','--no-fund'],work);
    run(['run',mode==='test' ? 'test':'build'],work);
    if (temporary) for (const file of ['plugin.js','manifest.json']) {
      assert.deepEqual(await readFile(join(work,file)),await readFile(join(source,file)),name+' checked-in bundle differs from its independent build');
    }
    process.stdout.write(name+': '+(temporary ? 'isolated package test passed':'package built')+'\n');
  } finally { if (temporary) await rm(temporary,{recursive:true,force:true}); }
}

if (mode==='test') {
  const temporary=await mkdtemp(join(tmpdir(),'mactv-sdk-'));
  try {
    const work=join(temporary,'sdk');
    await cp(join(root,'sdk'),work,{recursive:true,filter:path=>!['node_modules','build','dist'].includes(path.split('/').at(-1))});
    run(['ci','--ignore-scripts','--no-audit','--no-fund'],work);
    run(['test'],work);
    process.stdout.write('sdk: isolated contracts and runtime tests passed\n');
  } finally { await rm(temporary,{recursive:true,force:true}); }
}
