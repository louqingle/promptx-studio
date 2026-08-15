import { NextResponse } from "next/server"

type PromptType = "image" | "video"
type Language = "zh" | "en"

type EnhanceType =
  | "optimize"
  | "realistic"
  | "cinematic"
  | "commercial"
  | "character"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const idea = body?.idea

    const type: PromptType =
      body?.type === "video"
        ? "video"
        : "image"

    const language: Language =
      body?.language === "en"
        ? "en"
        : "zh"

    const enhance: EnhanceType =
      [
        "optimize",
        "realistic",
        "cinematic",
        "commercial",
        "character",
      ].includes(body?.enhance)
        ? body.enhance
        : "optimize"

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
        ? "AI Video Prompt"
        : "AI Image Prompt"

    const enhancementInstructions: Record<
      EnhanceType,
      string
    > = {
      optimize: `
全面优化 Prompt。

要求：
- 保留用户核心创意
- 增加必要的视觉细节
- 删除模糊和重复描述
- 优化主体、环境、构图、摄影、灯光和色彩
- 让 Prompt 更容易被 AI 模型准确理解
`,

      realistic: `
重点增强真实感。

加入合适的：
- 真实皮肤纹理
- 自然材质
- 微小瑕疵
- 自然光线
- 真实环境细节
- 摄影机成像特征
- 自然景深
- 真实运动模糊
- 轻微胶片颗粒

不要过度磨皮，不要塑料感，不要过度完美。
最终画面应该像真实摄影，而不是廉价 AI 生成图。
`,

      cinematic: `
重点增强电影感。

加入合适的：
- 电影级构图
- 35mm / 50mm 等合适焦段
- 景别
- 镜头视角
- 主光与轮廓光
- 冷暖色彩关系
- 前景、中景、背景层次
- 景深
- 体积光
- 电影级色彩分级
- 叙事氛围

不要堆砌无意义的电影术语。
`,

      commercial: `
重点增强商业广告质感。

加入合适的：
- 产品主体突出
- 高级品牌视觉
- 干净构图
- 专业摄影棚或商业环境
- 精确布光
- 材质细节
- 产品轮廓
- 高级反射
- 视觉焦点
- 商业摄影质感

画面应该像高端品牌广告，而不是普通随手拍。
`,

      character: `
重点增强人物细节。

加入合适的：
- 年龄
- 五官
- 发型
- 皮肤纹理
- 眼神
- 表情
- 手部
- 衣物材质
- 身体姿态
- 动作细节
- 人物与环境的光影关系

保持人物自然，不要塑料脸、过度磨皮或不真实的完美皮肤。
`,
    }

    const systemPrompt = `
你是 PromptX Studio 的首席 AI Prompt 工程师。

你的任务是把用户输入的创意，转换成专业的 ${promptType}。

输出语言：
${outputLanguage}

严格规则：

1. 用户选择中文时，最终结果必须使用简体中文。
2. 用户选择 English 时，最终结果必须使用英文。
3. 不要因为平台名称是英文而自动切换语言。
4. 不要解释思考过程。
5. 不要告诉用户你做了什么。
6. 直接输出最终 Prompt。
7. 不要输出无关废话。
8. 不要擅自改变用户核心创意。
9. Prompt 必须具体、可执行、有视觉信息。
10. 避免大量空洞形容词。

当前增强模式：

${enhancementInstructions[enhance]}
`

    let userPrompt = ""

    if (type === "video") {
      userPrompt = `
请把下面内容制作成专业的 AI 视频 Prompt。

重点考虑：

【主体】
人物、动物、物体的外观。

【环境】
地点、天气、时间、背景。

【动作】
主体正在做什么，以及动作如何变化。

【镜头】
景别、焦段、机位、构图、镜头运动。

【环境运动】
雨、烟雾、车辆、人群、树叶、灯光等动态。

【灯光】
主光、环境光、轮廓光、色温。

【色彩】
整体色彩和视觉风格。

【氛围】
情绪、故事感、空间感。

【视频质感】
真实摄影机、景深、运动模糊、胶片颗粒等。

如果适合，请设计清晰的开始、中间和结束。

用户创意：

${idea.trim()}
`
    } else {
      userPrompt = `
请把下面内容制作成专业的 AI 图片 Prompt。

重点考虑：

【主体】
人物、动物、产品或物体。

【环境】
地点、时间、天气、背景。

【构图】
主体位置、前景、中景、背景。

【摄影】
摄影机、镜头焦段、视角、景深。

【灯光】
光源方向、光质、色温、明暗关系。

【色彩】
主色调、辅助色、色彩关系。

【材质】
皮肤、衣物、建筑、金属、玻璃等。

【氛围】
情绪和视觉叙事。

【画质】
真实摄影质感、细节、景深、胶片颗粒。

用户创意：

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

          max_tokens: 3000,
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
      enhance,
    })
  } catch (error) {
    console.error(
      "PromptX Generate Error:",
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
