import{a as i}from"./chunk-BKP4CZB2.js";import{a as n}from"./chunk-G5IVLWJY.js";import{aa as r,fa as a}from"./chunk-DQM3UAK6.js";var p=(()=>{class e{constructor(t){this.http=t}getPlaces(){return this.http.get(`${i.baseApiUri}/AdminPlace/all`,{withCredentials:!0})}createPlace(t){return this.http.post(`${i.baseApiUri}/AdminPlace/new`,t,{withCredentials:!0})}updatePlace(t){return this.http.put(`${i.baseApiUri}/AdminPlace/update/${t.id}`,t,{withCredentials:!0})}deletePlace(t){return this.http.delete(`${i.baseApiUri}/AdminPlace/delete/${t}`,{withCredentials:!0})}static{this.\u0275fac=function(s){return new(s||e)(a(n))}}static{this.\u0275prov=r({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{p as a};
