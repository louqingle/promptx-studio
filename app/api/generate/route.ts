import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string" || !idea.trim()) {
      return NextResponse.json(
        { error: "请输入你的创意" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "服务器尚未配置 AI API Key" },
        { status: 500 }
      );
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
              content:
                "你是世界顶级AI Prompt工程师。根据用户创意，生成适用于 Midjourney、Flux、可灵AI、即梦AI 等平台的专业电影级视觉 Prompt。输出要具体、可直接复制使用，包含主体、环境、构图、镜头、光线、色彩、材质、氛围和画质等关键细节。不要解释过程。",
            },
            {
              role: "user",
              content: `请把下面的创意优化成一个电影级 AI 图片 Prompt：

${idea.trim()}`,
            },
          ],
          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "AI API 请求失败" },
        { status: response.status }
      );
    }

    const result = data?.choices?.[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "AI 没有返回有效结果" },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "服务器处理请求失败" },
      { status: 500 }
    );
  }
}
