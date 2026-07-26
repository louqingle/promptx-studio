import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { prompt } = await req.json();


  const result = `
🎬 视频 Prompt：

${prompt}

电影级画面，真实摄影，
IMAX镜头语言，8K HDR，
专业电影灯光。


🖼 图片 Prompt：

${prompt},
ultra realistic,
cinematic lighting,
8K,
high detail.


📝 剧本：

镜头一：
建立场景，展示环境。

镜头二：
人物进入画面。

镜头三：
高潮镜头，电影级运镜。
`;


  return NextResponse.json({
    result
  });

}
