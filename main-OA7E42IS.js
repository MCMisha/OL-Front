import{b as E}from"./chunk-6SGG2FQY.js";import"./chunk-WKASOF74.js";import"./chunk-HK3YYDVU.js";import{d as x,f as O,h as j,k as B}from"./chunk-OD5JZLBF.js";import{b as N,c as F,ca as D,d as P,e as _,f as T,i as S,l as p}from"./chunk-HEVZDF4Y.js";import{$ as a,Ga as M,Wa as A,X as h,Ya as v,_ as u,_a as C,ab as R,bb as b,ea as f,ja as g,ka as l,ma as y,xb as w,xc as I}from"./chunk-YYWJVD6A.js";var U=[{path:"",loadChildren:()=>import("./chunk-CJAR3C52.js").then(o=>o.PerformancesModule)},{path:"admin",loadChildren:()=>import("./chunk-ZQSB32VI.js").then(o=>o.AdminModule)},{path:"**",redirectTo:""}],k=(()=>{class o{static{this.\u0275fac=function(r){return new(r||o)}}static{this.\u0275mod=l({type:o})}static{this.\u0275inj=a({imports:[p.forRoot(U),p]})}}return o})();var z=(()=>{class o{constructor(){this.title="opera-front"}static{this.\u0275fac=function(r){return new(r||o)}}static{this.\u0275cmp=g({type:o,selectors:[["app-root"]],decls:1,vars:0,template:function(r,i){r&1&&w(0,"router-outlet")},dependencies:[S]})}}return o})();var W="@",X=(()=>{class o{constructor(t,r,i,n,s){this.doc=t,this.delegate=r,this.zone=i,this.animationType=n,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=f(v,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-DYB45T76.js")).catch(r=>{throw new h(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:i})=>{this._engine=r(this.animationType,this.doc,this.scheduler);let n=new i(this.delegate,this._engine,this.zone);return this.delegate=n,n})}createRenderer(t,r){let i=this.delegate.createRenderer(t,r);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let n=new c(i);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let L=s.createRenderer(t,r);n.use(L)}).catch(s=>{n.use(i)}),n}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){A()}}static{this.\u0275prov=u({token:o,factory:o.\u0275fac})}}return o})(),c=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,i){this.delegate.insertBefore(e,t,r,i)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,i){this.delegate.setAttribute(e,t,r,i)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,i){this.delegate.setStyle(e,t,r,i)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(i=>i.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(i=>i.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(W)}};function V(o="animations"){return R("NgAsyncAnimations"),y([{provide:C,useFactory:(e,t,r)=>new X(e,t,r,o),deps:[I,P,b]},{provide:M,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var d=class{intercept(e,t){let r=localStorage.getItem("token");if(r){let i=e.clone({headers:e.headers.set("Authorization","Bearer "+r)});return t.handle(i)}else return t.handle(e)}};var H=(()=>{class o{static{this.\u0275fac=function(r){return new(r||o)}}static{this.\u0275mod=l({type:o,bootstrap:[z]})}static{this.\u0275inj=a({providers:[V(),{provide:N,useClass:d,multi:!0}],imports:[T,F,k,E,O,D,j,x,B]})}}return o})();_().bootstrapModule(H).catch(o=>console.error(o));
