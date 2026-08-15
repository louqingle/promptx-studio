import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const idea = body?.idea
    const type = body?.type === "video" ? "video" : "image"
    const language = body?.language === "en" ? "en" : "zh"
    const optimize = body?.optimize === true

    if (
      !idea ||
      typeof idea !== "string" ||
      !idea.trim()
    ) {
      return NextResponse.json(
        {
          error:
            language === "zh"
              ? "请输入你的创意"
              : "Please enter your idea",
        },
        { status: 400 }
      )
    }

    const apiKey =
      process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "服务器尚未配置 DEEPSEEK_API_KEY",
        },
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
你是世界顶级的 AI Prompt 工程师。

你的任务是把用户的简单创意扩展成专业、详细、可以直接复制到 AI 创作平台使用的 Prompt。

当前类型：
${promptType}

输出语言：
${outputLanguage}

严格规则：

1. 如果输出语言是简体中文，最终 Prompt 必须使用简体中文。
2. 如果输出语言是 English，最终 Prompt 必须使用英文。
3. 不要因为平台名称是英文而改变输出语言。
4. 不要解释你的思考过程。
5. 直接输出最终 Prompt。
6. 不要输出与 Prompt 无关的废话。

要求：
- 画面具体
- 细节丰富
- 避免空泛形容词
- 强化真实感
- 强化电影感
- 保留用户核心创意
`

    let userPrompt = ""

    if (type === "video") {
      userPrompt = `
请生成一个专业的电影级 AI 视频 Prompt。

重点描述：

【主体】
人物、动物或物体的外观。

【场景】
地点、环境、天气、时间。

【动作】
主体正在做什么，以及动作变化。

【镜头】
景别、焦段、机位、构图、运镜。

【环境运动】
雨、烟雾、车辆、人群、树叶、灯光等运动。

【灯光】
主光、轮廓光、环境光、色温。

【色彩】
整体色彩和视觉风格。

【氛围】
情绪、电影感、故事感。

【视频质感】
真实摄影机质感、景深、运动模糊、胶片颗粒等。

如果适合，请设计一个清晰的开始、中间和结束过程。

用户创意：

${idea.trim()}
`
    } else {
      userPrompt = `
请生成一个专业的电影级 AI 图片 Prompt。

重点描述：

【主体】
人物、动物或物体。

【环境】
地点、天气、时间和背景。

【构图】
主体位置、前景、中景、背景。

【摄影】
摄影机、镜头焦段、景深、视角。

【灯光】
光源方向、色温、明暗关系。

【色彩】
主色调、辅助色、色彩关系。

【材质】
皮肤、衣物、建筑、金属、玻璃等真实材质。

【氛围】
情绪和电影感。

【画质】
照片级真实感、细节、胶片颗粒、摄影机质感。

用户创意：

${idea.trim()}
`
    }

    if (optimize) {
      userPrompt = `
请优化下面这个已有 Prompt。

要求：

- 保留原始核心内容
- 增强视觉细节
- 增强真实感
- 增强电影感
- 修正模糊表达
- 优化镜头和灯光描述
- 让 Prompt 可以直接用于 AI 创作

原 Prompt：

${idea.trim()}
`
    }

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

          max_tokens: 2500,
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
        {
          status: response.status,
        }
      )
    }

    const result =
      data?.choices?.[0]?.message?.content

    if (!result) {
      return NextResponse.json(
        {
          error:
            "AI 没有返回有效结果",
        },
        {
          status: 502,
        }
      )
    }

    return NextResponse.json({
      result,
      type,
      language,
    })
  } catch (error) {
    console.error(
      "Generate API Error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "服务器处理请求失败，请稍后重试",
      },
      {
        status: 500,
      }
    )
  }
}
