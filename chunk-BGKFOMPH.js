import{a as f}from"./chunk-BKP4CZB2.js";import{a as s}from"./chunk-C5XILQZG.js";import{E as n,aa as a,fa as c,p as i}from"./chunk-UUB5ROYG.js";var g=(()=>{class t{constructor(r){this.http=r}getPerformances(){return this.http.get(`${f.baseApiUri}/Performance/all`).pipe(n(this.handleError("getPerformanceData")))}handleError(r="operation",e){return o=>(console.error(o),this.log(`${r} failed: ${o.message}`),i(e))}log(r){console.log(`PerformanceService: ${r}`)}static{this.\u0275fac=function(e){return new(e||t)(c(s))}}static{this.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{g as a};
