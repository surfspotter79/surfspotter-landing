import { useState } from "react";
import { demoUsers, DEMO_PASSWORD_HINT } from "../data/demoUsers";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const nav = useNavigate();

  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    const u = demoUsers.find(d=>d.email.toLowerCase()===email.toLowerCase() && d.password===password);
    if(!u){ setErr("Invalid email or password (hint: "+DEMO_PASSWORD_HINT+")"); return; }
    localStorage.setItem("currentUserId", u.id);
    nav("/dashboard");
  };

  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"linear-gradient(135deg,#ff6a00,#ff3d77)"}}>
      <form onSubmit={submit} style={{background:"#fff",padding:"2rem",borderRadius:16,width:360,boxShadow:"0 12px 30px rgba(0,0,0,.15)"}}>
        <h2 style={{marginTop:0}}>Sign Up / Log In</h2>
        <p style={{marginTop:0,color:"#555"}}>Use one of the demo accounts below. Password: <b>{DEMO_PASSWORD_HINT}</b></p>
        <label>Email<br/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:"100%"}}/></label><br/><br/>
        <label>Password<br/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:"100%"}}/></label>
        {err && <p style={{color:"#d00"}}>{err}</p>}
        <button type="submit" style={{marginTop:"1rem",width:"100%"}}>Continue</button>
        <p style={{fontSize:12,opacity:.7,marginTop:12}}>Or browse <Link to="/demos">demo directory</Link></p>
      </form>
    </div>
  );
}
