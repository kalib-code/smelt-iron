var R=Object.create;var $=Object.defineProperty,_=Object.defineProperties,Q=Object.getOwnPropertyDescriptor,B=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertyNames,A=Object.getOwnPropertySymbols,H=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var F=(e,s,r)=>s in e?$(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,f=(e,s)=>{for(var r in s||(s={}))O.call(s,r)&&F(e,r,s[r]);if(A)for(var r of A(s))K.call(s,r)&&F(e,r,s[r]);return e},P=(e,s)=>_(e,B(s));var T=(e,s)=>{for(var r in s)$(e,r,{get:s[r],enumerable:!0})},m=(e,s,r,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let t of E(s))!O.call(e,t)&&t!==r&&$(e,t,{get:()=>s[t],enumerable:!(n=Q(s,t))||n.enumerable});return e};var j=(e,s,r)=>(r=e!=null?R(H(e)):{},m(s||!e||!e.__esModule?$(r,"default",{value:e,enumerable:!0}):r,e)),h=e=>m($({},"__esModule",{value:!0}),e);var X={};T(X,{AuthHelper:()=>G,DataProvider:()=>C,getValueProps:()=>J,mediaUploadMapper:()=>N,useStrapiUpload:()=>W});module.exports=h(X);var M=j(require("axios")),p=require("qs"),k=M.default.create();k.interceptors.response.use(e=>e,e=>{var r,n,t;let s=P(f({},e),{message:(n=(r=e.response)==null?void 0:r.data)==null?void 0:n.message,statusCode:(t=e.response)==null?void 0:t.status});return Promise.reject(s)});var L=e=>{switch(e){case"nin":return"notIn";case"ncontains":return"notContains";case"containss":return"containsi";case"ncontainss":return"notContainsi"}return e},q=e=>{let s=[];return e&&e.map(r=>{r.order&&s.push(`${r.field}:${r.order}`)}),s},z=e=>{let s="";e&&e.map(t=>{if(t.operator!=="or"){let{field:i,operator:o,value:c}=t,u=L(o);Array.isArray(c)?c.map((a,l)=>{s+=`&filters[${i}][$${u}][${l}]=${a}`}):s+=`&filters[${i}][$${u}]=${c}`}else{let{value:i}=t;i.map((o,c)=>{let{field:u,operator:a,value:l}=o,y=L(a);s+=`&filters[$or][${c}][${u}][$${y}]=${l}`})}});let r=(0,p.parse)(s);return(0,p.stringify)(r,{encodeValuesOnly:!0})},g=e=>{let s=n=>Object.prototype.toString.call(n)==="[object Object]",r=n=>n.attributes?f({id:n.id},n.attributes):n;if(Array.isArray(e))return e.map(n=>g(n));if(s(e)){Array.isArray(e.data)?e=[...e.data]:s(e.data)?e=r(f({},e.data)):e.data===null?e=null:e=r(e);for(let n in e)e[n]=g(e[n]);return e}return e},C=(e,s=k)=>({getList:async({resource:r,pagination:n,filters:t,sort:i,metaData:o})=>{let c=`${e}/${r}`,u=(n==null?void 0:n.current)||1,a=(n==null?void 0:n.pageSize)||10,l=o==null?void 0:o.locale,y=o==null?void 0:o.fields,d=o==null?void 0:o.populate,v=o==null?void 0:o.publicationState,I=q(i),U=z(t),V={"pagination[page]":u,"pagination[pageSize]":a,locale:l,publicationState:v,fields:y,populate:d,sort:I.length>0?I.join(","):void 0},{data:S}=await s.get(`${c}?${(0,p.stringify)(V,{encodeValuesOnly:!0})}&${U}`);return{data:g(S),total:S.meta.pagination.total}},getMany:async({resource:r,ids:n})=>{let t=`${e}/${r}`,i=n.map(c=>`filters[id][$in]=${c}`).join("&"),{data:o}=await s.get(`${t}?${i}`);return{data:g(o)}},create:async({resource:r,variables:n})=>{let t=`${e}/${r}`,i={data:n};r==="users"&&(i=n);let{data:o}=await s.post(t,i);return{data:o}},update:async({resource:r,id:n,variables:t})=>{let i=`${e}/${r}/${n}`,o={data:t};r==="users"&&(o=t);let{data:c}=await s.put(i,o);return{data:c}},updateMany:async({resource:r,ids:n,variables:t})=>({data:await Promise.all(n.map(async o=>{let c=`${e}/${r}/${o}`,u={data:t};r==="users"&&(u=t);let{data:a}=await s.put(c,u);return a}))}),createMany:async({resource:r,variables:n})=>({data:await Promise.all(n.map(async i=>{let{data:o}=await s.post(`${e}/${r}`,{data:i});return o}))}),getOne:async({resource:r,id:n,metaData:t})=>{let i=t==null?void 0:t.locale,o=t==null?void 0:t.fields,c=t==null?void 0:t.populate,a=`${e}/${r}/${n}?${(0,p.stringify)({locale:i,fields:o,populate:c},{encode:!1})}`,{data:l}=await s.get(a);return{data:g(l)}},deleteOne:async({resource:r,id:n})=>{let t=`${e}/${r}/${n}`,{data:i}=await s.delete(t);return{data:i}},deleteMany:async({resource:r,ids:n})=>({data:await Promise.all(n.map(async i=>{let{data:o}=await s.delete(`${e}/${r}/${i}`);return o}))}),getApiUrl:()=>e,custom:async({url:r,method:n,filters:t,sort:i,payload:o,query:c,headers:u})=>{let a=`${r}?`;if(i){let d=q(i);d.length>0&&(a=`${a}&${(0,p.stringify)({sort:d.join(",")})}`)}if(t){let d=z(t);a=`${a}&${d}`}c&&(a=`${a}&${(0,p.stringify)(c)}`),u&&(s.defaults.headers=f(f({},s.defaults.headers),u));let l;switch(n){case"put":case"post":case"patch":l=await s[n](r,o);break;case"delete":l=await s.delete(r);break;default:l=await s.get(a);break}let{data:y}=l;return Promise.resolve({data:y})}});var w=j(require("axios")),G=e=>({login:async(s,r)=>{let n=`${e}/auth/local`;return await w.default.post(n,{identifier:s,password:r})},me:async s=>await w.default.get(`${e}/users/me`,{headers:{Authorization:`Bearer ${s}`}})});var J=(e,s)=>{var r;return e?{file:e.file,fileList:(r=e.fileList)!=null?r:(Array.isArray(e)?e:[...e]).map(n=>{let t={name:n.name,percent:n.percent,size:n.size,status:n.status,type:n.mime||n.type,uid:n.id};return n.url&&(t.url=`${s}${n.url}`),t})}:{fileList:[]}},N=e=>(Object.keys(e).map(s=>{if(e[s]){let r=e[s].fileList;if(Array.isArray(r)){let t=[];for(let i of r)if(i.response)for(let o of i.response)t.push(o.id);else t.push(i.uid);e[s]=t}}}),e);var x=require("react"),W=({maxCount:e})=>{let[s]=(0,x.useState)([]),[r,n]=(0,x.useState)([]);return{uploadedFileIds:s,beforeUpload:(i,o)=>{let c=r.length,u=o.length;if(c+u>e){let a=c+u-e,l=a-a*2;o.splice(l)}return n([...r,...o]),!0},fileList:r,maxCount:e}};
//# sourceMappingURL=index.js.map