export default function Home() {
  const models = [
    "OpenAI Sora",
    "Runway Gen-4",
    "可灵AI",
    "即梦AI",
    "Midjourney",
    "Flux",
  ];

  const features = [
    {
      icon: "🎬",
      title: "AI电影导演",
      desc: "一句话生成剧情、分镜、运镜和完整视频方案",
    },
    {
      icon: "🎨",
      title: "AI视觉设计",
      desc: "生成商业图片、海报、角色和视觉作品",
    },
    {
      icon: "🎙",
      title: "AI声音系统",
      desc: "多语言真实配音，打造电影级声音",
    },
    {
      icon: "⚡",
      title: "Prompt智能引擎",
      desc: "自动优化提示词，释放AI创造力",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81,transparent_40%)]" />

      <div className="relative z-10">

        {/* 导航 */}
        <header className="flex justify-between items-center px-8 py-8">
          <div className="text-3xl font-bold">
            🚀 PromptX Studio
          </div>

          <button className="rounded-full bg-white text-black px-8 py-3 font-bold">
            登录
          </button>
        </header>


        {/* Hero */}
        <section className="text-center px-6 pt-20">

          <div className="inline-block border border-white/20 rounded-full px-8 py-3">
            AI Creative Engine
          </div>


          <h1 className="mt-10 text-6xl md:text-8xl font-black leading-tight">
            用 AI 创造
            <br/>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              电影级视觉内容
            </span>
          </h1>


          <p className="mt-8 text-xl text-gray-400">
            一句话生成 AI 视频、图片、脚本、分镜和专业 Prompt
          </p>


          <div className="mt-12 flex justify-center gap-5">

            <button className="bg-white text-black px-10 py-5 rounded-full text-xl font-bold">
              开始创作
            </button>

            <button className="border border-white/30 px-10 py-5 rounded-full text-xl">
              AI导演模式
            </button>

          </div>

        </section>



        {/* 数据 */}
        <section className="grid md:grid-cols-3 gap-8 px-10 mt-32 text-center">

          <div>
            <h2 className="text-5xl font-bold">100+</h2>
            <p className="text-gray-400 mt-3">
              电影模板
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">10+</h2>
            <p className="text-gray-400 mt-3">
              AI模型
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">4K</h2>
            <p className="text-gray-400 mt-3">
              高清输出
            </p>
          </div>

        </section>



        {/* 功能 */}
        <section className="px-10 mt-32">

          <h2 className="text-5xl font-black text-center">
            核心能力
          </h2>


          <div className="grid md:grid-cols-4 gap-6 mt-12">

            {features.map((item)=>(
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="text-5xl">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-400 mt-4">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </section>



        {/* 模型 */}
        <section className="px-10 mt-32 text-center">

          <h2 className="text-5xl font-bold">
            支持模型
          </h2>


          <div className="flex flex-wrap justify-center gap-5 mt-10">

            {models.map(model=>(
              <span
                key={model}
                className="border border-white/20 rounded-full px-8 py-3"
              >
                {model}
              </span>
            ))}

          </div>

        </section>



        <footer className="text-center text-gray-500 py-20 mt-20">
          © 2026 PromptX Studio
        </footer>


      </div>

    </main>
  );
}
