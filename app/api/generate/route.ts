import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const idea = body?.idea
    const type = body?.type === "video" ? "video" : "image"
    const language = body?.language === "en" ? "en" : "zh"

    if (!idea || typeof idea !== "string" || !idea.trim()) {
      return NextResponse.json(
        { error: language === "zh" ? "请输入你的创意" : "Please enter your idea" },
        { status: 400 }
      )
    }

    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "服务器尚未配置 AI API Key" },
        { status: 500 }
      )
    }

    const outputLanguage =
      language === "zh"
        ? "简体中文"
        : "English"

    const promptType =
      type === "video"
        ? "AI 视频 Prompt"
        : "AI 图片 Prompt"

    const systemPrompt = `
你是一名世界顶级的 AI Prompt 工程师。

你的任务是把用户简单的创意，扩展成专业、详细、可以直接复制到 AI 图片或 AI 视频生成平台使用的 Prompt。

当前任务类型：${promptType}

必须使用 ${outputLanguage} 输出。

非常重要：
1. 用户选择中文时，最终 Prompt 必须全部使用简体中文。
2. 用户选择 English 时，最终 Prompt 必须全部使用英文。
3. 不要因为 Midjourney、Flux、Sora、Runway、可灵AI、即梦AI 等平台名称而自动切换语言。
4. 不要解释你的思考过程。
5. 直接输出最终 Prompt。
`

    const userPrompt =
      type === "video"
        ? `
请把下面的创意扩展成一个专业的电影级 AI 视频 Prompt。

必须重点描述：
- 主体
- 场景
- 人物动作
- 环境运动
- 镜头运动
- 景别
- 摄影机
- 镜头焦段
- 灯光
- 色彩
- 氛围
- 时间变化
- 画面细节
- 视频质感

如果合适，可以按照：
【主体】
【场景】
【动作】
【镜头】
【灯光】
【色彩】
【氛围】
【画质】

进行组织。

用户创意：

${idea.trim()}
`
        : `
请把下面的创意扩展成一个专业的电影级 AI 图片 Prompt。

必须重点描述：
- 主体
- 环境
- 人物外观
- 动作
- 构图
- 摄影机
- 镜头焦段
- 景深
- 灯光
- 色彩
- 材质
- 氛围
- 画面细节
- 画质

如果合适，可以按照：
【主体】
【环境】
【构图】
【摄影】
【灯光】
【色彩】
【氛围】
【画质】

进行组织。

用户创意：

${idea.trim()}
`

    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          temperature: 0.8,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "AI API 请求失败",
        },
        { status: response.status }
      )
    }

    const result =
      data?.choices?.[0]?.message?.content

    if (!result) {
      return NextResponse.json(
        { error: "AI 没有返回有效结果" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      result,
      type,
      language,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "服务器处理请求失败" },
      { status: 500 }
    )
  }
}
