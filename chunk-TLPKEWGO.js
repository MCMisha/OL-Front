import{a as ge}from"./chunk-THNG6MXY.js";import{a as le,b as ue}from"./chunk-PGWPWB4T.js";import{a as N}from"./chunk-BKP4CZB2.js";import{d as fe}from"./chunk-3CLLR4KS.js";import"./chunk-MLX7UPXM.js";import{Aa as me,Da as de,Ia as pe,S as I,qa as ce,va as A,xa as se}from"./chunk-QQY4IUSC.js";import"./chunk-6XXA7HXI.js";import{a as ne,i as ae,k as S,m as F}from"./chunk-C5XILQZG.js";import{$b as re,Ab as f,Ba as V,Db as M,E as B,Hb as $,Ia as G,Jb as q,Mc as te,Nc as oe,Pb as K,Pc as W,Qb as J,Rb as X,Sb as ee,Tb as h,Xa as a,Xb as j,Ya as s,Yb as P,Zb as R,aa as v,ba as l,da as L,e as O,ec as ie,fa as u,ga as H,jb as Q,ka as y,la as b,ma as g,nb as k,ob as p,p as z,pb as d,qb as w,rb as Y,sb as Z,t as D,va as E,wa as U,wc as C,yb as o,zb as n}from"./chunk-UUB5ROYG.js";var T=(()=>{class i{constructor(e){this.http=e}login(e,t){let r=encodeURIComponent(e),c=encodeURIComponent(t);return this.http.post(`${N.baseApiUri}/Admin/login?login=${r}&password=${c}`,null,{withCredentials:!0})}checkToken(){return this.http.get(`${N.baseApiUri}/Admin/verify`,{withCredentials:!0})}static{this.\u0275fac=function(t){return new(t||i)(u(ne))}}static{this.\u0275prov=v({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var we=["determinateSpinner"];function Me(i,ke){if(i&1&&(E(),o(0,"svg",11),f(1,"circle",12),n()),i&2){let e=q();p("viewBox",e._viewBox()),a(),w("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),p("r",e._circleRadius())}}var Ce=new L("mat-progress-spinner-default-options",{providedIn:"root",factory:Se});function Se(){return{diameter:_e}}var _e=100,Ie=10,x=(()=>{class i{get color(){return this._color||this._defaultColor}set color(e){this._color=e}constructor(e,t,r){this._elementRef=e,this._defaultColor="primary",this._value=0,this._diameter=_e,this._noopAnimations=t==="NoopAnimations"&&!!r&&!r._forceAnimations,this.mode=e.nativeElement.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",r&&(r.color&&(this.color=this._defaultColor=r.color),r.diameter&&(this.diameter=r.diameter),r.strokeWidth&&(this.strokeWidth=r.strokeWidth))}get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0))}get diameter(){return this._diameter}set diameter(e){this._diameter=e||0}get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0}_circleRadius(){return(this.diameter-Ie)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static{this.\u0275fac=function(t){return new(t||i)(s(V),s(G,8),s(Ce))}}static{this.\u0275cmp=b({type:i,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(t,r){if(t&1&&K(we,5),t&2){let c;J(c=X())&&(r._determinateCircle=c.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(t,r){t&2&&(p("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),Z("mat-"+r.color),w("width",r.diameter,"px")("height",r.diameter,"px")("--mdc-circular-progress-size",r.diameter+"px")("--mdc-circular-progress-active-indicator-width",r.diameter+"px"),Y("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[y.HasDecoratorInputTransform,"value","value",C],diameter:[y.HasDecoratorInputTransform,"diameter","diameter",C],strokeWidth:[y.HasDecoratorInputTransform,"strokeWidth","strokeWidth",C]},exportAs:["matProgressSpinner"],standalone:!0,features:[Q,re],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(t,r){if(t&1&&(k(0,Me,2,8,"ng-template",null,0,ie),o(2,"div",2,1),E(),o(4,"svg",3),f(5,"circle",4),n()(),U(),o(6,"div",5)(7,"div",6)(8,"div",7),M(9,8),n(),o(10,"div",9),M(11,8),n(),o(12,"div",10),M(13,8),n()()()),t&2){let c=ee(1);a(4),p("viewBox",r._viewBox()),a(),w("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),p("r",r._circleRadius()),a(4),d("ngTemplateOutlet",c),a(2),d("ngTemplateOutlet",c),a(2),d("ngTemplateOutlet",c)}},dependencies:[oe],styles:["@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-1 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-2 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-3 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-4 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner .mdc-circular-progress{width:var(--mdc-circular-progress-size) !important;height:var(--mdc-circular-progress-size) !important}.mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}"],encapsulation:2,changeDetection:0})}}return i})();function xe(i,ke){i&1&&f(0,"mat-spinner",9)}var ve=(()=>{class i{constructor(e,t,r){this.userService=e,this.route=t,this.router=r,this.login="",this.password="",this.subscription=new O,this.isLoading=!1,this._snackBar=H(ge)}ngOnInit(){}ngOnDestroy(){this.subscription.unsubscribe()}onLogin(){this.isLoading=!0,this.subscription.add(this.userService.login(this.login,this.password).subscribe(e=>{this.router.navigate(["/admin/panel"])},e=>{this._snackBar.open(`Bl\u0105d podczas logowania: ${e.error}`,"Zamknij",{duration:5e3}),this.isLoading=!1}))}static{this.\u0275fac=function(t){return new(t||i)(s(T),s(ae),s(S))}}static{this.\u0275cmp=b({type:i,selectors:[["app-admin"]],decls:20,vars:4,consts:[[1,"d-flex","justify-content-center"],[1,"bg-secondary","mt-2","rounded"],[1,"text-white","px-lg-5","pt-1"],["matInput","","placeholder","Login",3,"ngModelChange","ngModel"],["matInput","","type","password","placeholder","Has\u0142o",3,"ngModelChange","ngModel"],[1,"d-flex","justify-content-center","align-items-center","pb-2"],[2,"position","relative"],["mat-flat-button","","color","primary",3,"click","disabled"],["diameter","20","style","position: absolute; right: -25px; top: 50%; transform: translateY(-50%);",4,"ngIf"],["diameter","20",2,"position","absolute","right","-25px","top","50%","transform","translateY(-50%)"]],template:function(t,r){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),h(4,"Zaloguj si\u0119 jako administrator"),n(),o(5,"div",0)(6,"mat-form-field")(7,"mat-label"),h(8,"Login"),n(),o(9,"input",3),R("ngModelChange",function(m){return P(r.login,m)||(r.login=m),m}),n()()(),o(10,"div",0)(11,"mat-form-field")(12,"mat-label"),h(13,"Has\u0142o"),n(),o(14,"input",4),R("ngModelChange",function(m){return P(r.password,m)||(r.password=m),m}),n()()()(),o(15,"div",5)(16,"div",6)(17,"button",7),$("click",function(){return r.onLogin()}),h(18,"Zaloguj si\u0119"),n(),k(19,xe,1,0,"mat-spinner",8),n()()()()),t&2&&(a(9),j("ngModel",r.login),a(5),j("ngModel",r.password),a(3),d("disabled",r.isLoading),a(2),d("ngIf",r.isLoading))},dependencies:[te,A,le,ce,se,me,de,I,x]})}}return i})();var ye=(()=>{class i{constructor(e,t){this.userService=e,this.router=t}canActivate(){return this.userService.checkToken().pipe(D(e=>e.isValid?!0:(this.router.navigate([".."]),!1)),B(e=>(this.router.navigate([".."]),z(!1))))}static{this.\u0275fac=function(t){return new(t||i)(u(T),u(S))}}static{this.\u0275prov=v({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var Ee=[{path:"",component:ve},{path:"panel",component:fe,loadChildren:()=>import("./chunk-J7LUKLSH.js").then(i=>i.AdminPanelModule),canActivate:[ye]}],be=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=g({type:i})}static{this.\u0275inj=l({imports:[F.forChild(Ee),F]})}}return i})();var hr=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=g({type:i})}static{this.\u0275inj=l({imports:[W,be,A,ue,pe,I,x]})}}return i})();export{hr as AdminModule};
