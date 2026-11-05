import {mkdir, copyFile} from 'node:fs/promises';
await mkdir('dist', {recursive:true});
for (const name of ['manifest.json','plugin.js','README.md','LICENSE']) await copyFile(name, 'dist/'+name);
