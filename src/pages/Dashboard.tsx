import { demoUsers, DemoUser } from "../data/demoUsers";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function useCurrentUser(): [DemoUser|null, (u:DemoUser|null)=>void]{
  const [u,setU]=useState<DemoUser|null>(null);
  useEffect(()=>{
    const id = localStorage.getItem("currentUserId")||"";
    setU(demoUsers.find(d=>d.id===id)??null);
  },[]);
  const set=(v:DemoUser|null)=>{ if(v) localStorage.setItem("currentUserId", v.id); else localStorage.removeItem("currentUserId"); setU(v); };
  return [u,set];
}

export default function Dashboard(){
  const [user,setUser]=useCurrentUser();
  const nav = useNavigate();
  useEffect(()=>{ if(!user) nav("/signup"); },[user,nav]);
  if(!user) return null;

  // local state mirrors; persist on change
  const [albums,setAlbums]=useState(user.portfolio.albums);
  const [stacks,setStacks]=useState(user.portfolio.stacks);
  useEffect(()=>{ user.portfolio.albums=albums; user.portfolio.stacks=stacks; },[albums,stacks,user]);

  const [newUrl,setNewUrl]=useState("");

  const addPhoto=(to:"albums"|"stacks",i:number)=>{
    if(!newUrl) return;
    const list = to==="albums"?[...albums]:[...stacks];
    list[i].photoUrls=[newUrl,...list[i].photoUrls];
    to==="albums"?setAlbums(list):setStacks(list);
    setNewUrl("");
  };

  return (
    <div style={{padding:"2rem",maxWidth:1100,margin:"0 auto"}}>
      <header style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
        <img src={user.avatar} alt="" width="56" height="56" style={{borderRadius:999}}/>
        <div>
          <h2 style={{margin:"0 0 6px"}}>{user.name}</h2>
          <div style={{opacity:.7,fontSize:14}}>{user.role} • {user.email}</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <Link to="/demos">Demo directory</Link>
          <button onClick={()=>{localStorage.removeItem("currentUserId"); nav("/signup");}}>Log out</button>
        </div>
      </header>

      <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div>
          <h3>Albums</h3>
          <input placeholder="Add image URL…" value={newUrl} onChange={e=>setNewUrl(e.target.value)} style={{width:"100%",marginBottom:8}}/>
          {albums.map((a,i)=>(
            <div key={a.id} style={{border:"1px solid #e5e7eb",borderRadius:12,padding:12,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <strong>{a.name}</strong>
                <button onClick={()=>addPhoto("albums",i)}>Upload URL</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:8}}>
                {a.photoUrls.map((u,j)=><img key={j} src={u} style={{width:"100%",height:90,objectFit:"cover",borderRadius:8}}/>)}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3>Stacks</h3>
          {stacks.map((s,i)=>(
            <div key={s.id} style={{border:"1px solid #e5e7eb",borderRadius:12,padding:12,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <strong>{s.name}</strong>
                <button onClick={()=>addPhoto("stacks",i)}>Add to stack</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:8}}>
                {s.photoUrls.map((u,j)=><img key={j} src={u} style={{width:"100%",height:90,objectFit:"cover",borderRadius:8}}/>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
