import{A as w}from"./chunk-HWDLRLPX.js";import{a as G,g as J}from"./chunk-ZZO7MJK5.js";import{Aa as I,Ba as j,Bc as F,E as N,I as T,Jb as B,Kb as V,M,R as b,Ta as d,Xa as m,Y as v,Zb as Y,aa as L,ba as O,da as E,e as y,fa as g,ga as x,ib as z,ka as D,la as P,ma as U,nb as k,p as u,q as R,qb as W,rb as $,t as f,uc as q,ya as H,z as A}from"./chunk-YKDFZCCH.js";var et=["*"],S;function nt(){if(S===void 0&&(S=null,typeof window<"u")){let r=window;r.trustedTypes!==void 0&&(S=r.trustedTypes.createPolicy("angular#components",{createHTML:c=>c}))}return S}function _(r){return nt()?.createHTML(r)||r}function K(r){return Error(`Unable to find icon with the name "${r}"`)}function it(){return Error("Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.")}function Q(r){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${r}".`)}function X(r){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${r}".`)}var a=class{constructor(c,t,e){this.url=c,this.svgText=t,this.options=e}},ot=(()=>{class r{constructor(t,e,n,i){this._httpClient=t,this._sanitizer=e,this._errorHandler=i,this._svgIconConfigs=new Map,this._iconSetConfigs=new Map,this._cachedIconsByUrl=new Map,this._inProgressUrlFetches=new Map,this._fontCssClassesByAlias=new Map,this._resolvers=[],this._defaultFontSetClass=["material-icons","mat-ligature-font"],this._document=n}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,i){return this._addSvgIconConfig(t,e,new a(n,null,i))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,i){let o=this._sanitizer.sanitize(d.HTML,n);if(!o)throw X(n);let s=_(o);return this._addSvgIconConfig(t,e,new a("",s,i))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new a(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let i=this._sanitizer.sanitize(d.HTML,e);if(!i)throw X(e);let o=_(i);return this._addSvgIconSetConfig(t,new a("",o,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(d.RESOURCE_URL,t);if(!e)throw Q(t);let n=this._cachedIconsByUrl.get(e);return n?u(C(n)):this._loadSvgIconFromConfig(new a(t,null)).pipe(v(i=>this._cachedIconsByUrl.set(e,i)),f(i=>C(i)))}getNamedSvgIcon(t,e=""){let n=Z(e,t),i=this._svgIconConfigs.get(n);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(e,t),i)return this._svgIconConfigs.set(n,i),this._getSvgFromConfig(i);let o=this._iconSetConfigs.get(e);return o?this._getSvgFromIconSetConfigs(t,o):R(K(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?u(C(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(f(e=>C(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return u(n);let i=e.filter(o=>!o.svgText).map(o=>this._loadSvgIconSetFromConfig(o).pipe(N(s=>{let h=`Loading icon set URL: ${this._sanitizer.sanitize(d.RESOURCE_URL,o.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(h)),u(null)})));return A(i).pipe(f(()=>{let o=this._extractIconWithNameFromAnySet(t,e);if(!o)throw K(t);return o}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.svgText&&i.svgText.toString().indexOf(t)>-1){let o=this._svgElementFromConfig(i),s=this._extractSvgIconFromSet(o,t,i.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(v(e=>t.svgText=e),f(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?u(null):this._fetchIcon(t).pipe(v(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let i=t.querySelector(`[id="${e}"]`);if(!i)return null;let o=i.cloneNode(!0);if(o.removeAttribute("id"),o.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(o,n);if(o.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(o),n);let s=this._svgElementFromString(_("<svg></svg>"));return s.appendChild(o),this._setSvgAttributes(s,n)}_svgElementFromString(t){let e=this._document.createElement("DIV");e.innerHTML=t;let n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){let e=this._svgElementFromString(_("<svg></svg>")),n=t.attributes;for(let i=0;i<n.length;i++){let{name:o,value:s}=n[i];o!=="id"&&e.setAttribute(o,s)}for(let i=0;i<t.childNodes.length;i++)t.childNodes[i].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[i].cloneNode(!0));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,i=n?.withCredentials??!1;if(!this._httpClient)throw it();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let o=this._sanitizer.sanitize(d.RESOURCE_URL,e);if(!o)throw Q(e);let s=this._inProgressUrlFetches.get(o);if(s)return s;let l=this._httpClient.get(o,{responseType:"text",withCredentials:i}).pipe(f(h=>_(h)),M(()=>this._inProgressUrlFetches.delete(o)),b());return this._inProgressUrlFetches.set(o,l),l}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(Z(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let i=this._resolvers[n](e,t);if(i)return rt(i)?new a(i.url,null,i.options):new a(i,null)}}static{this.\u0275fac=function(e){return new(e||r)(g(G,8),g(J),g(F,8),g(I))}}static{this.\u0275prov=L({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();function C(r){return r.cloneNode(!0)}function Z(r,c){return r+":"+c}function rt(r){return!!(r.url&&r.options)}var st=new E("MAT_ICON_DEFAULT_OPTIONS"),ct=new E("mat-icon-location",{providedIn:"root",factory:at});function at(){let r=x(F),c=r?r.location:null;return{getPathname:()=>c?c.pathname+c.search:""}}var tt=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],lt=tt.map(r=>`[${r}]`).join(", "),ht=/^url\(['"]?#(.*?)['"]?\)$/,Tt=(()=>{class r{get color(){return this._color||this._defaultColor}set color(t){this._color=t}get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses())}get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses())}constructor(t,e,n,i,o,s){this._elementRef=t,this._iconRegistry=e,this._location=i,this._errorHandler=o,this.inline=!1,this._previousFontSetClass=[],this._currentIconFetch=y.EMPTY,s&&(s.color&&(this.color=this._defaultColor=s.color),s.fontSet&&(this.fontSet=s.fontSet)),n||t.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let e=t.split(":");switch(e.length){case 1:return["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,i)=>{n.forEach(o=>{i.setAttribute(o.name,`url('${t}#${o.value}')`)})})}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(lt),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<e.length;i++)tt.forEach(o=>{let s=e[i],l=s.getAttribute(o),h=l?l.match(ht):null;if(h){let p=n.get(s);p||(p=[],n.set(s,p)),p.push({name:o,value:h[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(T(1)).subscribe(i=>this._setSvgElement(i),i=>{let o=`Error retrieving icon ${e}:${n}! ${i.message}`;this._errorHandler.handleError(new Error(o))})}}static{this.\u0275fac=function(e){return new(e||r)(m(j),m(ot),H("aria-hidden"),m(ct),m(I),m(st,8))}}static{this.\u0275cmp=P({type:r,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){e&2&&(k("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),$(n.color?"mat-"+n.color:""),W("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"))},inputs:{color:"color",inline:[D.HasDecoratorInputTransform,"inline","inline",q],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],standalone:!0,features:[z,Y],ngContentSelectors:et,decls:1,vars:0,template:function(e,n){e&1&&(B(),V(0))},styles:["mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"],encapsulation:2,changeDetection:0})}}return r})(),Mt=(()=>{class r{static{this.\u0275fac=function(e){return new(e||r)}}static{this.\u0275mod=U({type:r})}static{this.\u0275inj=O({imports:[w,w]})}}return r})();export{Tt as a,Mt as b};
