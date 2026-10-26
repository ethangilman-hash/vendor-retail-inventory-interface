import assert from 'node:assert/strict';
import {webcrypto,pbkdf2Sync,randomBytes} from 'node:crypto';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import auth from './auth/worker.mjs';
import {buildPages} from './build-pages.mjs';
const key=randomBytes(32),salt=randomBytes(16);
const env={FRONTEND_ORIGIN:'https://ethangilman-hash.github.io',DEMO_USERNAME:'demo',DEMO_PASSWORD_HASH:`pbkdf2-sha256:100000:${salt.toString('hex')}:${pbkdf2Sync('password',salt,100000,32,'sha256').toString('hex')}`,PAGE_KEY:key.toString('base64'),LOGIN_LIMITER:{limit:async()=>({success:true})}};
const request=(body,origin=env.FRONTEND_ORIGIN)=>new Request('https://par.example/auth/unlock',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':randomBytes(8).toString('hex')},body:JSON.stringify(body)});
assert.equal((await auth.fetch(request({username:'demo',password:'wrong'}),env)).status,401);
assert.equal((await auth.fetch(request({username:'demo',password:'password'},'https://evil.example'),env)).status,403);
assert.equal((await auth.fetch(request({username:'demo',password:'password'}),{...env,LOGIN_LIMITER:null})).status,503);
assert.equal((await auth.fetch(request({username:'demo',password:'password'}),{...env,LOGIN_LIMITER:{limit:async()=>({success:false})}})).status,429);
const good=await auth.fetch(request({username:'demo',password:'password'}),env);assert.equal(good.status,200);assert.equal((await good.json()).key,env.PAGE_KEY);assert.equal(good.headers.get('Cache-Control'),'no-store');
const output=await mkdtemp(path.join(os.tmpdir(),'par-pages-'));
try{const {html,shell,payload}=await buildPages({endpoint:'https://par.example',keyBase64:env.PAGE_KEY,output});assert(!shell.includes(env.PAGE_KEY));assert(!shell.includes(env.DEMO_PASSWORD_HASH));assert(!shell.includes('Ounce specials tier'));assert(!html.includes('src="app.js"'));assert(!html.includes('action="/auth/logout"'));assert(html.includes("parent.postMessage('par:logout'"));const cryptoKey=await webcrypto.subtle.importKey('raw',key,'AES-GCM',false,['decrypt']);const decrypted=await webcrypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(payload.iv,'base64')},cryptoKey,Buffer.from(payload.data,'base64'));assert.equal(Buffer.from(decrypted).toString(),html);const bad=await webcrypto.subtle.importKey('raw',randomBytes(32),'AES-GCM',false,['decrypt']);await assert.rejects(webcrypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(payload.iv,'base64')},bad,Buffer.from(payload.data,'base64')));}finally{await rm(output,{recursive:true,force:true});}
console.log('PASS: separate credentials, CORS, fail-closed limiter, throttling, encrypted self-contained Pages build, key confidentiality and wrong-key rejection.');
