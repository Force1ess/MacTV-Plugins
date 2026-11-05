import {mkdir, copyFile, readFile, writeFile} from 'node:fs/promises';
import {steamAction} from '../build/core.mjs';
const manifest=JSON.parse(await readFile('manifest.json','utf8'));
manifest.applicationLaunch=steamAction;
await writeFile('manifest.json',JSON.stringify(manifest,null,2)+'\n');
await mkdir('dist',{recursive:true});
for (const name of ['manifest.json','plugin.js','README.md','LICENSE']) await copyFile(name,'dist/'+name);
