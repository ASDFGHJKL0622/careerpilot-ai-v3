import {NextResponse} from "next/server";
import OpenAI from "openai";

export async function POST(req:Request){
  const {transcript="",resume="",jd="",history=[]}=await req.json();
  if(!process.env.OPENAI_API_KEY) return NextResponse.json({question:"请具体说说你在这个项目中做的最关键一个决策，以及为什么？"});
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const prompt=`Act as a big-tech interviewer. Based on the candidate answer, ask ONE concise follow-up question. Prefer evidence, numbers, decisions, trade-offs, ownership. Never ask for facts not reasonably grounded in resume. Return JSON {"question":"..."}. Resume:${resume}\nJD:${jd}\nPrevious:${JSON.stringify(history)}\nLatest answer:${transcript}`;
  const r=await client.chat.completions.create({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",messages:[{role:"system",content:"Return strict JSON only."},{role:"user",content:prompt}],response_format:{type:"json_object"}});
  return NextResponse.json(JSON.parse(r.choices[0].message.content||"{}"));
}
