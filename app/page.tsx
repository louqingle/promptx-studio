export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* 背景光 */}
      <div className="
      absolute inset-0
      bg-[radial-gradient(circle_at_top,#312e81,transparent_40%)]
      " />


      {/* 导航 */}
      <nav className="
      relative
      flex
      justify-between
      items-center
      px-8
      py-6
      max-w-7xl
      mx-auto
      ">

        <h1 className="
        text-3xl
        font-bold
        bg-gradient-to-r
        from-cyan-400
        to-purple-500
        bg-clip-text
        text-transparent
        ">
          🚀 PromptX Studio
        </h1>


        <button className="
        px-6
        py-3
        rounded-full
        bg-white/10
        border
        border-white/20
        backdrop-blur
        ">
          登录
        </button>

      </nav>



      {/* 主视觉 */}
      <section className="
      relative
      max-w-6xl
      mx-auto
      px-6
      pt-24
      text-center
      ">


        <div className="
        inline-block
        px-5
        py-2
        rounded-full
        bg-purple-500/20
        border
        border-purple-400/30
        text-purple-300
        ">
          🎬 AI Video Generator
        </div>



        <h2 className="
        mt-8
        text-6xl
        md:text-8xl
        font-black
        leading-tight
        ">

          一句话

          <br/>

          <span className="
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-600
          bg-clip-text
          text-transparent
          ">
          生成电影级AI视频
          </span>

        </h2>



        <p className="
        mt-8
        text-xl
        text-gray-400
        max-w-2xl
        mx-auto
        ">
          AI自动完成视频生成、分镜设计、
          配音和字幕，让每个人成为导演。
        </p>



        {/* 输入卡片 */}

        <div className="
        mt-12
        max-w-3xl
        mx-auto
        p-6
        rounded-3xl
        bg-white/10
        border
        border-white/20
        backdrop-blur-xl
        ">


          <textarea
          placeholder="
          描述你的电影：
          一个宇航员站在火星表面，夕阳，史诗电影镜头...
          "
          className="
          w-full
          h-36
          bg-transparent
          outline-none
          text-lg
          "
          />


          <button className="
          w-full
          mt-5
          py-5
          rounded-2xl
          text-xl
          font-bold
          bg-gradient-to-r
          from-cyan-500
          to-purple-600
          hover:scale-105
          transition
          ">
            🎥 开始生成视频
          </button>


        </div>


      </section>



      {/* 功能 */}

      <section className="
      relative
      max-w-6xl
      mx-auto
      px-6
      py-24
      grid
      md:grid-cols-4
      gap-6
      ">


        {[
          ["🎬","文生视频"],
          ["📸","图片转视频"],
          ["🎙","AI配音"],
          ["🧑","数字人"]
        ].map((item)=>(
          <div
          key={item[1]}
          className="
          p-8
          rounded-3xl
          bg-white/5
          border
          border-white/10
          hover:bg-white/10
          transition
          "
          >

            <div className="text-4xl">
              {item[0]}
            </div>

            <h3 className="
            mt-5
            text-xl
            font-bold
            ">
              {item[1]}
            </h3>

          </div>
        ))}


      </section>


    </main>
  )
}
