import"./chunk-Q7L6LLAK.js";var s=":";function a(t,e){for(let i=1,n=1;i<t.length;i++,n++)if(e[n]==="\\")n++;else if(t[i]===s)return i;throw new Error(`Unterminated $localize metadata block in "${e}".`)}var r=function(t,...e){if(r.translate){let n=r.translate(t,e);t=n[0],e=n[1]}let i=o(t[0],t.raw[0]);for(let n=1;n<t.length;n++)i+=e[n-1]+o(t[n],t.raw[n]);return i},l=":";function o(t,e){return e.charAt(0)===l?t.substring(a(t,e)+1):t}globalThis.$localize=r;var g=[{path:"",loadComponent:()=>import("./chunk-HVJ62WU2.js").then(t=>t.DashboardComponent),data:{title:$localize`Dashboard`}}];export{g as routes};