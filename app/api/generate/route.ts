import { NextResponse } from "next/server"

export async function POST(req:Request){

const {idea}=await req.json()

const prompt=`
你是一名专业AI电影导演。

根据用户创意生成专业AI视频提示词。

用户创意：
${idea}

输出：

1. 场景描述
2. 摄影语言
3. 镜头运动
4. 光影效果
5. 8K电影参数
`

return NextResponse.json({
result:prompt
})

}
