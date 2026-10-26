import { verifyPassword } from '../../worker/auth.mjs';
// Separate Par credential store. Never connects to crm-sync or CRM accounts.
const attempts = new Map();
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = origin === env.FRONTEND_ORIGIN;
    const headers = {'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin',...(allowed?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}:{})};
    const reply = (body,status=200)=>new Response(JSON.stringify(body),{status,headers});
    if(!allowed) return reply({error:'Origin not allowed'},403);
    if(request.method==='OPTIONS') return new Response(null,{status:204,headers});
    if(new URL(request.url).pathname!=='/auth/unlock') return reply({error:'Not found'},404);
    if(request.method!=='POST') return reply({error:'Method not allowed'},405);
    if(!env.DEMO_USERNAME||!env.DEMO_PASSWORD_HASH||!/^[A-Za-z0-9+/]{43}=$/.test(env.PAGE_KEY||'')) return reply({error:'Login is not configured'},503);
    // Per-isolate throttle, backed by a platform rate-limit binding in production.
    if(!env.LOGIN_LIMITER) return reply({error:'Login rate limiter is not configured'},503);
    const ip=request.headers.get('CF-Connecting-IP')||'unknown';
    const limit=await env.LOGIN_LIMITER.limit({key:ip});
    if(!limit.success) return reply({error:'Too many attempts. Please try again later.'},429);
    const now=Date.now();let a=attempts.get(ip);
    if(!a||a.until<now){a={count:0,until:now+900000};attempts.set(ip,a);}
    if(attempts.size>1000) attempts.delete(attempts.keys().next().value);
    if(a.count++>=8) return reply({error:'Too many attempts. Please try again later.'},429);
    if(Number(request.headers.get('Content-Length')||0)>2048) return reply({error:'Request too large'},413);
    let data;
    try {const raw=await request.text();if(raw.length>2048)return reply({error:'Request too large'},413);data=JSON.parse(raw);} catch {return reply({error:'Invalid request'},400);}
    if(typeof data.username!=='string'||typeof data.password!=='string'||data.username.length>100||data.password.length>256)return reply({error:'Invalid credentials'},401);
    const valid=await verifyPassword(data.password,env.DEMO_PASSWORD_HASH);
    if(!valid||data.username!==env.DEMO_USERNAME)return reply({error:'Invalid credentials'},401);
    attempts.delete(ip);
    return reply({key:env.PAGE_KEY});
  }
};
