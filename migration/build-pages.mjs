import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function buildPages({endpoint,keyBase64,output}){
 const url=new URL(endpoint);if(url.protocol!=='https:'&&url.hostname!=='127.0.0.1')throw Error('HTTPS login service required');
 const raw=Buffer.from(keyBase64,'base64');if(raw.length!==32)throw Error('32-byte PAGE_KEY required');
 let html=await readFile(path.join(root,'ui/index.html'),'utf8');
 html=await replaceAsync(html,/<link rel="stylesheet" href="([a-z-]+\.css)">/g,async(_,name)=>'<style>'+await readFile(path.join(root,'ui',name),'utf8')+'</style>');
 html=await replaceAsync(html,/<script src="([a-z-]+\.js)"><\/script>/g,async(_,name)=>'<script>'+(await readFile(path.join(root,'ui',name),'utf8')).replaceAll('</script','<\\/script')+'</script>');
 html=html.replace(/<form action="\/auth\/logout"[^>]*>.*?<\/form>/s,'<button id="pages-logout" type="button">Log out</button>');
 html=html.replace('</body>',`<script>document.getElementById('pages-logout').onclick=()=>parent.postMessage('par:logout',location.origin);</script></body>`);
 const key=await webcrypto.subtle.importKey('raw',raw,'AES-GCM',false,['encrypt']);const iv=webcrypto.getRandomValues(new Uint8Array(12));
 const encrypted=await webcrypto.subtle.encrypt({name:'AES-GCM',iv},key,Buffer.from(html));
 const payload={iv:Buffer.from(iv).toString('base64'),data:Buffer.from(encrypted).toString('base64')};
 const shell=(await readFile(path.join(root,'migration/pages/shell.html'),'utf8')).replace('__PAR_PAYLOAD__',JSON.stringify(payload)).replace('__PAR_ENDPOINT__',JSON.stringify(url.origin));
 await mkdir(output,{recursive:true});await writeFile(path.join(output,'index.html'),shell);await writeFile(path.join(output,'.nojekyll'),'');return {html,shell,payload};
}
async function replaceAsync(s,re,fn){const matches=[...s.matchAll(re)];for(const m of matches)s=s.replace(m[0],await fn(...m));return s;}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 let input='';for await(const part of process.stdin)input+=part;
 const options=JSON.parse(input);await buildPages(options);console.log('Encrypted GitHub Pages artifact built. No credentials or key embedded.');
}
