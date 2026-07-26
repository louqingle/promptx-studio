export default function Home() {

  const models = [
    "OpenAI Sora",
    "Runway Gen-4",
    "可灵AI",
    "即梦AI",
    "Midjourney",
    "Flux"
  ];


  const works = [
    "🎬 星际穿越",
    "🌆 未来赛博城市",
    "🚗 AI商业广告"
  ];


  const features = [
    {
      icon:"🤖",
      title:"AI导演",
      desc:"自动生成剧情、分镜、镜头语言"
    },
    {
      icon:"🎬",
      title:"影视生成",
      desc:"一键创造电影级视频内容"
    },
    {
      icon:"🎙",
      title:"智能配音",
      desc:"多语言真实AI声音"
    },
    {
      icon:"💎",
      title:"会员创作",
      desc:"更多额度和高级模型"
    }
  ];


  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    overflow-hidden
    ">


      {/* 背景光 */}

      <div className="
      fixed
      top-0
      left-0
      w-full
      h-[500px]
      bg-gradient-to-b
      from-purple-700/40
      via-blue-600/20
      to-transparent
      blur-3xl
      " />



      {/* 导航 */}

      <nav className="
      relative
      flex
      justify-between
      items-center
      px-6
      py-8
      ">


        <h1 className="
        text-3xl
        font-black
        ">
          🚀 PromptX
          <br/>
          Studio
        </h1>


        <button className="
        bg-white
        text-black
        px-7
        py-3
        rounded-full
        font-bold
        ">
          登录
        </button>


      </nav>





      {/* 首屏 */}

      <section className="
      relative
      px-6
      pt-16
      text-center
      ">


        <div className="
        inline-block
        px-6
        py-3
        rounded-full
        border
        border-white/20
        bg-white/5
        ">
          ✨ AI Creative Engine
        </div>



        <h2 className="
        mt-12
        text-5xl
        md:text-7xl
        font-black
        leading-tight
        ">

          一句话

          <br/>

          <span className="
          bg-gradient-to-r
          from-cyan-400
          via-purple-500
          to-pink-500
          bg-clip-text
          text-transparent
          ">
          生成电影级作品
          </span>


        </h2>



        <p className="
        mt-8
        text-gray-400
        text-lg
        ">
          AI视频 · AI图片 · 脚本 · 分镜 · Prompt
        </p>





        {/* 输入框 */}

        <div className="
        mt-12
        max-w-xl
        mx-auto
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        p-5
        ">


          <textarea

          placeholder="
输入你的创意...

例如：
宇航员穿越黑洞，
电影级镜头，IMAX画质
          "

          className="
          w-full
          h-36
          bg-transparent
          outline-none
          resize-none
          text-white
          placeholder-gray-500
          "
          
          />


          <button className="
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-cyan-400
          to-purple-600
          font-bold
          text-lg
          ">
            ✨ 开始生成
          </button>


        </div>


      </section>
            {/* 模型支持 */}

      <section className="
      px-6
      mt-28
      relative
      ">


        <h2 className="
        text-3xl
        font-black
        ">
          支持模型
        </h2>


        <div className="
        flex
        flex-wrap
        gap-3
        mt-8
        ">


        {
          models.map((model)=>(

            <div
            key={model}
            className="
            px-5
            py-3
            rounded-full
            bg-white/5
            border
            border-white/20
            text-gray-200
            "
            >

              {model}

            </div>

          ))
        }


        </div>


      </section>






      {/* 热门作品 */}

      <section className="
      px-6
      mt-28
      ">


        <h2 className="
        text-3xl
        font-black
        ">
          🔥 热门作品
        </h2>



        <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mt-8
        ">


        {
          works.map((work)=>(

            <div
            key={work}
            className="
            h-44
            rounded-3xl
            bg-gradient-to-br
            from-white/10
            to-white/5
            border
            border-white/20
            flex
            items-center
            justify-center
            text-xl
            font-bold
            "
            >

              {work}

            </div>

          ))
        }


        </div>


      </section>







      {/* 核心能力 */}

      <section className="
      px-6
      mt-28
      ">


        <h2 className="
        text-3xl
        font-black
        ">
          为什么选择 PromptX
        </h2>




        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        mt-10
        ">


        {
          features.map((item)=>(

            <div
            key={item.title}
            className="
            p-6
            rounded-3xl
            bg-white/5
            border
            border-white/10
            "
            >


              <div className="text-4xl">
                {item.icon}
              </div>


              <h3 className="
              mt-5
              text-xl
              font-bold
              ">
                {item.title}
              </h3>


              <p className="
              mt-3
              text-gray-400
              ">
                {item.desc}
              </p>


            </div>


          ))
        }


        </div>


      </section>







      {/* 会员 */}

      <section className="
      px-6
      mt-28
      pb-20
      ">


        <div className="
        rounded-3xl
        p-8
        bg-gradient-to-r
        from-purple-600/30
        to-blue-600/30
        border
        border-white/20
        text-center
        ">


          <h2 className="
          text-3xl
          font-black
          ">
            开启 AI 创作会员
          </h2>


          <p className="
          mt-4
          text-gray-300
          ">
            解锁更多模型、更高额度、更快生成
          </p>


          <button className="
          mt-8
          px-10
          py-4
          bg-white
          text-black
          rounded-full
          font-bold
          ">
            开通会员
          </button>


        </div>


      </section>





      {/* 底部 */}

      <footer className="
      px-6
      pb-10
      text-center
      text-gray-500
      ">

        © 2026 PromptX Studio

      </footer>



    </main>

  )

}
