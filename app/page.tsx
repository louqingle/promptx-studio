"use client"
import Auth from "../components/Auth"
import { supabase } from "../lib/supabase"
import{ useEffect, useState } from "react"

type PromptType = "image" | "video"
type Language = "zh" | "en"

type EnhanceType =
  | "optimize"
  | "realistic"
  | "cinematic"
  | "commercial"
  | "character"

type HistoryItem = {
  id: string
  idea: string
  result: string
  type: PromptType
  language: Language
  createdAt: number
  favorite: boolean
}

const DAILY_LIMIT = 5

const templates = [
  {
    icon: "🎬",
    name: "电影感",
    prompt:
      "电影级场景，真实摄影质感，戏剧性构图，电影灯光，丰富环境细节",
  },
  {
    icon: "📷",
    name: "真实摄影",
    prompt:
      "真实摄影风格，自然光线，真实材质，自然皮肤纹理，真实相机拍摄质感",
  },
  {
    icon: "👤",
    name: "人像写真",
    prompt:
      "高级人像摄影，真实人物细节，自然皮肤纹理，专业人像灯光，浅景深",
  },
  {
    icon: "💎",
    name: "商业广告",
    prompt:
      "高级商业广告摄影，产品视觉中心，干净背景，专业布光，高端品牌质感",
  },
  {
    icon: "🌧️",
    name: "雨夜电影",
    prompt:
      "午夜城市暴雨，湿润路面反射霓虹，雨幕，体积雾，冷暖对比电影灯光",
  },
  {
    icon: "🌃",
    name: "赛博朋克",
    prompt:
      "未来赛博朋克城市，霓虹灯，湿润街道，高密度城市建筑，科技感",
  },
  {
    icon: "🚗",
    name: "汽车广告",
    prompt:
      "高级汽车商业广告，汽车主体突出，电影级灯光，反射细节，高级品牌视觉",
  },
  {
    icon: "🍜",
    name: "美食摄影",
    prompt:
      "高级美食摄影，食物细节清晰，自然材质，诱人的灯光，浅景深，商业摄影质感",
  },
  {
    icon: "📱",
    name: "短视频",
    prompt:
      "适合短视频平台的高吸引力画面，主体突出，视觉冲击力强，真实自然",
  },
  {
    icon: "🏠",
    name: "房地产",
    prompt:
      "高级房地产摄影，空间宽敞明亮，真实建筑材质，自然光，高端商业视觉",
  },
  {
    icon: "👟",
    name: "电商产品",
    prompt:
      "高级电商产品摄影，产品主体突出，干净背景，专业布光，真实材质",
  },
  {
    icon: "🕵️",
    name: "悬疑氛围",
    prompt:
      "悬疑电影氛围，低照度环境，强烈明暗对比，神秘感，压迫感，电影级摄影",
  },
]

