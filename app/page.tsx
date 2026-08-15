"use client"

import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState<"image" | "video">("image")
  const [language, setLanguage] = useState<"zh" | "en">("zh")

  async function generatePrompt() {
    if (!idea.trim()) {
      alert(language === "zh" ? "请输入你的创意" : "Please enter your idea")
      return
    }

    setLoading(true)
    setResult("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: idea.trim(),
          type,
          language,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "生成失败")
      }

      setResult(data.result || "")
    } catch (error) {
      alert(error instanceof Error ? error.message : "生成失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }

  const tools = [
    {
      icon: "🎬",
      title: "AI视频导演",
      desc: "自动生成电影分镜和视频 Prompt",
    },
    {
      icon: "🎨",
      title: "AI图片创作",
      desc: "生成角色、场景、商业视觉 Prompt",
    },
    {
      icon: "📝",
      title: "AI剧本助手",
      desc: "创造人物、剧情和对白",
    },
    {
      icon: "🎙️",
      title: "AI声音工作室",
      desc: "智能配音和声音设计",
    },
  ]

  const models = [
    "Sora",
    "Runway",
    "可灵AI",
    "即梦AI",
    "Midjourney",
    "Flux",
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <nav className="flex items-center justify-between py-8">
          <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
            🚀 PromptX Studio
          </h1>

          <button className="rounded-full bg-white px-6 py-3 font-bold text-black">
            登录
          </button>
        </nav>

        <section className="pt-20 text-center">
          <div className="inline-block rounded-full border border-white/20 bg-white/5 px-6 py-3">
            ✨ AI Creative Platform
          </div>

          <h2 className="mt-10 text-5xl font-black leading-tight md:text-8xl">
            你的想法
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              一键变成AI作品
            </span>
          </h2>

          <p className="mt-8 text-xl text-gray-400">
            AI视频 · AI图片 · 专业 Prompt
            <br />
            从一句话到电影级创作
          </p>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-5">
            {/* 创作类型 */}
            <div className="mb-4 flex gap-3">
              <button
                onClick={() => setType("image")}
                className={`flex-1 rounded-2xl py-3 font-bold transition ${
                  type === "image"
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                🎨 图片 Prompt
              </button>

              <button
                onClick={() => setType("video")}
                className={`flex-1 rounded-2xl py-3 font-bold transition ${
                  type === "video"
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                🎬 视频 Prompt
              </button>
            </div>

            {/* 输出语言 */}
            <div className="mb-4 flex justify-end gap-2">
              <button
                onClick={() => setLanguage("zh")}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  language === "zh"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                中文
              </button>

              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  language === "en"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                English
              </button>
            </div>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={
                language === "zh"
                  ? type === "image"
                    ? "描述你的图片创意...\n\n例如：一个外卖员凌晨三点骑车穿越未来城市，电影级摄影，雨夜"
                    : "描述你的视频创意...\n\n例如：凌晨三点，外卖员骑车穿过暴雨中的未来城市，镜头跟随他前进"
                  : type === "image"
                    ? "Describe your image idea..."
                    : "Describe your video idea..."
              }
              className="h-44 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-6 text-lg text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
            />

            <button
              onClick={generatePrompt}
              disabled={loading}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 py-4 text-lg font-bold shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? language === "zh"
                  ? "正在生成..."
                  : "Generating..."
                : language === "zh"
                  ? type === "image"
                    ? "🎨 生成图片 Prompt"
                    : "🎬 生成视频 Prompt"
                  : type === "image"
                    ? "🎨 Generate Image Prompt"
                    : "🎬 Generate Video Prompt"}
            </button>

            {/* 生成结果 */}
            {result && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    {language === "zh" ? "生成结果" : "Generated Prompt"}
                  </h3>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result)
                      alert(language === "zh" ? "复制成功" : "Copied")
                    }}
                    className="rounded-full bg-white px-5 py-2 font-bold text-black"
                  >
                    📋 {language === "zh" ? "复制" : "Copy"}
                  </button>
                </div>

                <div className="whitespace-pre-line leading-8 text-gray-200">
                  {result}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AI工作流 */}
        <section className="mt-32">
          <h2 className="text-center text-4xl font-black">
            AI 创作工作流
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="text-5xl">{tool.icon}</div>

                <h3 className="mt-5 text-xl font-bold">
                  {tool.title}
                </h3>

                <p className="mt-3 text-gray-400">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 模型生态 */}
        <section className="mt-32">
          <h2 className="text-center text-4xl font-black">
            全球 AI 模型生态
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {models.map((model) => (
              <div
                key={model}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3"
              >
                {model}
              </div>
            ))}
          </div>
        </section>

        {/* 会员 */}
        <section className="mt-32 pb-20">
          <h2 className="text-center text-4xl font-black">
            选择你的创作计划
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-5 text-5xl font-black">¥0</p>
              <p className="mt-5 text-gray-400">基础 AI 体验</p>
            </div>

            <div className="rounded-3xl border border-purple-500/50 bg-purple-500/10 p-8">
              <h3 className="text-2xl font-bold">Creator</h3>
              <p className="mt-5 text-5xl font-black">¥39</p>
              <p className="mt-5 text-gray-400">短视频创作者</p>

              <button className="mt-6 w-full rounded-full bg-white py-3 font-bold text-black">
                开通
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="mt-5 text-5xl font-black">¥99</p>
              <p className="mt-5 text-gray-400">专业工作流</p>
            </div>
          </div>
        </section>

        <footer className="pb-10 text-center text-gray-500">
          © 2026 PromptX Studio
        </footer>
      </div>
    </main>
  )
}
