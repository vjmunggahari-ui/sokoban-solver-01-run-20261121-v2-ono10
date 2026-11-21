import fs from"fs";
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
for(let id of fs.readdirSync(I)){
let d="/"+id+"/",t=fs.readFileSync(I+d+"level.txt","utf8"),W=t.search("\n"),N=[-W,W,-1,1],A=t.replaceAll("\n",""),B=[...A.matchAll(/[$*]/g)].map(m=>m.index),P=A.search(/[@+]/),F=(f,b,y)=>{let m={[f]:0},q=[f];for(let c of q){for(let k=4;k--;){let n=c+N[k];if(A[n]!="#"&&!b.includes(n)&&m[n]==null&&~~(n/W)!=y)m[n]=c*4+k,q.push(n)}}return m},Y=(M,x)=>M[x]?Y(M,M[x]>>2)+"udlr"[M[x]&3]:"",mv="",p=P;
for(let b of B){
if(!~B.indexOf(b))continue;
mv+=Y(F(p,B,-1),P);p=P;
let M0=F(b,[],(P/W)|0),bb=B.filter(x=>M0[x]!=null),sn={[bb.join()+","+P]:1},q=[[bb,P,""]],h=0,gn=null;
while(h<q.length){
let z=q[h++],[cb,pp,st]=z,R=F(pp,cb,-1);
if(cb.every(x=>A[x]>"$"&&A[x]<"@")){gn=z;break}
for(let j=cb.length;j--;)for(let k=4;k--;){
let bi=cb[j],bh=bi-N[k],de=bi+N[k];
if(R[bh]==null||M0[de]==null||cb.includes(de))continue;
let nb=cb.map((x,i)=>i-j?x:de).sort((x,y)=>x-y),kk=nb.join()+","+bi;
if(!sn[kk]){sn[kk]=1;q.push([nb,bi,st+Y(R,bh)+"udlr"[k]])}
}}
if(gn){mv+=gn[2];p=gn[1];B=B.filter(x=>M0[x]==null).concat(gn[0])}
}
fs.mkdirSync(O+d,{recursive:true});
fs.writeFileSync(O+d+"solution.txt",mv)}
