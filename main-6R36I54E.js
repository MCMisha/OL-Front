import{a as dt}from"./chunk-B3W6POJ3.js";import{a as vt}from"./chunk-GT7TUT4C.js";import"./chunk-SKCIPK7T.js";import"./chunk-6BIFB6R6.js";import{a as bt}from"./chunk-CV6H66SV.js";import"./chunk-QG3KZPTG.js";import"./chunk-ZE4P6AXO.js";import"./chunk-H2PMODMH.js";import"./chunk-BKP4CZB2.js";import{a as ht,b as pt,c as gt,d as ft,e as _t}from"./chunk-3VBQIYVP.js";import{I as ot,J as rt,R as st,T as at,ba as lt,c as qe,e as Je,ea as mt,ia as ct,la as H,oa as ut,p as et,s as tt,t as it,v as pe,y as nt,z as ge}from"./chunk-PJK7FPEW.js";import{c as fe,d as ee,f as y,g as _e,h as te}from"./chunk-Q64FFBLU.js";import{b as Ye,c as Ue,d as Ke,e as Qe,f as Xe,h as We,j as Ge,k as Ze,l as $e,m as he}from"./chunk-ZZO7MJK5.js";import{B as U,Ba as W,Bc as J,C as P,Ca as G,Da as xe,Db as Ne,Gb as Z,I as K,Ia as Pe,Ib as h,Jb as ue,K as ae,Kb as $,Lc as ze,Mb as q,Nb as je,Ob as L,Oc as Ve,Pb as N,Qb as Be,Rb as c,U as Q,V as le,W as X,Wa as b,Xa as m,Ya as Ee,Yb as He,Z as Ie,Za as me,Zb as de,_a as Se,a as V,aa as Ce,ab as Ae,b as ye,ba as _,cb as Te,da as E,db as F,e as f,fb as De,ga as S,ib as ce,j as Y,ka as u,la as A,m as re,ma as v,mb as M,na as we,nb as O,oa as ke,ob as p,p as se,qb as Fe,qc as j,rb as Oe,ta as T,tb as Le,ua as D,uc as B,va as Re,xb as a,yb as l,zb as g}from"./chunk-YKDFZCCH.js";var St=[{path:"",loadChildren:()=>import("./chunk-66UD7YFC.js").then(n=>n.MainModule)},{path:"admin",loadChildren:()=>import("./chunk-FPMTSF3J.js").then(n=>n.AdminModule)},{path:"performances",loadChildren:()=>import("./chunk-XCJX42AA.js").then(n=>n.PerformancesModule)},{path:"news",loadChildren:()=>import("./chunk-4SEJO46H.js").then(n=>n.NewsModule)},{path:"about",loadChildren:()=>import("./chunk-QXYUMEH7.js").then(n=>n.AboutModule)},{path:"contact",loadChildren:()=>import("./chunk-QWICDQH7.js").then(n=>n.ContactModule)},{path:"**",redirectTo:""}],Mt=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=v({type:n})}static{this.\u0275inj=_({imports:[he.forRoot(St),he]})}}return n})();var Lt=["mat-menu-item",""],Nt=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],jt=["mat-icon, [matMenuItemIcon]","*"];function Bt(n,r){n&1&&(Re(),a(0,"svg",2),g(1,"polygon",3),l())}var Ht=["*"];function zt(n,r){if(n&1){let e=Ne();a(0,"div",0),Z("keydown",function(i){T(e);let o=h();return D(o._handleKeydown(i))})("click",function(){T(e);let i=h();return D(i.closed.emit("click"))})("@transformMenu.start",function(i){T(e);let o=h();return D(o._onAnimationStart(i))})("@transformMenu.done",function(i){T(e);let o=h();return D(o._onAnimationDone(i))}),a(1,"div",1),$(2),l()()}if(n&2){let e=h();Oe(e._classList),p("id",e.panelId)("@transformMenu",e._panelAnimationState),O("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var ve=new E("MAT_MENU_PANEL"),z=(()=>{class n{constructor(e,t,i,o,s){this._elementRef=e,this._document=t,this._focusMonitor=i,this._parentMenu=o,this._changeDetectorRef=s,this.role="menuitem",this.disabled=!1,this.disableRipple=!1,this._hovered=new Y,this._focused=new Y,this._highlighted=!1,this._triggersSubmenu=!1,o?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef?.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef?.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static{this.\u0275fac=function(t){return new(t||n)(m(W),m(J),m(pe),m(ve,8),m(j))}}static{this.\u0275cmp=A({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-mdc-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&Z("click",function(s){return i._checkDisabled(s)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(O("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),Fe("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu))},inputs:{role:"role",disabled:[u.HasDecoratorInputTransform,"disabled","disabled",B],disableRipple:[u.HasDecoratorInputTransform,"disableRipple","disableRipple",B]},exportAs:["matMenuItem"],standalone:!0,features:[ce,de],attrs:Lt,ngContentSelectors:jt,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(ue(Nt),$(0),a(1,"span",0),$(2,1),l(),g(3,"div",1),M(4,Bt,2,0,":svg:svg",2)),t&2&&(b(3),p("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),b(),Le(4,i._triggersSubmenu?4:-1))},dependencies:[ot],encapsulation:2,changeDetection:0})}}return n})();var Vt=new E("MatMenuContent");var ne={transformMenu:fe("transformMenu",[_e("void",y({opacity:0,transform:"scale(0.8)"})),te("void => enter",ee("120ms cubic-bezier(0, 0, 0.2, 1)",y({opacity:1,transform:"scale(1)"}))),te("* => void",ee("100ms 25ms linear",y({opacity:0})))]),fadeInItems:fe("fadeInItems",[_e("showing",y({opacity:1})),te("void => *",[y({opacity:0}),ee("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])},Di=ne.fadeInItems,Fi=ne.transformMenu,Yt=0,Ut=new E("mat-menu-default-options",{providedIn:"root",factory:Kt});function Kt(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}var I=(()=>{class n{get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}set panelClass(e){let t=this._previousPanelClass,i=V({},this._classList);t&&t.length&&t.split(" ").forEach(o=>{i[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{i[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=i}get classList(){return this.panelClass}set classList(e){this.panelClass=e}constructor(e,t,i,o){this._elementRef=e,this._ngZone=t,this._changeDetectorRef=o,this._elevationPrefix="mat-elevation-z",this._baseElevation=8,this._directDescendantItems=new xe,this._classList={},this._panelAnimationState="void",this._animationDone=new Y,this.closed=new G,this.close=this.closed,this.panelId=`mat-menu-panel-${Yt++}`,this.overlayPanelClass=i.overlayPanelClass||"",this._xPosition=i.xPosition,this._yPosition=i.yPosition,this.backdropClass=i.backdropClass,this.overlapTrigger=i.overlapTrigger,this.hasBackdrop=i.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new et(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Q(this._directDescendantItems),le(e=>U(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),o=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[o]&&!i[o].disabled?t.setActiveItem(o):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusSubscription?.unsubscribe()}_hovered(){return this._directDescendantItems.changes.pipe(Q(this._directDescendantItems),le(t=>U(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:Je(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}e.stopPropagation()}focusFirstItem(e="program"){this._firstItemFocusSubscription?.unsubscribe(),this._firstItemFocusSubscription=this._ngZone.onStable.pipe(K(1)).subscribe(()=>{let t=null;if(this._directDescendantItems.length&&(t=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus()}})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){let t=Math.min(this._baseElevation+e,24),i=`${this._elevationPrefix}${t}`,o=Object.keys(this._classList).find(s=>s.startsWith(this._elevationPrefix));if(!o||o===this._previousElevation){let s=V({},this._classList);this._previousElevation&&(s[this._previousElevation]=!1),s[i]=!0,this._previousElevation=i,this._classList=s}}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=ye(V({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef?.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,e.toState==="enter"&&this._keyManager.activeItemIndex===0&&(e.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe(Q(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}static{this.\u0275fac=function(t){return new(t||n)(m(W),m(F),m(Ut),m(j))}}static{this.\u0275cmp=A({type:n,selectors:[["mat-menu"]],contentQueries:function(t,i,o){if(t&1&&(q(o,Vt,5),q(o,z,5),q(o,z,4)),t&2){let s;L(s=N())&&(i.lazyContent=s.first),L(s=N())&&(i._allItems=s),L(s=N())&&(i.items=s)}},viewQuery:function(t,i){if(t&1&&je(me,5),t&2){let o;L(o=N())&&(i.templateRef=o.first)}},hostVars:3,hostBindings:function(t,i){t&2&&O("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[u.None,"aria-label","ariaLabel"],ariaLabelledby:[u.None,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[u.None,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[u.HasDecoratorInputTransform,"overlapTrigger","overlapTrigger",B],hasBackdrop:[u.HasDecoratorInputTransform,"hasBackdrop","hasBackdrop",e=>e==null?null:B(e)],panelClass:[u.None,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],standalone:!0,features:[He([{provide:ve,useExisting:n}]),ce,de],ngContentSelectors:Ht,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel","mat-mdc-elevation-specific",3,"keydown","click","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(ue(),M(0,zt,3,7,"ng-template"))},styles:['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font);line-height:var(--mat-menu-item-label-text-line-height);font-size:var(--mat-menu-item-label-text-size);letter-spacing:var(--mat-menu-item-label-text-tracking);font-weight:var(--mat-menu-item-label-text-weight)}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;outline:0;border-radius:var(--mat-menu-container-shape);background-color:var(--mat-menu-container-color);will-change:transform,opacity}.mat-mdc-menu-panel.ng-animating{pointer-events:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-divider{color:var(--mat-menu-divider-color);margin-bottom:var(--mat-menu-divider-bottom-spacing);margin-top:var(--mat-menu-divider-top-spacing)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mat-menu-item-leading-spacing);padding-right:var(--mat-menu-item-trailing-spacing);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;align-items:center;min-height:48px}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:var(--mat-menu-item-trailing-spacing);padding-right:var(--mat-menu-item-leading-spacing)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing);padding-right:var(--mat-menu-item-with-icon-trailing-spacing)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]),.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon])[dir=rtl]{padding-left:var(--mat-menu-item-with-icon-trailing-spacing);padding-right:var(--mat-menu-item-with-icon-leading-spacing)}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color)}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color)}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing);height:var(--mat-menu-item-icon-size);width:var(--mat-menu-item-icon-size)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color)}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color)}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1)}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[ne.transformMenu,ne.fadeInItems]},changeDetection:0})}}return n})(),wt=new E("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let n=S(H);return()=>n.scrollStrategies.reposition()}});function Qt(n){return()=>n.scrollStrategies.reposition()}var Xt={provide:wt,deps:[H],useFactory:Qt},yt=qe({passive:!0});var kt=(()=>{class n{get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){e!==this._menu&&(this._menu=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu()))}constructor(e,t,i,o,s,d,C,w,k){this._overlay=e,this._element=t,this._viewContainerRef=i,this._menuItemInstance=d,this._dir=C,this._focusMonitor=w,this._ngZone=k,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=f.EMPTY,this._hoverSubscription=f.EMPTY,this._menuCloseSubscription=f.EMPTY,this._changeDetectorRef=S(j),this._handleTouchStart=R=>{it(R)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new G,this.onMenuOpen=this.menuOpened,this.menuClosed=new G,this.onMenuClose=this.menuClosed,this._scrollStrategy=o,this._parentMaterialMenu=s instanceof I?s:void 0,t.nativeElement.addEventListener("touchstart",this._handleTouchStart,yt)}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,yt),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this.menu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){let e=this.menu;if(this._menuOpen||!e)return;let t=this._createOverlay(e),i=t.getConfig(),o=i.positionStrategy;this._setPosition(e,o),i.hasBackdrop=e.hasBackdrop==null?!this.triggersSubmenu():e.hasBackdrop,t.attach(this._getPortal(e)),e.lazyContent&&e.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(e),e instanceof I&&(e._startAnimation(),e._directDescendantItems.changes.pipe(X(e.close)).subscribe(()=>{o.withLockedPosition(!1).reapplyLastPosition(),o.withLockedPosition(!0)}))}closeMenu(){this.menu?.close.emit()}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}updatePosition(){this._overlayRef?.updatePosition()}_destroyMenu(e){if(!this._overlayRef||!this.menuOpen)return;let t=this.menu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,t instanceof I?(t._resetAnimation(),t.lazyContent?t._animationDone.pipe(P(i=>i.toState==="void"),K(1),X(t.lazyContent._attached)).subscribe({next:()=>t.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),t?.lazyContent?.detach())}_initMenu(e){e.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,e.direction=this.dir,this._setMenuElevation(e),e.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(e){if(e.setElevation){let t=0,i=e.parentMenu;for(;i;)t++,i=i.parentMenu;e.setElevation(t)}}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=this._overlay.create(t),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(e){return new ct({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{let o=i.connectionPair.overlayX==="start"?"after":"before",s=i.connectionPair.overlayY==="top"?"below":"above";this._ngZone?this._ngZone.run(()=>e.setPositionClasses(o,s)):e.setPositionClasses(o,s)})}_setPosition(e,t){let[i,o]=e.xPosition==="before"?["end","start"]:["start","end"],[s,d]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[C,w]=[s,d],[k,R]=[i,o],x=0;if(this.triggersSubmenu()){if(R=i=e.xPosition==="before"?"start":"end",o=k=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let Me=this._parentMaterialMenu.items.first;this._parentInnerPadding=Me?Me._getHostElement().offsetTop:0}x=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(C=s==="top"?"bottom":"top",w=d==="top"?"bottom":"top");t.withPositions([{originX:i,originY:C,overlayX:k,overlayY:s,offsetY:x},{originX:o,originY:C,overlayX:R,overlayY:s,offsetY:x},{originX:i,originY:w,overlayX:k,overlayY:d,offsetY:-x},{originX:o,originY:w,overlayX:R,overlayY:d,offsetY:-x}])}_menuClosingActions(){let e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:se(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(P(s=>s!==this._menuItemInstance),P(()=>this._menuOpen)):se();return U(e,i,o,t)}_handleMousedown(e){tt(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe(P(e=>e===this._menuItemInstance&&!e.disabled),ae(0,re)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof I&&this.menu._isAnimating?this.menu._animationDone.pipe(K(1),ae(0,re),X(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new mt(e.templateRef,this._viewContainerRef)),this._portal}static{this.\u0275fac=function(t){return new(t||n)(m(H),m(W),m(De),m(wt),m(ve,8),m(z,10),m(nt,8),m(pe),m(F))}}static{this.\u0275dir=we({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&Z("click",function(s){return i._handleClick(s)})("mousedown",function(s){return i._handleMousedown(s)})("keydown",function(s){return i._handleKeydown(s)}),t&2&&O("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[u.None,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[u.None,"matMenuTriggerFor","menu"],menuData:[u.None,"matMenuTriggerData","menuData"],restoreFocus:[u.None,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],standalone:!0})}}return n})(),Rt=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=v({type:n})}static{this.\u0275inj=_({providers:[Xt],imports:[Ve,rt,ge,ut,lt,ge]})}}return n})();function Gt(n,r){if(n&1&&(a(0,"nav",3)(1,"a",4),g(2,"img",5),l(),a(3,"div",6)(4,"button",7)(5,"mat-icon",8),c(6,"menu"),l()(),a(7,"mat-menu",null,0)(9,"a",9),c(10,"Strona g\u0142\xF3wna"),l(),a(11,"a",10),c(12,"Kalendarium"),l(),a(13,"a",11),c(14,"Spektakle"),l(),a(15,"a",12),c(16,"Aktualno\u015Bci"),l(),a(17,"a",13),c(18,"O nas"),l(),a(19,"a",14),c(20,"Kontakt"),l(),a(21,"a",15),c(22,"Kup bilet"),l()()(),a(23,"div",16)(24,"ul",17)(25,"li",18)(26,"a",19),c(27,"Kalendarium"),l()(),a(28,"li",18)(29,"a",20),c(30,"Spektakle"),l()(),a(31,"li",18)(32,"a",21),c(33,"Aktualno\u015Bci"),l()(),a(34,"li",18)(35,"a",22),c(36,"O nas"),l()(),a(37,"li",18)(38,"a",23),c(39,"Kontakt"),l()(),a(40,"li",24)(41,"a",25),c(42,"Kup bilet"),l()()()(),a(43,"div",26)(44,"a",27),g(45,"img",28),l()()()),n&2){let e=Be(8);b(4),p("matMenuTriggerFor",e)}}function Zt(n,r){if(n&1&&(a(0,"div"),M(1,Gt,46,1,"nav",2),g(2,"router-outlet"),l()),n&2){let e=h();b(),p("ngIf",e.showMenu)}}var xt=(()=>{class n{constructor(e){this.router=e,this.title="opera-front",this.showMenu=!0,this.isLoading=!0,this.subscription=new f}ngOnInit(){this.subscription=this.router.events.subscribe(e=>{e instanceof We&&(this.showMenu=!e.url.startsWith("/admin"),this.isLoading=!1)})}ngOnDestroy(){this.subscription.unsubscribe()}static{this.\u0275fac=function(t){return new(t||n)(m(Ze))}}static{this.\u0275cmp=A({type:n,selectors:[["app-root"]],decls:1,vars:1,consts:[["menu","matMenu"],[4,"ngIf"],["class","navbar navbar-expand navbar-light bg-white d-flex align-items-center",4,"ngIf"],[1,"navbar","navbar-expand","navbar-light","bg-white","d-flex","align-items-center"],["routerLink","/",1,"ps-3"],["src","assets/logo/logo.png","alt","Opera Lubelska",2,"width","150px","height","auto"],[1,"d-flex","justify-content-center","flex-grow-1","align-items-center","ms-auto"],["type","button","mat-button","",1,"burger-button",3,"matMenuTriggerFor"],["aria-label","Side nav toggle icon",1,"burger-button"],["mat-menu-item","","routerLink","/"],["mat-menu-item","","routerLink","/calendar"],["mat-menu-item","","routerLink","/performances"],["mat-menu-item","","routerLink","/news"],["mat-menu-item","","routerLink","/about"],["mat-menu-item","","routerLink","/contact"],["mat-menu-item","","href","#"],[1,"navbar-nav-container","d-flex","w-100","align-items-center","desktop-menu"],[1,"navbar-nav","align-middle","justify-content-center"],[1,"nav-item","align-middle","pt-3","pb-3","hover-link"],["routerLink","/calendar",1,"nav-link","text-uppercase","link-underline-opacity-25-hover"],["routerLink","/performances",1,"nav-link","text-uppercase"],["routerLink","/news",1,"nav-link","text-uppercase"],["routerLink","/about",1,"nav-link","text-uppercase"],["routerLink","/contact",1,"nav-link","text-uppercase"],[1,"nav-item","align-middle","pt-3","hover-link"],["href","#",1,"nav-link","text-uppercase"],[1,"pe-3","ms-auto"],["href","https://www.lubelskie.pl/",1,"nav-link"],["src","assets/logo/logo_urzad.png","alt","Urz\u0105d Marsza\u0142kowski Wojew\xF3dztwa Lubelskiego w Lublinie",2,"width","150px","height","auto"]],template:function(t,i){t&1&&M(0,Zt,3,1,"div",1),t&2&&p("ngIf",!i.isLoading)},dependencies:[ze,Ge,$e,pt,st,I,z,kt],styles:["@media screen and (max-width: 960px){.sidebarIconToggle[_ngcontent-%COMP%]{display:block}}li.nav-item.hover-link[_ngcontent-%COMP%]:hover{background-color:#dadadafc!important}.navbar-nav-container[_ngcontent-%COMP%]{display:flex;align-items:center}.navbar-nav[_ngcontent-%COMP%]{display:flex;flex-grow:1}.burger-button[_ngcontent-%COMP%]{display:none;border-radius:5px}@media only screen and (max-width: 980px){div.desktop-menu[_ngcontent-%COMP%]{display:none!important}.burger-button[_ngcontent-%COMP%]{display:block;margin:0 auto}.navbar[_ngcontent-%COMP%]{justify-content:space-between}.d-flex.justify-content-center[_ngcontent-%COMP%]{flex-grow:1}.ms-auto[_ngcontent-%COMP%]{margin-left:auto;margin-right:0}}"]})}}return n})();var $t="@",qt=(()=>{class n{constructor(e,t,i,o,s){this.doc=e,this.delegate=t,this.zone=i,this.animationType=o,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=S(Se,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-63MSYVNQ.js")).catch(t=>{throw new Ie(5300,!1)}).then(({\u0275createEngine:t,\u0275AnimationRendererFactory:i})=>{this._engine=t(this.animationType,this.doc,this.scheduler);let o=new i(this.delegate,this._engine,this.zone);return this.delegate=o,o})}createRenderer(e,t){let i=this.delegate.createRenderer(e,t);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let o=new be(i);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let d=s.createRenderer(e,t);o.use(d)}).catch(s=>{o.use(i)}),o}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(t){Ee()}}static{this.\u0275prov=Ce({token:n,factory:n.\u0275fac})}}return n})(),be=class{constructor(r){this.delegate=r,this.replay=[],this.\u0275type=1}use(r){if(this.delegate=r,this.replay!==null){for(let e of this.replay)e(r);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(r,e){return this.delegate.createElement(r,e)}createComment(r){return this.delegate.createComment(r)}createText(r){return this.delegate.createText(r)}get destroyNode(){return this.delegate.destroyNode}appendChild(r,e){this.delegate.appendChild(r,e)}insertBefore(r,e,t,i){this.delegate.insertBefore(r,e,t,i)}removeChild(r,e,t){this.delegate.removeChild(r,e,t)}selectRootElement(r,e){return this.delegate.selectRootElement(r,e)}parentNode(r){return this.delegate.parentNode(r)}nextSibling(r){return this.delegate.nextSibling(r)}setAttribute(r,e,t,i){this.delegate.setAttribute(r,e,t,i)}removeAttribute(r,e,t){this.delegate.removeAttribute(r,e,t)}addClass(r,e){this.delegate.addClass(r,e)}removeClass(r,e){this.delegate.removeClass(r,e)}setStyle(r,e,t,i){this.delegate.setStyle(r,e,t,i)}removeStyle(r,e,t){this.delegate.removeStyle(r,e,t)}setProperty(r,e,t){this.shouldReplay(e)&&this.replay.push(i=>i.setProperty(r,e,t)),this.delegate.setProperty(r,e,t)}setValue(r,e){this.delegate.setValue(r,e)}listen(r,e,t){return this.shouldReplay(e)&&this.replay.push(i=>i.listen(r,e,t)),this.delegate.listen(r,e,t)}shouldReplay(r){return this.replay!==null&&r.startsWith($t)}};function Pt(n="animations"){return Te("NgAsyncAnimations"),ke([{provide:Ae,useFactory:(r,e,t)=>new qt(r,e,t,n),deps:[J,Ke,F]},{provide:Pe,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var oe=class{intercept(r,e){let t=localStorage.getItem("token");if(t){let i=r.clone({headers:r.headers.set("Authorization","Bearer "+t)});return e.handle(i)}else return e.handle(r)}};var Et=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=v({type:n,bootstrap:[xt]})}static{this.\u0275inj=_({providers:[Pt(),{provide:Ye,useClass:oe,multi:!0}],imports:[Xe,Ue,Mt,gt,at,Rt,ft,ht,_t,bt,vt,dt]})}}return n})();Qe().bootstrapModule(Et).catch(n=>console.error(n));
