export default function Home() {
  const models = [
    "OpenAI Sora",
    "Runway Gen-4",
    "可灵AI",
    "即梦AI",
    "Midjourney",
    "Flux"
  ]

  const features = [
    ["🎬", "电影级生成", "一句话生成完整视频"],
    ["🤖", "AI导演", "自动分镜、运镜、剧情"],
    ["🎙", "智能配音", "多语言真实声音"],
    ["✨", "4K输出", "高清影视级画质"]
  ]

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* 光效背景 */}
      <div className="
      absolute inset-0 
      bg-[radial-gradient(circle_at_top,#4f46e5,transparent_35%),radial-gradient(circle_at_bottom,#06b6d4,transparent_30%)]
      opacity-40
      " />

      <div className="relative z-10">

        {/* 顶部 */}
        <header className="flex justify-between items-center px-8 py-8">

          <div className="
          text-3xl font-black
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent
          ">
            🚀 PromptX AI
          </div>


          <button className="
          px-6 py-3 rounded-full
          bg-white/10
          border border-white/20
          backdrop-blur-xl
          ">
            登录
          </button>

        </header>



        {/* Hero */}

        <section className="text-center px-6 pt-20">


          <h1 className="
          text-6xl md:text-8xl
          font-black
          leading-tight
          ">

            创造你的
            <br/>

            <span className="
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
            bg-clip-text text-transparent
            ">
              AI电影世界
            </span>

          </h1>


          <p className="
          mt-8
          text-xl
          text-gray-400
          ">
            输入一句话，让AI完成剧本、分镜、视频、配音
          </p>



          {/* 输入框 */}

          <div className="
          max-w-4xl mx-auto mt-14
          p-2
          rounded-3xl
          bg-white/10
          border border-white/20
          backdrop-blur-xl
          flex
          ">

            <input

            className="
            flex-1
            bg-transparent
            px-8
            text-lg
            outline-none
            "

            placeholder="
            例如：一个外卖员凌晨穿越未来城市...
            "
            />


            <button className="
            px-10 py-5
            rounded-2xl
            font-bold
            text-black
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            ">
              🎬 生成视频
            </button>


          </div>


        </section>




        {/* 数据 */}

        <section className="
        grid md:grid-cols-4
        gap-6
        max-w-6xl
        mx-auto
        mt-28
        px-6
        ">


        {
          features.map((item)=>(

            <div
            key={item[1]}
            className="
            p-8
            rounded-3xl
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            hover:scale-105
            transition
            "
            >

              <div className="text-4xl">
                {item[0]}
              </div>

              <h3 className="
              text-2xl
              font-bold
              mt-5
              ">
                {item[1]}
              </h3>

              <p className="
              text-gray-400
              mt-3
              ">
                {item[2]}
              </p>

            </div>

          ))
        }


        </section>




        {/* AI模型 */}

        <section className="
        text-center
        mt-32
        px-6
        ">


          <h2 className="
          text-4xl
          font-bold
          ">
            全球AI模型中心
          </h2>


          <div className="
          flex
          flex-wrap
          justify-center
          gap-4
          mt-10
          ">

          {
            models.map(model=>(

              <div
              key={model}
              className="
              px-6 py-3
              rounded-full
              bg-white/10
              border border-white/20
              "
              >
                {model}
              </div>

            ))
          }


          </div>


        </section>




        {/* 会员 */}

        <section className="
        max-w-5xl
        mx-auto
        mt-32
        mb-20
        p-12
        rounded-[40px]
        bg-gradient-to-r
        from-purple-900/40
        to-cyan-900/40
        border border-white/20
        text-center
        ">


          <h2 className="
          text-5xl
          font-black
          ">
            解锁无限创作 🚀
          </h2>


          <p className="
          text-gray-300
          mt-5
          ">
            专业AI视频工作室会员
          </p>


          <button className="
          mt-10
          px-12 py-5
          rounded-full
          bg-white
          text-black
          font-bold
          ">
            开通会员
          </button>


        </section>



      </div>


    </main>
  )
}
