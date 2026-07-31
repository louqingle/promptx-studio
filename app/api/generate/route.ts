import { NextResponse } from "next/server"

export async function POST(req: Request){

const {idea}=await req.json()

let scene = ""
let camera = ""
let light = ""
let style = ""


if(idea.includes("猫") || idea.includes("狗") || idea.includes("动物")){

scene = `
一只可爱的动物作为主角，
在特殊环境中探索世界，
表现真实细腻的毛发，
丰富的情绪表情，
电影级故事感。
`

camera = `
微距电影摄影，
低角度跟拍，
慢动作镜头，
特写动物眼神。
`

light = `
柔和自然光，
电影暖色调，
梦幻氛围。
`

style="治愈系动物电影"

}


else if(
idea.includes("未来") ||
idea.includes("机器人") ||
idea.includes("科技")
){

scene=`
未来世界城市，
高科技建筑，
智能机器人穿梭其中，
无人驾驶车辆，
巨大的未来都市空间。
`

camera=`
IMAX电影摄影，
无人机航拍，
环绕镜头，
电影级运镜。
`

light=`
蓝紫色霓虹灯光，
雨夜反射，
赛博朋克视觉效果。
`

style="未来科幻大片"

}


else if(
idea.includes("宇航员") ||
idea.includes("月球") ||
idea.includes("火星") ||
idea.includes("太空")
){

scene=`
浩瀚宇宙背景，
宇航员探索未知星球，
巨大行星和星云出现，
史诗级空间场景。
`

camera=`
NASA纪录片摄影，
慢推进镜头，
广角电影镜头。
`

light=`
宇宙冷色光，
真实星球光影，
震撼视觉效果。
`

style="太空史诗电影"

}


else{

scene=`
根据用户创意创造一个真实电影场景，
加入人物、环境、故事细节。
`

camera=`
专业电影摄影机，
电影镜头语言，
动态运镜。
`

light=`
真实光影，
电影调色，
高级视觉效果。
`

style="好莱坞电影风格"

}


const prompt=`

🎬 AI电影提示词

主题：
${idea}


电影类型：
${style}


【场景设计】
${scene}


【摄影语言】
${camera}


【光影效果】
${light}


【生成参数】

8K Ultra Realistic
IMAX Quality
Cinematic Lighting
Hollywood Movie Style
Professional Camera
High Detail
16:9


适用于：
Sora / Runway / 可灵AI / Midjourney

`

return NextResponse.json({
result:prompt
})

}
