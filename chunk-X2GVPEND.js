import{a as b}from"./chunk-YPJWRUYN.js";import{a as ve,b as Ge,c as be,d as Ce,e as xe,f as Se,g as ye,h as Me,i as Ae,j as Pe,k as Ee,l as Ie}from"./chunk-MGKQDZTZ.js";import{c as B,d as _e}from"./chunk-WFTMY6JX.js";import{a as H,b as we}from"./chunk-QDMGJSZF.js";import{T as G,V as fe,fa as F,ga as k,ja as R,la as T,ma as D,oa as j,pa as V,sa as z,ta as L,ua as O,va as $,wa as ge,xa as he,ya as x}from"./chunk-RYMWDD6Z.js";import{a as ce,i as I,k as N,l as ue,m as Z}from"./chunk-DD3TWRCF.js";import{$ as M,Bb as P,Eb as c,Gb as g,Hc as de,Jb as re,Jc as E,Lb as oe,Mb as ae,Mc as pe,Nb as me,Pb as l,Qb as Q,T as te,U,Ua as s,Va as p,Yb as se,Zb as le,_ as ie,da as ne,e as h,j as ee,ja as _,ka as A,kb as u,mb as m,ra as w,s as y,sa as v,vb as o,wb as a,xb as f,yb as W,zb as q}from"./chunk-BI472RZ2.js";var C=(()=>{class e{constructor(t){this.http=t}getGenres(){return this.http.get(`${x.baseApiUri}/AdminGenre/all`)}createGenre(t){return this.http.post(`${x.baseApiUri}/AdminGenre/create`,t)}updateGenre(t){return this.http.put(`${x.baseApiUri}/AdminGenre/update`,t)}deleteGenre(t){return this.http.delete(`${x.baseApiUri}/AdminGenre/delete/${t}`)}static{this.\u0275fac=function(n){return new(n||e)(ne(ce))}}static{this.\u0275prov=ie({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var Ve=()=>[2,5,10],ze=e=>({highlighted:e});function Le(e,d){e&1&&(o(0,"th",13),l(1,"Id"),a())}function Oe(e,d){if(e&1&&(o(0,"td",14),l(1),a()),e&2){let t=d.$implicit;s(),Q(t.id)}}function $e(e,d){e&1&&(o(0,"th",13),l(1,"Nazwa"),a())}function Be(e,d){if(e&1&&(o(0,"td",14),l(1),a()),e&2){let t=d.$implicit;s(),Q(t.name)}}function He(e,d){e&1&&f(0,"tr",15)}function Ue(e,d){if(e&1){let t=P();o(0,"tr",16),c("click",function(){let i=w(t).$implicit,r=g();return v(r.highlightRow(i))}),a()}if(e&2){let t=d.$implicit,n=g();m("ngClass",le(1,ze,n.selectedRowIndex==t.id))}}var Re=(()=>{class e{constructor(t){this.genreService=t,this.genres=[],this.displayedColumns=["id","name"],this.pageSize=5,this.pageIndex=0,this.paginatedGenres=[],this.dataSourceWithPageSize=new Ie(this.genres),this.subscription=new h,this.destroy$=new ee}ngOnInit(){this.genreService.getGenres().pipe(U(this.destroy$)).subscribe(t=>{this.genres=t,this.dataSourceWithPageSize.data=this.genres})}ngAfterViewInit(){this.paginator?this.dataSourceWithPageSize.paginator=this.paginator:console.error("Paginator is not initialized.")}ngOnDestroy(){this.subscription.unsubscribe()}highlightRow(t){this.selectedRowIndex==t.id?(this.selectedRowIndex=0,this.selectedRow=void 0):(this.selectedRowIndex=t.id,this.selectedRow=t)}deleteGenre(){this.selectedRow&&this.genreService.deleteGenre(this.selectedRow.id).pipe(U(this.destroy$)).subscribe(()=>{this.ngOnInit()})}static{this.\u0275fac=function(n){return new(n||e)(p(C))}}static{this.\u0275cmp=_({type:e,selectors:[["app-admin-panel-genre"]],viewQuery:function(n,i){if(n&1&&oe(B,5),n&2){let r;ae(r=me())&&(i.paginator=r.first)}},decls:20,vars:11,consts:[[1,"row","mb-1","d-flex","align-items-center"],[1,"col-auto"],["mat-flat-button","","color","primary","routerLink","new",1,"me-2"],["mat-flat-button","","color","accent",1,"me-2",3,"routerLink","disabled"],["mat-flat-button","","color","warn",3,"click","disabled"],["mat-table","",1,"mat-elevation-z8","pe-2",3,"dataSource"],["matColumnDef","id"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",3,"ngClass","click",4,"matRowDef","matRowDefColumns"],[3,"pageSize","pageIndex","pageSizeOptions"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row","",3,"click","ngClass"]],template:function(n,i){n&1&&(o(0,"div",0)(1,"div",1)(2,"button",2),l(3,"Dodaj"),a()(),o(4,"div",1)(5,"button",3),l(6,"Edytuj"),a()(),o(7,"div",1)(8,"button",4),c("click",function(){return i.deleteGenre()}),l(9,"Usu\u0144"),a()()(),o(10,"table",5),W(11,6),u(12,Le,2,0,"th",7)(13,Oe,2,1,"td",8),q(),W(14,9),u(15,$e,2,0,"th",7)(16,Be,2,1,"td",8),q(),u(17,He,1,0,"tr",10)(18,Ue,1,3,"tr",11),a(),f(19,"mat-paginator",12)),n&2&&(s(5),re("routerLink","",i.selectedRow==null?null:i.selectedRow.id,"/edit"),m("disabled",!i.selectedRow),s(3),m("disabled",!i.selectedRow),s(2),m("dataSource",i.dataSourceWithPageSize),s(7),m("matHeaderRowDef",i.displayedColumns),s(),m("matRowDefColumns",i.displayedColumns),s(),m("pageSize",i.pageSize)("pageIndex",i.pageIndex)("pageSizeOptions",se(10,Ve)))},dependencies:[de,ve,be,ye,Ce,Ge,Me,xe,Se,Ae,Pe,ue,B,G],styles:[".highlighted[_ngcontent-%COMP%]{background-color:#00f}mat-sidenav-content[_ngcontent-%COMP%]{max-width:100%;overflow-x:hidden}table[_ngcontent-%COMP%]{width:100%;max-width:100%}mat-paginator[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]{max-width:100%;overflow-x:hidden}.row[_ngcontent-%COMP%]{width:100%;max-width:100%}"]})}}return e})();function Je(e,d){e&1&&f(0,"mat-progress-bar",2)}function Ke(e,d){e&1&&(o(0,"mat-error"),l(1," Nazwa gatunku jest wymagana "),a())}function Xe(e,d){e&1&&(o(0,"mat-error"),l(1," Gatunek ju\u017C istnieje "),a())}function Ye(e,d){if(e&1){let t=P();o(0,"div")(1,"form",3),c("ngSubmit",function(){w(t);let i=g();return v(i.saveGenre())}),o(2,"mat-form-field",4)(3,"mat-label"),l(4,"Nazwa gatunku"),a(),f(5,"input",5),u(6,Ke,2,0,"mat-error",1)(7,Xe,2,0,"mat-error",1),a()(),o(8,"div",6)(9,"div",7)(10,"button",8),c("click",function(){w(t);let i=g();return v(i.saveGenre())}),l(11," Zapisz "),a()(),o(12,"div",7)(13,"button",9),c("click",function(){w(t);let i=g();return v(i.router.navigate(["../.."],{relativeTo:i.route}))}),l(14," Anuluj "),a()()()()}if(e&2){let t,n,i,r=g();s(),m("formGroup",r.editGenreForm),s(5),m("ngIf",(t=r.editGenreForm.get("genreName"))==null?null:t.hasError("required")),s(),m("ngIf",(n=r.editGenreForm.get("genreName"))==null?null:n.hasError("genreExists")),s(3),m("disabled",r.editGenreForm.invalid||((i=r.editGenreForm.get("genreName"))==null?null:i.pending))}}var Te=(()=>{class e{constructor(t,n,i,r){this.genreService=t,this.fb=n,this.router=i,this.route=r,this.existingGenres=[],this.subscription=new h,this.isLoading=!1}ngOnInit(){this.isLoading=!0,this.subscription.add(this.route.params.pipe(te(t=>(this.currentGenreId=+t.id,this.genreService.getGenres()))).subscribe(t=>{this.existingGenres=t;let n=t.find(i=>i.id===this.currentGenreId);n&&(this.editGenreForm=this.fb.group({genreName:[n.name,[D.required],[this.genreExistsValidator.bind(this)]]})),this.isLoading=!1}))}ngOnDestroy(){this.subscription.unsubscribe()}genreExistsValidator(t){return this.genreService.getGenres().pipe(y(n=>n.some(r=>r.name.toLowerCase()===t.value.toLowerCase()&&r.id!==this.currentGenreId)?{genreExists:!0}:null))}saveGenre(){if(this.editGenreForm.valid){let t=this.editGenreForm.value.genreName;this.genreService.updateGenre({id:this.currentGenreId,name:t}).subscribe(()=>{this.router.navigate(["../.."],{relativeTo:this.route})})}}static{this.\u0275fac=function(n){return new(n||e)(p(C),p($),p(N),p(I))}}static{this.\u0275cmp=_({type:e,selectors:[["app-admin-panel-genre-edit"]],decls:2,vars:2,consts:[["mode","indeterminate",4,"ngIf"],[4,"ngIf"],["mode","indeterminate"],[3,"ngSubmit","formGroup"],["appearance","fill",2,"width","300px"],["matInput","","formControlName","genreName","placeholder","Wprowad\u017A nazw\u0119 gatunku"],[1,"row","ms-1","mb-1","d-flex","align-items-center"],[1,"col-auto"],["mat-flat-button","","color","primary","type","submit",3,"click","disabled"],["mat-flat-button","","color","warn","type","button",3,"click"]],template:function(n,i){if(n&1&&u(0,Je,1,0,"mat-progress-bar",0)(1,Ye,15,4,"div",1),n&2){let r;m("ngIf",(r=i.editGenreForm.get("genreName"))==null?null:r.pending),s(),m("ngIf",!i.isLoading)}},dependencies:[E,z,T,j,V,L,O,G,H,R,F,k,b]})}}return e})();function et(e,d){e&1&&f(0,"mat-progress-bar",9)}function tt(e,d){e&1&&(o(0,"mat-error"),l(1," Nazwa gatunku jest wymagana "),a())}function it(e,d){e&1&&(o(0,"mat-error"),l(1," Gatunek ju\u017C istnieje "),a())}var De=(()=>{class e{constructor(t,n,i,r){this.genreService=t,this.fb=n,this.router=i,this.route=r,this.existingGenres=[],this.subscription=new h}ngOnInit(){this.subscription.add(this.genreService.getGenres().subscribe(t=>{this.existingGenres=t})),this.newGenreForm=this.fb.group({genreName:["",[D.required],[this.genreExistsValidator.bind(this)]]})}ngOnDestroy(){this.subscription.unsubscribe()}genreExistsValidator(t){return this.genreService.getGenres().pipe(y(n=>n.some(r=>r.name.toLowerCase()===t.value.toLowerCase())?{genreExists:!0}:null))}saveGenre(){if(this.newGenreForm.valid){let t=this.newGenreForm.value.genreName;this.genreService.createGenre({id:0,name:t}).subscribe(()=>{this.router.navigate([".."],{relativeTo:this.route})})}}static{this.\u0275fac=function(n){return new(n||e)(p(C),p($),p(N),p(I))}}static{this.\u0275cmp=_({type:e,selectors:[["app-admin-panel-genre-new"]],decls:15,vars:5,consts:[["mode","indeterminate",4,"ngIf"],[3,"ngSubmit","formGroup"],["appearance","fill",2,"width","300px"],["matInput","","formControlName","genreName","placeholder","Wprowad\u017A nazw\u0119 gatunku"],[4,"ngIf"],[1,"row","ms-1","mb-1","d-flex","align-items-center"],[1,"col-auto"],["mat-flat-button","","color","primary","type","submit",3,"click","disabled"],["mat-flat-button","","color","warn","type","button",3,"click"],["mode","indeterminate"]],template:function(n,i){if(n&1&&(u(0,et,1,0,"mat-progress-bar",0),o(1,"form",1),c("ngSubmit",function(){return i.saveGenre()}),o(2,"mat-form-field",2)(3,"mat-label"),l(4,"Nazwa gatunku"),a(),f(5,"input",3),u(6,tt,2,0,"mat-error",4)(7,it,2,0,"mat-error",4),a()(),o(8,"div",5)(9,"div",6)(10,"button",7),c("click",function(){return i.saveGenre()}),l(11," Zapisz "),a()(),o(12,"div",6)(13,"button",8),c("click",function(){return i.router.navigate([".."],{relativeTo:i.route})}),l(14," Anuluj "),a()()()),n&2){let r,K,X,Y;m("ngIf",(r=i.newGenreForm.get("genreName"))==null?null:r.pending),s(),m("formGroup",i.newGenreForm),s(5),m("ngIf",(K=i.newGenreForm.get("genreName"))==null?null:K.hasError("required")),s(),m("ngIf",(X=i.newGenreForm.get("genreName"))==null?null:X.hasError("genreExists")),s(3),m("disabled",i.newGenreForm.invalid||((Y=i.newGenreForm.get("genreName"))==null?null:Y.pending))}},dependencies:[E,z,T,j,V,L,O,G,H,R,F,k,b]})}}return e})();var nt=[{path:"",component:Re},{path:"new",component:De},{path:":id/edit",component:Te}],je=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=A({type:e})}static{this.\u0275inj=M({imports:[Z.forChild(nt),Z]})}}return e})();var zt=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=A({type:e})}static{this.\u0275inj=M({imports:[pe,he,Ee,je,_e,fe,we,ge,b]})}}return e})();export{zt as a};
