import { NextResponse } from "next/server";
import OpenAI from "openai";


const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});


export async function POST(req: Request){

  try{

    const {idea}=await req.json();


    const result =
    await client.chat.completions.create({

      model:"deepseek-chat",

      messages:[
        {
          role:"system",
          content:
          "你是世界顶级AI绘画Prompt工程师，负责生成Midjourney、Flux、可灵、即梦适用的专业提示词。"
        },
        {
          role:"user",
          content:
          `帮我生成一个电影级AI图片提示词：
          ${idea}`
        }
      ]

    });


    return NextResponse.json({

      prompt:
      result.choices[0].message.content

    });


  }catch(error){

    return NextResponse.json({
      error:"API错误"
    })

  }

}
