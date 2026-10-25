import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const entries={};for(const name of readdirSync('ui')){if(!/\.(html|js|css)$/.test(name))continue;entries['/'+name]={body:readFileSync(join('ui',name),'utf8'),type:name.endsWith('.js')?'text/javascript; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8'};}entries['/']=entries['/index.html'];writeFileSync('worker/ui-assets.ts','// Generated from ui/ by scripts/embed-ui.mjs.\nexport const assets = '+JSON.stringify(entries)+';\n');