export default function Home() {
  const [user,setUser] = useState<any>(null)
const [showAuth,setShowAuth] = useState(false)

useEffect(()=>{

  supabase.auth.getUser()
  .then(({data})=>{
    setUser(data.user)
  })

},[])
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState<PromptType>("image")
  const [language, setLanguage] = useState<Language>("zh")

  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyOpen, setHistoryOpen] = useState(false)

  const [usage, setUsage] = useState(0)
  const [usageDate, setUsageDate] = useState("")

  const [mounted, setMounted] = useState(false)

  // =========================
  // 初始化本地数据
  // =========================

  useEffect(() => {
    setMounted(true)

    try {
      const today = new Date().toISOString().slice(0, 10)

      const savedHistory =
        localStorage.getItem("promptx_history")

      if (savedHistory) {
        const parsed = JSON.parse(savedHistory)

        if (Array.isArray(parsed)) {
          setHistory(parsed)
        }
      }

      const savedUsage =
        localStorage.getItem("promptx_usage")

      const savedUsageDate =
        localStorage.getItem("promptx_usage_date")

      if (savedUsageDate === today) {
        setUsage(Number(savedUsage) || 0)
        setUsageDate(today)
      } else {
        localStorage.setItem(
          "promptx_usage",
          "0"
        )

        localStorage.setItem(
          "promptx_usage_date",
          today
        )

        setUsage(0)
        setUsageDate(today)
      }
    } catch (error) {
      console.error(
        "PromptX localStorage error:",
        error
      )
    }
  }, [])

  // =========================
  // 保存历史
  // =========================

  useEffect(() => {
    if (!mounted) return

    try {
      localStorage.setItem(
        "promptx_history",
        JSON.stringify(history.slice(0, 20))
      )
    } catch (error) {
      console.error(
        "Save history error:",
        error
      )
    }
  }, [history, mounted])

  // =========================
  // 使用次数
  // =========================

  function increaseUsage() {
    const nextUsage = usage + 1

    setUsage(nextUsage)

    localStorage.setItem(
      "promptx_usage",
      String(nextUsage)
    )

    localStorage.setItem(
      "promptx_usage_date",
      usageDate ||
        new Date().toISOString().slice(0, 10)
    )
  }

  // =========================
  // 生成 Prompt
  // =========================

  async function requestPrompt(
    currentIdea: string,
    enhance: EnhanceType = "optimize",
    countUsage = true
  ) {
    if (!currentIdea.trim()) {
      alert(
        language === "zh"
          ? "请输入你的创意"
          : "Please enter your idea"
      )

      return
    }

    // 只有新生成才消耗额度
    if (countUsage && usage >= DAILY_LIMIT) {
      alert(
        language === "zh"
          ? "今天的免费次数已经用完了，明天会自动恢复。"
          : "You have used all free generations for today."
      )

      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            idea: currentIdea.trim(),
            type,
            language,
            enhance,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || "生成失败"
        )
      }

      const newResult =
        data.result || ""

      setResult(newResult)

      if (countUsage) {
        increaseUsage()
      }

      // 只有正式生成才进入历史
      if (countUsage) {
        const newItem: HistoryItem = {
          id:
            Date.now().toString() +
            Math.random()
              .toString(36)
              .slice(2),

          idea: currentIdea.trim(),

          result: newResult,

          type,

          language,

          createdAt: Date.now(),

          favorite: false,
        }

        setHistory((prev) => [
          newItem,
          ...prev,
        ])
      }
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

  // =========================
  // 新生成
  // =========================

  function generatePrompt() {
    setResult("")

    requestPrompt(
      idea,
      "optimize",
      true
    )
  }

  // =========================
  // Prompt 优化
  // 不消耗新额度
  // =========================

  function optimizePrompt() {
    if (!result) return

    requestPrompt(
      result,
      "optimize",
      false
    )
  }

  // =========================
  // Prompt 增强
  // 不消耗新额度
  // =========================

  function enhancePrompt(
    enhance: EnhanceType
  ) {
    if (!result) return

    requestPrompt(
      result,
      enhance,
      false
    )
  }

  // =========================
  // 复制
  // =========================

  async function copyPrompt() {
    if (!result) return

    try {
      await navigator.clipboard.writeText(
        result
      )

      alert(
        language === "zh"
          ? "Prompt 已复制"
          : "Prompt copied"
      )
    } catch {
      alert(
        language === "zh"
          ? "复制失败，请手动复制"
          : "Copy failed"
      )
    }
  }

  // =========================
  // 模板
  // =========================

  function selectTemplate(
    templatePrompt: string
  ) {
    if (idea.trim()) {
      setIdea(
        `${idea.trim()}，${templatePrompt}`
      )
    } else {
      setIdea(templatePrompt)
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // =========================
  // 收藏
  // =========================

  function toggleFavorite(
    id: string
  ) {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              favorite:
                !item.favorite,
            }
          : item
      )
    )
  }

  // =========================
  // 删除历史
  // =========================

  function deleteHistory(
    id: string
  ) {
    setHistory((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    )
  }

  // =========================
  // 重新使用历史
  // =========================

  function reuseHistory(
    item: HistoryItem
  ) {
    setIdea(item.idea)
    setResult(item.result)
    setType(item.type)
    setLanguage(item.language)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    setHistoryOpen(false)
  }

  // =========================
  // 清空历史
  // =========================

  function clearHistory() {
    const confirmed = window.confirm(
      language === "zh"
        ? "确定要清空所有历史记录吗？"
        : "Delete all history?"
    )

    if (!confirmed) return

    setHistory([])
  }

  // =========================
  // 剩余次数
  // =========================

  const remaining =
    Math.max(
      0,
      DAILY_LIMIT - usage
    )

  const favoriteHistory =
    history.filter(
      (item) => item.favorite
    )

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* 背景 */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/50 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-5">

        {/* ========================= */}
        {/* 导航 */}
        {/* ========================= */}

        <nav className="flex items-center justify-between py-7">

          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-2xl font-black text-transparent md:text-3xl">
              🚀 PromptX Studio
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              AI Prompt Creative Studio
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* 剩余次数 */}

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm md:block">
              ⚡ 今日剩余{" "}
              <span className="font-bold text-cyan-400">
                {remaining}
              </span>{" "}
              次
            </div>

            {/* 历史 */}

            <button
              onClick={() =>
                setHistoryOpen(true)
              }
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold transition hover:bg-white/10"
            >
              🕘
              <span className="ml-1 hidden sm:inline">
                历史
              </span>
            </button>

           {user ? (

<div className="text-sm">
  👤 {user.email}
</div>

) : (

<button
onClick={()=>setShowAuth(true)}
className="rounded-full bg-white px-5 py-2.5 font-bold text-black"
>
登录
</button>

)}

          </div>

        </nav>

        {/* ========================= */}
        {/* 移动端额度 */}
        {/* ========================= */}

        <div className="mb-2 flex justify-center md:hidden">

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            ⚡ 今日剩余{" "}
            <span className="font-bold text-cyan-400">
              {remaining}
            </span>{" "}
            次
          </div>

        </div>

        {/* ========================= */}
        {/* Hero */}
        {/* ========================= */}

        <section className="pt-12 text-center md:pt-20">

          <div className="inline-flex items-center rounded-full border border-purple-400/20 bg-purple-500/10 px-5 py-2 text-sm text-purple-200">
            ✨ PromptX Studio 3.0
          </div>

          <h2 className="mt-8 text-5xl font-black leading-tight md:text-8xl">

            一句话
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              变成专业 Prompt
            </span>

          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
            图片 · 视频 · 电影感 · 商业广告 · 真实摄影
            <br />
            AI 创作者的一站式 Prompt 工作台
          </p>

          {/* ========================= */}
          {/* 核心生成器 */}
          {/* ========================= */}

          <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl md:p-6">

            {/* 图片 / 视频 */}

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  setType("image")
                }
                className={`rounded-2xl py-4 font-bold transition ${
                  type === "image"
                    ? "bg-white text-black shadow-xl"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                🎨 图片 Prompt
              </button>

              <button
                onClick={() =>
                  setType("video")
                }
                className={`rounded-2xl py-4 font-bold transition ${
                  type === "video"
                    ? "bg-white text-black shadow-xl"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                🎬 视频 Prompt
              </button>

            </div>

            {/* 中文 / 英文 */}

            <div className="mt-4 flex justify-end gap-2">

              <button
                onClick={() =>
                  setLanguage("zh")
                }
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  language === "zh"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                中文
              </button>

              <button
                onClick={() =>
                  setLanguage("en")
                }
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  language === "en"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                English
              </button>

            </div>

            {/* 输入 */}

            <textarea
              value={idea}
              onChange={(e) =>
                setIdea(e.target.value)
              }
              placeholder={
                language === "zh"
                  ? type === "image"
                    ? "描述你想创作的画面...\n\n例如：一个22岁的外卖员凌晨三点骑车穿过暴雨中的城市"
                    : "描述你想创作的视频...\n\n例如：凌晨三点，外卖员骑车穿过暴雨中的城市，镜头跟随他前进"
                  : type === "image"
                    ? "Describe the image you want to create..."
                    : "Describe the video you want to create..."
              }
              className="mt-5 h-48 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-base leading-7 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 md:text-lg"
            />

            {/* 生成 */}

            <button
              onClick={generatePrompt}
              disabled={
                loading ||
                remaining <= 0
              }
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 py-4 text-lg font-black shadow-xl transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "AI 正在创作..."
                : remaining <= 0
                  ? "今日免费次数已用完"
                  : type === "image"
                    ? "🎨 生成图片 Prompt"
                    : "🎬 生成视频 Prompt"}
            </button>

            {/* ========================= */}
            {/* 结果 */}
            {/* ========================= */}

            {result && (

              <div className="mt-6 rounded-3xl border border-white/10 bg-black/50 p-5 text-left md:p-7">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div>

                    <div className="text-xl font-black">
                      ✨ Prompt
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      {type === "image"
                        ? "Image Prompt"
                        : "Video Prompt"}
                    </div>

                  </div>

                  <button
                    onClick={copyPrompt}
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-gray-200"
                  >
                    📋{" "}
                    {language === "zh"
                      ? "复制"
                      : "Copy"}
                  </button>

                </div>

                {/* Prompt */}

                <div className="mt-6 whitespace-pre-line rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-gray-200 md:p-6">
                  {result}
                </div>

                {/* 增强 */}

                <div className="mt-5">

                  <div className="mb-3 text-sm font-bold text-gray-400">
                    ✨ Prompt 增强
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:grid-cols-5">

                    <button
                      onClick={() =>
                        optimizePrompt()
                      }
                      disabled={loading}
                      className="rounded-xl bg-purple-500/20 px-3 py-3 text-sm font-bold text-purple-200 hover:bg-purple-500/30 disabled:opacity-50"
                    >
                      ✨ 一键优化
                    </button>

                    <button
                      onClick={() =>
                        enhancePrompt(
                          "realistic"
                        )
                      }
                      disabled={loading}
                      className="rounded-xl bg-cyan-500/10 px-3 py-3 text-sm font-bold text-cyan-200 hover:bg-cyan-500/20 disabled:opacity-50"
                    >
                      📷 更真实
                    </button>

                    <button
                      onClick={() =>
                        enhancePrompt(
                          "cinematic"
                        )
                      }
                      disabled={loading}
                      className="rounded-xl bg-blue-500/10 px-3 py-3 text-sm font-bold text-blue-200 hover:bg-blue-500/20 disabled:opacity-50"
                    >
                      🎬 更电影
                    </button>

                    <button
                      onClick={() =>
                        enhancePrompt(
                          "commercial"
                        )
                      }
                      disabled={loading}
                      className="rounded-xl bg-pink-500/10 px-3 py-3 text-sm font-bold text-pink-200 hover:bg-pink-500/20 disabled:opacity-50"
                    >
                      💎 商业感
                    </button>

                    <button
                      onClick={() =>
                        enhancePrompt(
                          "character"
                        )
                      }
                      disabled={loading}
                      className="rounded-xl bg-orange-500/10 px-3 py-3 text-sm font-bold text-orange-200 hover:bg-orange-500/20 disabled:opacity-50"
                    >
                      👤 人物细节
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>
        </section>

        {/* ========================= */}
        {/* 模板中心 */}
        {/* ========================= */}

        <section className="mt-28">

          <div className="text-center">

            <div className="text-sm font-bold text-purple-400">
              TEMPLATE LIBRARY
            </div>

            <h2 className="mt-2 text-4xl font-black">
              🔥 Prompt 模板中心
            </h2>

            <p className="mt-3 text-gray-500">
              不知道怎么写？选择一个方向直接开始。
            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            {templates.map(
              (template) => (

                <button
                  key={template.name}
                  onClick={() =>
                    selectTemplate(
                      template.prompt
                    )
                  }
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white/[0.08]"
                >

                  <div className="text-4xl">
                    {template.icon}
                  </div>

                  <div className="mt-5 text-lg font-black">
                    {template.name}
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {template.prompt}
                  </p>

                  <div className="mt-5 text-sm font-bold text-purple-400">
                    使用模板 →
                  </div>

                </button>

              )
            )}

          </div>

        </section>

        {/* ========================= */}
        {/* 增强能力 */}
        {/* ========================= */}

        <section className="mt-28">

          <div className="text-center">

            <div className="text-sm font-bold text-purple-400">
              PROMPT ENHANCER
            </div>

            <h2 className="mt-2 text-4xl font-black">
              一个 Prompt，五种增强
            </h2>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-5">

            {[
              [
                "✨",
                "一键优化",
                "全面提升 Prompt",
              ],
              [
                "📷",
                "更真实",
                "增强真实摄影感",
              ],
              [
                "🎬",
                "更电影",
                "强化电影视觉",
              ],
              [
                "💎",
                "商业感",
                "打造广告级画面",
              ],
              [
                "👤",
                "人物细节",
                "增强人物真实度",
              ],
            ].map(
              ([icon, title, desc]) => (

                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center"
                >

                  <div className="text-4xl">
                    {icon}
                  </div>

                  <h3 className="mt-4 font-black">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {desc}
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* ========================= */}
        {/* 工作流 */}
        {/* ========================= */}

        <section className="mt-28">

          <h2 className="text-center text-4xl font-black">
            AI 创作工作流
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-4">

            {[
              [
                "🎬",
                "AI 视频导演",
                "电影级视频 Prompt",
              ],
              [
                "🎨",
                "AI 图片创作",
                "专业视觉 Prompt",
              ],
              [
                "📝",
                "AI 剧本助手",
                "人物、剧情和对白",
              ],
              [
                "🎙️",
                "AI 声音工作室",
                "智能声音设计",
              ],
            ].map(
              ([icon, title, desc]) => (

                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                >

                  <div className="text-5xl">
                    {icon}
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    {title}
                  </h3>

                  <p className="mt-3 text-gray-500">
                    {desc}
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* ========================= */}
        {/* 收藏预览 */}
        {/* ========================= */}

        {favoriteHistory.length > 0 && (

          <section className="mt-28">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-sm font-bold text-yellow-400">
                  MY FAVORITES
                </div>

                <h2 className="mt-2 text-3xl font-black">
                  ⭐ 我的收藏
                </h2>

              </div>

              <button
                onClick={() =>
                  setHistoryOpen(true)
                }
                className="text-sm font-bold text-gray-400 hover:text-white"
              >
                查看全部 →
              </button>

            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">

              {favoriteHistory
                .slice(0, 3)
                .map((item) => (

                  <button
                    key={item.id}
                    onClick={() =>
                      reuseHistory(item)
                    }
                    className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6 text-left transition hover:bg-yellow-500/10"
                  >

                    <div className="text-xs text-gray-500">
                      {item.type === "image"
                        ? "🎨 图片"
                        : "🎬 视频"}
                    </div>

                    <div className="mt-3 line-clamp-2 font-bold">
                      {item.idea}
                    </div>

                    <div className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                      {item.result}
                    </div>

                  </button>

                ))}

            </div>

          </section>

        )}

        {/* ========================= */}
        {/* 模型 */}
        {/* ========================= */}

        <section className="mt-28">

          <h2 className="text-center text-4xl font-black">
            全球 AI 模型生态
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {[
              "Sora",
              "Runway",
              "可灵AI",
              "即梦AI",
              "Midjourney",
              "Flux",
            ].map(
              (model) => (

                <div
                  key={model}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-gray-300"
                >
                  {model}
                </div>

              )
            )}

          </div>

        </section>

        {/* ========================= */}
        {/* 价格 */}
        {/* ========================= */}

        <section className="mt-28 pb-20">

          <h2 className="text-center text-4xl font-black">
            选择你的创作计划
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

              <h3 className="text-2xl font-black">
                Free
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥0
              </p>

              <p className="mt-4 text-gray-500">
                每日 5 次 AI Prompt
              </p>

              <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-gray-500">
                当前剩余：
                <span className="ml-1 font-bold text-cyan-400">
                  {remaining}
                </span>
                次
              </div>

            </div>

            <div className="rounded-3xl border border-purple-500/50 bg-purple-500/10 p-8">

              <div className="text-sm font-bold text-purple-300">
                ⭐ 推荐
              </div>

              <h3 className="mt-2 text-2xl font-black">
                Creator
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥39
              </p>

              <p className="mt-4 text-gray-400">
                适合短视频创作者
              </p>

              <button
                onClick={() =>
                  alert(
                    "会员系统将在后续版本开放"
                  )
                }
                className="mt-6 w-full rounded-full bg-white py-3 font-bold text-black transition hover:bg-gray-200"
              >
                开通 Creator
              </button>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

              <h3 className="text-2xl font-black">
                Pro
              </h3>

              <p className="mt-5 text-5xl font-black">
                ¥99
              </p>

              <p className="mt-4 text-gray-500">
                专业 AI 创作工作流
              </p>

              <button
                onClick={() =>
                  alert(
                    "会员系统将在后续版本开放"
                  )
                }
                className="mt-6 w-full rounded-full border border-white/10 bg-white/5 py-3 font-bold"
              >
                即将开放
              </button>

            </div>

          </div>

        </section>

        {/* ========================= */}
        {/* Footer */}
        {/* ========================= */}

        <footer className="pb-10 text-center text-gray-600">
          © 2026 PromptX Studio
        </footer>

      </div>

      {/* ========================= */}
      {/* 历史记录侧边栏 / 弹窗 */}
      {/* ========================= */}

      {historyOpen && (

        <div className="fixed inset-0 z-50">

          {/* 遮罩 */}

          <button
            aria-label="关闭历史记录"
            onClick={() =>
              setHistoryOpen(false)
            }
            className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
          />

          {/* 面板 */}

          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#09090b] p-5 shadow-2xl md:p-7">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-sm font-bold text-purple-400">
                  PROMPT HISTORY
                </div>

                <h2 className="mt-1 text-2xl font-black">
                  🕘 历史记录
                </h2>

              </div>

              <button
                onClick={() =>
                  setHistoryOpen(false)
                }
                className="rounded-full bg-white/10 px-4 py-2 text-xl"
              >
                ×
              </button>

            </div>

            {/* 统计 */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                <div className="text-sm text-gray-500">
                  全部
                </div>

                <div className="mt-1 text-2xl font-black">
                  {history.length}
                </div>

              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">

                <div className="text-sm text-gray-500">
                  收藏
                </div>

                <div className="mt-1 text-2xl font-black text-yellow-400">
                  {favoriteHistory.length}
                </div>

              </div>

            </div>

            {/* 操作 */}

            {history.length > 0 && (

              <div className="mt-5 flex justify-end">

                <button
                  onClick={clearHistory}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  🗑️ 清空历史
                </button>

              </div>

            )}

            {/* 列表 */}

            <div className="mt-5 space-y-3">

              {history.length === 0 ? (

                <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">

                  <div className="text-5xl">
                    📝
                  </div>

                  <h3 className="mt-5 font-bold">
                    暂无历史记录
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    生成你的第一个 Prompt 后，它会出现在这里。
                  </p>

                </div>

              ) : (

                history.map((item) => (

                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2 text-xs text-gray-500">

                          <span>
                            {item.type === "image"
                              ? "🎨 图片"
                              : "🎬 视频"}
                          </span>

                          <span>
                            ·
                          </span>

                          <span>
                            {item.language === "zh"
                              ? "中文"
                              : "English"}
                          </span>

                        </div>

                        <div className="mt-2 line-clamp-2 font-bold">
                          {item.idea}
                        </div>

                      </div>

                      <button
                        onClick={() =>
                          toggleFavorite(
                            item.id
                          )
                        }
                        className="shrink-0 text-xl"
                      >
                        {item.favorite
                          ? "⭐"
                          : "☆"}
                      </button>

                    </div>

                    <div className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-500">
                      {item.result}
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <button
                        onClick={() =>
                          reuseHistory(item)
                        }
                        className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
                      >
                        使用
                      </button>

                      <button
                        onClick={() =>
                          deleteHistory(
                            item.id
                          )
                        }
                        className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400"
                      >
                        删除
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </aside>

        </div>

      )}

    </main>
  )
}
{showAuth && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

<div className="w-full max-w-md rounded-3xl bg-[#111] p-6">

<button
onClick={()=>setShowAuth(false)}
className="float-right text-xl"
>
×
</button>

<Auth/>

</div>

</div>

)}
