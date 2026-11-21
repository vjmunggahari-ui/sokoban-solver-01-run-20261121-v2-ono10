import fs from"fs";
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
for(let id of fs.readdirSync(I)){
let d="/"+id+"/",t=fs.readFileSync(I+d+"level.txt")+"",W=t.search("\n")+1,N=[-W,W,-1,1],B=[...t.matchAll(/[$*]/g)].map(m=>m.index),P=t.search(/[@+]/),F=(f,b,y)=>{let m={[f]:""},q=[f];for(c of q)for(k=4;k--;){n=c+N[k];if(t[n]>"\n"&&t[n]!="#"&&!b.includes(n)&&!(n in m)&&(n/W|0)!=y)m[n]=m[c]+"udlr"[k],q.push(n)}return m},mv="",p=P,k,c,n,j;
for(let b of B){
mv+=F(p,B)[P],p=P;
let M0=F(b,[],P/W|0),bb=B.filter(x=>x in M0),sn={[bb+","+P]:1},q=[[bb,P,""]],h=0;
for(;q[h];){
let[cb,pp,st]=q[h++],R=F(pp,cb);
if(cb.every(x=>t[x]>"%")){mv+=st,p=pp,B=B.filter(x=>!(x in M0)).concat(cb);break}
for(j=cb.length;j--;)for(k=4;k--;){let bi=cb[j],bh=bi-N[k],de=bi+N[k];
if(!(bh in R)|!(de in M0)|cb.includes(de))continue;
let nb=cb.with(j,de).sort((a,b)=>a-b),kk=nb+","+bi;
if(!sn[kk])sn[kk]=1,q.push([nb,bi,st+R[bh]+"udlr"[k]])}}
}
fs.mkdirSync(O+d,{recursive:!0});
fs.writeFileSync(O+d+"solution.txt",mv)}