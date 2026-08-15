"use client"

import { useState } from "react"

type PromptType = "image" | "video"
type Language = "zh" | "en"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState<PromptType>("image")
  const [language, setLanguage] = useState<Language>("zh")

  async function generatePrompt() {
    if (!idea.trim()) {
      alert(
        language === "zh"
          ? "请输入你的创意"
          : "Please enter your idea"
      )
      return
    }

    setLoading(true)
    setResult("")

    try {
      const response = await fetch("/api/generate", {
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "生成失败")
      }

      setResult(data.result || "")
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "生成失败，请稍后重试"
      )
    } finally {
      setLoading(false)
    }
  }

  async function optimizePrompt() {
    if (!result.trim()) return

    setLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: result,
          type,
          language,
          optimize: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "优化失败")
      }

      setResult(data.result || "")
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "优化失败，请稍后重试"
      )
    } finally {
      setLoading(false)
    }
  }

  function copyPrompt() {
    if (!result) return

    navigator.clipboard.writeText(result)

    alert(
      language === "zh"
        ? "Prompt 已复制"
        : "Prompt copied"
    )
  }

  const tools = [
    {
      icon: "🎬",
      title: "AI 视频导演",
      desc: "自动生成电影级视频 Prompt",
    },
    {
      icon: "🎨",
      title: "AI 图片创作",
      desc: "生成专业视觉 Prompt",
    },
    {
      icon: "📝",
      title: "AI 剧本助手",
      desc: "创造人物、剧情和对白",
    },
    {
      icon: "🎙️",
      title: "AI 声音工作室",
      desc: "智能配音和声音设计",
    },
  ]

  const templates = [
    "🎬 电影感",
    "📷 真实摄影",
    "💎 商业广告",
    "👤 人像写真",
    "🌃 赛博朋克",
    "🌧️ 雨夜氛围",
    "🍜 美食摄影",
    "🚗 汽车广告",
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

      <div className="relative z-10 mx-auto max-w-6xl px-5">

        {/* 导航 */}
        <nav className="flex items-center justify-between py-7">
          <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-2xl font-black text-transparent md:text-3xl">
            🚀 PromptX Studio
          </h1>

          <button className="rounded-full bg-white px-5 py-2.5 font-bold text-black">
            登录
          </button>
        </nav>

        {/* Hero */}
        <section className="pt-16 text-center md:pt-24">

          <div className="inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm">
            ✨ AI Creative Platform
          </div>

          <h2 className="mt-8 text-5xl font-black leading-tight md:text-8xl">
            你的想法
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              一键变成 AI 作品
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg text-gray-400 md:text-xl">
            AI 图片 · AI 视频 · 专业 Prompt
            <br />
            从一句话开始你的创作
          </p>

          {/* 生成器 */}
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:p-6">

            {/* 类型 */}
            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() => setType("image")}
                className={`rounded-2xl py-3 font-bold transition ${
                  type === "image"
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                🎨 图片 Prompt
              </button>

              <button
                onClick={() => setType("video")}
                className={`rounded-2xl py-3 font-bold transition ${
                  type === "video"
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                🎬 视频 Prompt
              </button>

            </div>

            {/* 语言 */}
            <div className="mt-4 flex justify-end gap-2">

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

            {/* 模板 */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {templates.map((template) => (
                <button
                  key={template}
                  onClick={() => {
                    setIdea(
                      `${template.replace(
                        /^.+? /,
                        ""
                      )}，`
                    )
                  }}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  {template}
                </button>
              ))}
            </div>

            {/* 输入 */}
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={
                language === "zh"
                  ? type === "image"
                    ? "描述你的图片创意...\n\n例如：一个外卖员凌晨三点骑车穿越暴雨中的城市，电影级摄影"
                    : "描述你的视频创意...\n\n例如：凌晨三点，外卖员骑车穿过暴雨中的城市，镜头跟随他前进"
                  : type === "image"
                    ? "Describe your image idea..."
                    : "Describe your video idea..."
              }
              className="mt-3 h-44 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 md:text-lg"
            />

            {/* 生成 */}
            <button
              onClick={generatePrompt}
              disabled={loading}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 py-4 text-lg font-bold shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
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

            {/* 结果 */}
            {result && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5 text-left">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <h3 className="text-lg font-bold">
                    {language === "zh"
                      ? "✨ 生成结果"
                      : "✨ Generated Prompt"}
                  </h3>

                  <div className="flex gap-2">

                    <button
                      onClick={optimizePrompt}
                      disabled={loading}
                      className="rounded-full bg-purple-500 px-4 py-2 text-sm font-bold"
                    >
                      ✨ {language === "zh" ? "一键优化" : "Optimize"}
                    </button>

                    <button
                      onClick={copyPrompt}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
                    >
                      📋 {language === "zh" ? "复制" : "Copy"}
                    </button>

                  </div>

                </div>

                <div className="mt-5 whitespace-pre-line leading-8 text-gray-200">
                  {result}
                </div>

              </div>
            )}

          </div>
        </section>

        {/* 模板 */}
        <section className="mt-28">

          <h2 className="text-center text-4xl font-black">
            Prompt 模板
          </h2>

          <p className="mt-4 text-center text-gray-400">
            不知道怎么写？直接选择一个方向
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            {templates.map((template) => (
              <button
                key={template}
                onClick={() =>
                  setIdea(
                    `${template.replace(
                      /^.+? /,
                      ""
                    )}风格，一个主体，电影级画面`
                  )
                }
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-purple-500/50 hover:bg-white/10"
              >
                <div className="text-lg font-bold">
                  {template}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  点击开始创作
                </div>
              </button>
            ))}

          </div>
        </section>

        {/* AI工作流 */}
        <section className="mt-28">

          <h2 className="text-center text-4xl font-black">
            AI 创作工作流
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-4">

            {tools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >
                <div className="text-5xl">
                  {tool.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {tool.title}
                </h3>

                <p className="mt-3 text-gray-400">
                  {tool.desc}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* 模型 */}
        <section className="mt-28">

          <h2 className="text-center text-4xl font-black">
            全球 AI 模型生态
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {models.map((model) => (
              <div
                key={model}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm"
              >
                {model}
              </div>
            ))}

          </div>

        </section>

        {/* 价格 */}
        <section className="mt-28 pb-20">

          <h2 className="text-center text-4xl font-black">
            选择你的创作计划
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-2xl font-bold">
                Free
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥0
              </p>

              <p className="mt-4 text-gray-400">
                基础 AI 体验
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/50 bg-purple-500/10 p-7">

              <div className="mb-2 text-sm font-bold text-purple-300">
                推荐
              </div>

              <h3 className="text-2xl font-bold">
                Creator
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥39
              </p>

              <p className="mt-4 text-gray-400">
                适合短视频创作者
              </p>

              <button className="mt-6 w-full rounded-full bg-white py-3 font-bold text-black">
                开通 Creator
              </button>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

              <h3 className="text-2xl font-bold">
                Pro
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥99
              </p>

              <p className="mt-4 text-gray-400">
                专业创作者工作流
              </p>

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
