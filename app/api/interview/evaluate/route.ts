import {NextResponse} from "next/server";
import OpenAI from "openai";

export async function POST(req:Request){
  const {question="",answer="",jd="",resume=""}=await req.json();
  if(!process.env.OPENAI_API_KEY){
    return NextResponse.json({score:78,content:82,logic:76,relevance:84,data:72,language:80,feedback:["回答有核心结论","建议补充具体数据和个人动作","结尾增加复盘或业务影响"],betterAnswer:"先给结论，再说明我做了什么、为什么这样做，最后用数据说明结果。"});
  }
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const prompt=`Evaluate an interview answer. Never invent facts. Return JSON with score, content, logic, relevance, data, language, feedback(array), betterAnswer. Question:${question}\nAnswer:${answer}\nResume:${resume}\nJD:${jd}`;
  const r=await client.chat.completions.create({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",messages:[{role:"system",content:"Return strict JSON only."},{role:"user",content:prompt}],response_format:{type:"json_object"}});
  return NextResponse.json(JSON.parse(r.choices[0].message.content||"{}"));
}
