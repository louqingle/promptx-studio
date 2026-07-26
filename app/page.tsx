export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/20" />

      {/* 导航 */}
      <nav className="relative flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          🚀 PromptX Studio
        </h1>

        <button className="px-5 py-2 rounded-full bg-white/10 border border-white/20">
          登录
        </button>
      </nav>


      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20">

        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          一句话
          <br />

          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            生成电影级 AI 视频
          </span>
        </h2>


        <p className="mt-6 text-gray-400 text-lg max-w-xl">
          输入你的想法，让AI自动生成视频、分镜、配音和字幕。
        </p>


        {/* 输入框 */}
        <div className="mt-10 w-full max-w-3xl">

          <div className="
          bg-white/10 
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-5
          ">

            <textarea
              placeholder="例如：一个外卖员深夜穿越城市，雨夜霓虹灯，电影镜头..."
              className="
              w-full
              h-32
              bg-transparent
              outline-none
              resize-none
              text-white
              placeholder-gray-500
              "
            />


            <button
            className="
            mt-4
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            text-lg
            font-bold
            hover:scale-105
            transition
            ">
              🎬 开始生成视频
            </button>


          </div>

        </div>


        {/* 数据 */}
        <div className="grid grid-cols-3 gap-8 mt-20">

          <div>
            <h3 className="text-3xl font-bold">
              100+
            </h3>
            <p className="text-gray-500">
              视频模板
            </p>
          </div>


          <div>
            <h3 className="text-3xl font-bold">
              10+
            </h3>
            <p className="text-gray-500">
              AI模型
            </p>
          </div>


          <div>
            <h3 className="text-3xl font-bold">
              4K
            </h3>
            <p className="text-gray-500">
              高清输出
            </p>
          </div>

        </div>


      </section>

    </main>
  )
}
