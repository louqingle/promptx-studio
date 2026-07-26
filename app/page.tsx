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
    ["🎬", "电影级视频", "一句话生成完整AI影片"],
    ["🤖", "AI导演模式", "自动分镜、运镜、剧情"],
    ["🎙️", "智能配音", "多语言真实声音"],
    ["✨", "4K高清输出", "专业影视级画质"],
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* 背景光效 */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#1e40af33,transparent_40%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* 顶部 */}
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            🚀 PromptX Studio
          </h1>

          <button className="px-5 py-2 rounded-full bg-white text-black">
            登录
          </button>
        </nav>


        {/* Hero */}
        <section className="text-center mt-24">

          <div className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/5">
            AI Creative Studio
          </div>


          <h2 className="text-6xl font-black mt-8 leading-tight">
            让 AI 帮你创造
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              电影级内容
            </span>
          </h2>


          <p className="text-xl text-gray-400 mt-8">
            一句话生成 AI 视频、图片、脚本、分镜和专业 Prompt
          </p>


          <div className="flex justify-center gap-5 mt-10">

            <button className="px-8 py-4 rounded-full bg-white text-black text-lg font-bold">
              开始创作
            </button>

            <button className="px-8 py-4 rounded-full border border-white/30">
              AI 导演模式
            </button>

          </div>

        </section>



        {/* 数据 */}
        <section className="grid grid-cols-3 gap-6 mt-32">

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="text-gray-400 mt-3">
              电影模板
            </p>
          </div>


          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="text-gray-400 mt-3">
              AI模型
            </p>
          </div>


          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-4xl font-bold">4K</h3>
            <p className="text-gray-400 mt-3">
              高清输出
            </p>
          </div>

        </section>



        {/* 功能 */}
        <section className="mt-32">

          <h2 className="text-4xl font-bold">
            核心能力
          </h2>


          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {features.map((item,index)=>(
              <div
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >

                <div className="text-4xl">
                  {item[0]}
                </div>

                <h3 className="text-2xl font-bold mt-5">
                  {item[1]}
                </h3>

                <p className="text-gray-400 mt-3">
                  {item[2]}
                </p>

              </div>
            ))}

          </div>

        </section>



        {/* 模型 */}
        <section className="mt-32">

          <h2 className="text-4xl font-bold">
            支持模型
          </h2>

          <div className="flex flex-wrap gap-4 mt-8">

          {models.map((m)=>(
            <div
            key={m}
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20"
            >
              {m}
            </div>
          ))}

          </div>

        </section>



        {/* Footer */}
        <footer className="mt-40 text-center text-gray-500">
          © 2026 PromptX Studio
        </footer>


      </div>

    </main>
  );
}
