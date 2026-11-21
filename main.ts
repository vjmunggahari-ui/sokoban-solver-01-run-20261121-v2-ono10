import fs from"node:fs";
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
let S=t=>{
let W=t.indexOf("\n"),N=[-W,W,-1,1],A=t.replace(/\n/g,""),G={},B=[...A.matchAll(/[$*]/g)].map(m=>m.index),P=A.search(/[@+]/),hy=(P/W)|0;
[...A.matchAll(/[.*+]/g)].forEach(m=>G[m.index]=1);
let F=(f,b,y)=>{let m=new Map([[f,0]]),q=[f];for(let h=0;h<q.length;h++){let c=q[h];for(let k=0;k<4;k++){let n=c+N[k];if(A[n]!="#"&&!b.includes(n)&&!m.has(n)&&((n/W)|0)!=y)m.set(n,c*4+k),q.push(n);}}return m};
let mv="",p=P,dn={};
for(let b of B){
if(dn[b])continue;
let C=[...F(b,[],hy).keys()];C.forEach(c=>dn[c]=1);
let CS=new Set(C),bb=B.filter(x=>CS.has(x)),dr=C.find(c=>Math.abs((c/W|0)-hy)==1);
if(dr==null)continue;
let ou=dr+(dr<hy*W?W:-W),m=F(p,B,-1),w="",x=ou;
while(m.get(x)){let z=m.get(x);w="udlr"[z%4]+w;x=z/4|0;}
mv+=w;p=ou;
let b0=bb.sort((x,y)=>x-y),sn={[b0.join()+","+Math.min(...F(ou,b0,-1).keys())]:1},q=[[b0,ou,""]],h=0,gn=null;
while(h<q.length){
let z=q[h++],cb=z[0],pp=z[1],st=z[2];
if(cb.every(x=>G[x])){gn=z;break;}
let R=F(pp,cb,-1);
for(let j=0;j<cb.length;j++)for(let k=0;k<4;k++){
let bi=cb[j],bh=bi-N[k],de=bi+N[k];
if(!R.has(bh)||!CS.has(de)||cb.includes(de)||!G[de]&&(A[de-W]=="#"||A[de+W]=="#")&&(A[de-1]=="#"||A[de+1]=="#"))continue;
let nb=cb.map((x,j2)=>j2==j?de:x).sort((x,y)=>x-y),kk=nb.join()+","+Math.min(...F(bi,nb,-1).keys());
if(!sn[kk]){sn[kk]=1;let w2="",x2=bh;while(x2!=pp){let zz=R.get(x2);w2="udlr"[zz%4]+w2;x2=zz/4|0;}q.push([nb,bi,st+w2+"udlr"[k]]);}
}}
if(gn){mv+=gn[2];p=gn[1];B=B.filter(x=>!CS.has(x)).concat(gn[0]);}
}
return mv;
};
for(let id of fs.readdirSync(I)){
let d="/"+id+"/";fs.mkdirSync(O+d,{recursive:true});
fs.writeFileSync(O+d+"solution.txt",S(fs.readFileSync(I+d+"level.txt","utf8"))+"\n");
}
