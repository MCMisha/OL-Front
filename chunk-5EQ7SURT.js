import{a as X,d as k,e as te,f as oe}from"./chunk-RD6TRCGF.js";import{a as ne,b as ae,c as ce}from"./chunk-OGHM7IPU.js";import"./chunk-4ADKU5V2.js";import{$ as w,h as K,ha as $,j as J,ka as ee,l as E,ma as re,oa as ie}from"./chunk-ACNRYAZN.js";import{$ as p,Cb as L,Eb as B,Ec as Z,Fc as q,Ga as j,Hc as x,Ib as H,Jb as V,Kb as G,Lb as Q,Mb as _,Qb as I,Rb as T,Sb as A,Ua as a,Ub as U,Va as s,Zb as Y,ba as R,e as W,gb as D,ia as f,ja as h,ka as u,kb as v,lb as l,mb as d,nb as y,ob as z,oc as M,pb as F,ta as C,ua as N,vb as o,wb as n,xb as g,yb as b,za as O}from"./chunk-XYOY6XUI.js";var pe=["determinateSpinner"];function ue(i,le){if(i&1&&(C(),o(0,"svg",11),g(1,"circle",12),n()),i&2){let r=B();l("viewBox",r._viewBox()),a(),y("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeCircumference()/2,"px")("stroke-width",r._circleStrokeWidth(),"%"),l("r",r._circleRadius())}}var ge=new R("mat-progress-spinner-default-options",{providedIn:"root",factory:_e});function _e(){return{diameter:se}}var se=100,fe=10,S=(()=>{class i{get color(){return this._color||this._defaultColor}set color(r){this._color=r}constructor(r,t,e){this._elementRef=r,this._defaultColor="primary",this._value=0,this._diameter=se,this._noopAnimations=t==="NoopAnimations"&&!!e&&!e._forceAnimations,this.mode=r.nativeElement.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth))}get value(){return this.mode==="determinate"?this._value:0}set value(r){this._value=Math.max(0,Math.min(100,r||0))}get diameter(){return this._diameter}set diameter(r){this._diameter=r||0}get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(r){this._strokeWidth=r||0}_circleRadius(){return(this.diameter-fe)/2}_viewBox(){let r=this._circleRadius()*2+this.strokeWidth;return`0 0 ${r} ${r}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static{this.\u0275fac=function(t){return new(t||i)(s(O),s(j,8),s(ge))}}static{this.\u0275cmp=h({type:i,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(t,e){if(t&1&&H(pe,5),t&2){let c;V(c=G())&&(e._determinateCircle=c.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(t,e){t&2&&(l("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",e.mode==="determinate"?e.value:null)("mode",e.mode),F("mat-"+e.color),y("width",e.diameter,"px")("height",e.diameter,"px")("--mdc-circular-progress-size",e.diameter+"px")("--mdc-circular-progress-active-indicator-width",e.diameter+"px"),z("_mat-animation-noopable",e._noopAnimations)("mdc-circular-progress--indeterminate",e.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[f.HasDecoratorInputTransform,"value","value",M],diameter:[f.HasDecoratorInputTransform,"diameter","diameter",M],strokeWidth:[f.HasDecoratorInputTransform,"strokeWidth","strokeWidth",M]},exportAs:["matProgressSpinner"],standalone:!0,features:[D,U],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(t,e){if(t&1&&(v(0,ue,2,8,"ng-template",null,0,Y),o(2,"div",2,1),C(),o(4,"svg",3),g(5,"circle",4),n()(),N(),o(6,"div",5)(7,"div",6)(8,"div",7),b(9,8),n(),o(10,"div",9),b(11,8),n(),o(12,"div",10),b(13,8),n()()()),t&2){let c=Q(1);a(4),l("viewBox",e._viewBox()),a(),y("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeDashOffset(),"px")("stroke-width",e._circleStrokeWidth(),"%"),l("r",e._circleRadius()),a(4),d("ngTemplateOutlet",c),a(2),d("ngTemplateOutlet",c),a(2),d("ngTemplateOutlet",c)}},dependencies:[q],styles:["@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-1 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-2 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-3 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-4 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner .mdc-circular-progress{width:var(--mdc-circular-progress-size) !important;height:var(--mdc-circular-progress-size) !important}.mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}"],encapsulation:2,changeDetection:0})}}return i})();function ve(i,le){i&1&&g(0,"mat-spinner",9)}var me=(()=>{class i{constructor(r,t,e){this.userService=r,this.route=t,this.router=e,this.login="",this.password="",this.subscription=new W,this.isLoading=!1}ngOnInit(){}ngOnDestroy(){this.subscription.unsubscribe()}onLogin(){this.isLoading=!0,this.subscription.add(this.userService.login(this.login,this.password).subscribe(r=>{localStorage.setItem("token",r),this.router.navigate(["panel"],{relativeTo:this.route})},r=>{console.error("Error during login:",r),this.isLoading=!1}))}static{this.\u0275fac=function(t){return new(t||i)(s(ne),s(K),s(J))}}static{this.\u0275cmp=h({type:i,selectors:[["app-admin"]],decls:20,vars:4,consts:[[1,"d-flex","justify-content-center"],[1,"bg-secondary","mt-2"],[1,"text-white","px-lg-5","pt-1"],["matInput","","placeholder","Login",3,"ngModelChange","ngModel"],["matInput","","type","password","placeholder","Has\u0142o",3,"ngModelChange","ngModel"],[1,"d-flex","justify-content-center","align-items-center","pb-2"],[2,"position","relative"],["mat-flat-button","","color","primary",3,"click","disabled"],["diameter","20","style","position: absolute; right: -25px; top: 50%; transform: translateY(-50%);",4,"ngIf"],["diameter","20",2,"position","absolute","right","-25px","top","50%","transform","translateY(-50%)"]],template:function(t,e){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),_(4,"Zaloguj si\u0119 jako administrator"),n(),o(5,"div",0)(6,"mat-form-field")(7,"mat-label"),_(8,"Login"),n(),o(9,"input",3),A("ngModelChange",function(m){return T(e.login,m)||(e.login=m),m}),n()()(),o(10,"div",0)(11,"mat-form-field")(12,"mat-label"),_(13,"Has\u0142o"),n(),o(14,"input",4),A("ngModelChange",function(m){return T(e.password,m)||(e.password=m),m}),n()()()(),o(15,"div",5)(16,"div",6)(17,"button",7),L("click",function(){return e.onLogin()}),_(18,"Zaloguj si\u0119"),n(),v(19,ve,1,0,"mat-spinner",8),n()()()()),t&2&&(a(9),I("ngModel",e.login),a(5),I("ngModel",e.password),a(3),d("disabled",e.isLoading),a(2),d("ngIf",e.isLoading))},dependencies:[Z,k,te,X,$,ee,re,w,S]})}}return i})();var ye=[{path:"",component:me},{path:"panel",component:ae,loadChildren:()=>import("./chunk-GTUNJYBF.js").then(i=>i.AdminPanelModule),canActivate:[ce]}],de=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=p({imports:[E.forChild(ye),E]})}}return i})();var $e=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=p({imports:[x,de,k,oe,ie,w,S]})}}return i})();export{$e as AdminModule};
