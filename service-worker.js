if(!self.define){let a,e={};const t=(t,s)=>(t=new URL(t+".js",s).href,e[t]||new Promise((e=>{if("document"in self){const a=document.createElement("script");a.src=t,a.onload=e,document.head.appendChild(a)}else a=t,importScripts(t),e()})).then((()=>{let a=e[t];if(!a)throw new Error(`Module ${t} didn’t register its module`);return a})));self.define=(s,i)=>{const n=a||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const l=a=>t(a,n),d={module:{uri:n},exports:c,require:l};e[n]=Promise.all(s.map((a=>d[a]||l(a)))).then((a=>(i(...a),c)))}}define(["./workbox-e033a2e2"],(function(a){"use strict";self.skipWaiting(),a.clientsClaim(),a.precacheAndRoute([{url:"/KonstantinBylbas/index.html",revision:"4d9ded9991c58e8e1519f8dae6138cfd"},{url:"/KonstantinBylbas/static/css/main.478ea84b.css",revision:null},{url:"/KonstantinBylbas/static/js/main.bc4a302f.js",revision:null},{url:"/KonstantinBylbas/static/js/main.bc4a302f.js.LICENSE.txt",revision:"1b03b3829b44b67a8eacf60e0c17fccc"},{url:"/KonstantinBylbas/static/media/Montserrat-Italic-VariableFont_wght.7451547bd28d8dddbeea.ttf",revision:null},{url:"/KonstantinBylbas/static/media/Montserrat-VariableFont_wght.7e687123cd4528224ce5.ttf",revision:null},{url:"/KonstantinBylbas/static/media/author.48e8eb2dfbf3daa1f1a1.webp",revision:null},{url:"/KonstantinBylbas/static/media/briefcase.7b9f887f56d3f4ebf4e6ec921e7b40cb.svg",revision:"47b02a850f7cc35c1a2f07d19ad502c0"},{url:"/KonstantinBylbas/static/media/burger.194b6bb205c34547dd001dfee759e272.svg",revision:"fc710762274fac541564f84ebe04d286"},{url:"/KonstantinBylbas/static/media/generator-string.56a16ac3cb49267be9aeeff73a1e089e.svg",revision:"5734b47786fbde8d542dfb6ce3c88c19"},{url:"/KonstantinBylbas/static/media/home.aa3558d322eb0abd2394c2880a64b8f2.svg",revision:"2411a6b075ec0f0666dcaf365fcaf5f5"},{url:"/KonstantinBylbas/static/media/left.73b34308dc1fb37827e6d55eeea620e8.svg",revision:"ba75cd487ab4257b320ad3842896d74c"},{url:"/KonstantinBylbas/static/media/logo.64d5d2e9a3134978794a.webp",revision:null},{url:"/KonstantinBylbas/static/media/mail.7f9003840545704ac0e527d502bcacdf.svg",revision:"97be3693dc234b05a1d255e521bfc087"},{url:"/KonstantinBylbas/static/media/naughts-and-crosses.d7c37227c48509695b3447881419a2cf.svg",revision:"6a2192405488b6b37b124e0c11169c95"},{url:"/KonstantinBylbas/static/media/object.74455d26f8698118f848.ttf",revision:null},{url:"/KonstantinBylbas/static/media/person.90db6c37eda5c94d328cfa09e0c5a603.svg",revision:"1c959b7876af91907e0b0a21b7a10465"},{url:"/KonstantinBylbas/static/media/platform.718740edb5e33c50f021cd9aa56ae98d.svg",revision:"435ec3cd1ce7cda3a558971c595d0c43"},{url:"/KonstantinBylbas/static/media/right.d9736fd471acea3fcbeb5daaac74eb8b.svg",revision:"d668d33695918aa035c6b6d048d8c236"},{url:"/KonstantinBylbas/static/media/slick.2630a3e3eab21c607e21.svg",revision:null},{url:"/KonstantinBylbas/static/media/slick.295183786cd8a1389865.woff",revision:null},{url:"/KonstantinBylbas/static/media/slick.a4e97f5a2a64f0ab1323.eot",revision:null},{url:"/KonstantinBylbas/static/media/slick.c94f7671dcc99dce43e2.ttf",revision:null}],{}),a.registerRoute(/\.(?:ttf|otf|woff|woff2|svg)$/,new a.CacheFirst({cacheName:"fonts",plugins:[new a.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
