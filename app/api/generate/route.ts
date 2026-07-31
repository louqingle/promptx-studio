import { NextResponse } from "next/server"

export async function POST(req: Request){

const {idea}=await req.json()


let style="电影级视觉"

if(
idea.includes("猫") ||
idea.includes("狗") ||
idea.includes("动物")
){
style="温暖治愈的动物电影"
}

if(
idea.includes("未来") ||
idea.includes("机器人") ||
idea.includes("科技")
){
style="赛博朋克未来科幻电影"
}

if(
idea.includes("宇航员") ||
idea.includes("太空") ||
idea.includes("月球") ||
idea.includes("火星")
){
style="NASA太空史诗电影"
}


const prompt=`

🎬 AI电影提示词生成

主题：
${idea}


电影风格：
${style}


【场景】
根据主题创造真实电影场景，
包含环境、时间、天气、空间细节。


【摄影】
专业电影摄影机，
ARRI Alexa 35，
电影级镜头语言。


【镜头运动】
使用：
慢推进镜头，
环绕镜头，
低角度拍摄，
电影运镜。


【光影】
真实光影，
体积光，
电影色彩，
高级调色。


【AI参数】

8K Ultra Realistic,
IMAX quality,
Cinematic lighting,
Hollywood movie style,
16:9,
high detail


`

return NextResponse.json({
result:prompt
})

}
