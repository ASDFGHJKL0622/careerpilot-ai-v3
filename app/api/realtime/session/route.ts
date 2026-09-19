import {NextResponse} from "next/server";

export async function POST(req:Request){
  if(!process.env.OPENAI_API_KEY){
    return NextResponse.json({demo:true,model:"gpt-realtime-2.1"});
  }
  const body=await req.json().catch(()=>({}));
  const instructions=body.instructions || `You are a professional big-tech interviewer. Ask one question at a time. Follow up on the candidate's evidence, numbers, decisions and trade-offs. Do not invent candidate facts.`;
  const r=await fetch("https://api.openai.com/v1/realtime/client_secrets",{
    method:"POST",
    headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      session:{
        type:"realtime",
        model:process.env.OPENAI_REALTIME_MODEL||"gpt-realtime-2.1",
        instructions,
        audio:{output:{voice:"marin"}}
      }
    })
  });
  if(!r.ok) return NextResponse.json({error:"realtime session creation failed",detail:await r.text()},{status:502});
  const data=await r.json();
  return NextResponse.json({client_secret:data.value||data.client_secret,expires_at:data.expires_at,model:"gpt-realtime-2.1"});
}
