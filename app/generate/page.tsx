export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* 顶部 */}
      <nav className="px-8 py-6">
        <h1 className="text-3xl font-bold 
        bg-gradient-to-r from-cyan-400 to-purple-500 
        bg-clip-text text-transparent">
          🎬 PromptX Video
        </h1>
      </nav>


      <section className="px-6 py-10 max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          AI 视频生成工作台
        </h2>

        <p className="text-gray-400 text-center mt-4">
          输入一句话，生成电影级 AI 视频
        </p>


        {/* 输入框 */}
        <div className="
        mt-10
        bg-white/10
        border border-white/20
        rounded-3xl
        p-6
        backdrop-blur-xl
        ">

          <textarea
            placeholder="例如：一个宇航员在火星行走，电影级镜头，8K，科幻大片..."
            className="
            w-full
            h-40
            bg-transparent
            outline-none
            resize-none
            text-white
            placeholder-gray-500
            "
          />


          {/* 模型选择 */}
          <div className="mt-6">

            <h3 className="font-bold mb-3">
              选择 AI 模型
            </h3>

            <div className="grid grid-cols-3 gap-3">

              <button className="
              border border-white/20
              rounded-xl
              py-3
              bg-white/5
              ">
                可灵 Kling
              </button>


              <button className="
              border border-white/20
              rounded-xl
              py-3
              bg-white/5
              ">
                Runway
              </button>


              <button className="
              border border-white/20
              rounded-xl
              py-3
              bg-white/5
              ">
                Veo
              </button>

            </div>

          </div>


          {/* 上传图片 */}
          <div className="mt-6">

            <h3 className="font-bold mb-3">
              图片转视频
            </h3>

            <div className="
            border border-dashed
            border-white/30
            rounded-2xl
            p-10
            text-center
            text-gray-400
            ">
              📷 点击上传图片
            </div>

          </div>


          {/* 按钮 */}
          <button
          className="
          mt-8
          w-full
          py-4
          rounded-2xl
          font-bold
          text-lg
          bg-gradient-to-r
          from-cyan-500
          to-purple-600
          ">
            🚀 开始生成视频
          </button>


        </div>


        {/* 视频预览 */}
        <div className="
        mt-10
        h-80
        rounded-3xl
        bg-white/5
        border border-white/10
        flex
        items-center
        justify-center
        text-gray-500
        ">

          视频生成后显示区域

        </div>


      </section>

    </main>
  )
}
