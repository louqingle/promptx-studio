"use client"

import { useState } from "react"

export default function Home() {

const [idea,setIdea] = useState("")
const [result,setResult] = useState("")
const [loading,setLoading] = useState(false)


async function generatePrompt(){

if(!idea){
alert("请输入你的创意")
return
}

setLoading(true)

setTimeout(()=>{

setResult(
`电影级AI提示词：

${idea}

Cinematic lighting,
IMAX movie quality,
8K ultra realistic,
professional camera,
Hollywood film style,
dramatic atmosphere,
high detail`
)

setLoading(false)

},1000)

}

const models = [
"Sora",
"Runway",
"可灵AI",
"即梦AI",
"Midjourney",
"Flux"
]


const tools = [
{
icon:"🎬",
title:"AI视频导演",
desc:"输入故事，自动生成电影分镜和视频方案"
},
{
icon:"🎨",
title:"AI视觉设计",
desc:"生成海报、角色、场景和商业图片"
},
{
icon:"📝",
title:"AI剧本助手",
desc:"自动创造人物、剧情和对白"
},
{
icon:"🎙️",
title:"AI声音工作室",
desc:"多语言智能配音"
}
]


return (

<main className="
min-h-screen
bg-black
text-white
overflow-hidden
">


{/* 背景 */}

<div className="
fixed
inset-0
bg-gradient-to-b
from-purple-900/40
via-black
to-black
"/>



<div className="
relative
z-10
max-w-7xl
mx-auto
px-6
">



{/* 导航 */}

<nav className="
flex
justify-between
items-center
py-8
">


<h1 className="
text-3xl
font-black
bg-gradient-to-r
from-cyan-400
to-purple-500
bg-clip-text
text-transparent
">

🚀 PromptX Studio

</h1>



<div className="
hidden
md:flex
gap-8
text-gray-300
">

<span>AI视频</span>
<span>AI图片</span>
<span>Prompt库</span>
<span>会员</span>

</div>



<button className="
px-6
py-3
rounded-full
bg-white
text-black
font-bold
">

登录

</button>


</nav>





{/* Hero */}

<section className="
text-center
pt-20
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

✨ AI Creative Platform

</div>



<h2 className="
mt-12
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
via-purple-500
to-pink-500
bg-clip-text
text-transparent
">

创造你的AI电影

</span>


</h2>



<p className="
mt-8
text-xl
text-gray-400
">

AI视频 · AI图片 · 剧本 · 分镜 · 配音

</p>
{/* 输入框 */}

<div className="
mt-12
max-w-3xl
mx-auto
rounded-3xl
border
border-white/20
bg-white/10
p-5
backdrop-blur-xl
">

<textarea

value={idea}

onChange={(e)=>setIdea(e.target.value)}

placeholder="
描述你的想法...

例如：
一个宇航员在火星看日落
"

className="
w-full
h-36
bg-transparent
outline-none
resize-none
text-white
placeholder-gray-500
p-4
"

/>


<button

onClick={generatePrompt}

className="
w-full
mt-4
py-4
rounded-2xl
bg-gradient-to-r
from-cyan-400
to-purple-600
font-bold
text-lg
">

{loading ? "生成中..." : "✨ 开始生成"}

</button>


{
result && (

<div
className="
mt-8
p-6
rounded-3xl
bg-black/40
border
border-white/10
whitespace-pre-line
"
>

{result}

</div>

)
}


</div>
      {/* AI工作流 */}

      <section className="
      mt-32
      px-2
      ">

        <h2 className="
        text-4xl
        font-black
        text-center
        ">
          AI 创作工作流
        </h2>


        <div className="
        grid
        md:grid-cols-4
        gap-6
        mt-12
        ">


        {
          tools.map((tool)=>(

            <div
            key={tool.title}
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            hover:bg-white/10
            transition
            "
            >

              <div className="
              text-5xl
              ">
                {tool.icon}
              </div>


              <h3 className="
              text-xl
              font-bold
              mt-6
              ">
                {tool.title}
              </h3>


              <p className="
              text-gray-400
              mt-4
              leading-relaxed
              ">
                {tool.desc}
              </p>


            </div>

          ))
        }


        </div>

      </section>







      {/* 模型生态 */}

      <section className="
      mt-32
      ">


        <h2 className="
        text-4xl
        font-black
        text-center
        ">
          全球 AI 模型生态
        </h2>



        <div className="
        flex
        flex-wrap
        justify-center
        gap-4
        mt-10
        ">


        {
          models.map((model)=>(

            <div
            key={model}
            className="
            px-8
            py-4
            rounded-full
            border
            border-white/20
            bg-white/5
            "
            >

              {model}

            </div>

          ))
        }


        </div>


      </section>







      {/* 案例展示 */}

      <section className="
      mt-32
      ">


        <h2 className="
        text-4xl
        font-black
        text-center
        ">
          热门 AI 作品
        </h2>



        <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-12
        ">


          <div className="
          h-56
          rounded-3xl
          bg-gradient-to-br
          from-blue-500/30
          to-purple-600/30
          border
          border-white/10
          flex
          items-center
          justify-center
          text-xl
          font-bold
          ">
            🌌 星际电影
          </div>



          <div className="
          h-56
          rounded-3xl
          bg-gradient-to-br
          from-purple-500/30
          to-pink-600/30
          border
          border-white/10
          flex
          items-center
          justify-center
          text-xl
          font-bold
          ">
            🌆 未来城市
          </div>



          <div className="
          h-56
          rounded-3xl
          bg-gradient-to-br
          from-cyan-500/30
          to-blue-600/30
          border
          border-white/10
          flex
          items-center
          justify-center
          text-xl
          font-bold
          ">
            🚗 商业广告
          </div>


        </div>


      </section>
        {/* 会员价格 */}

      <section className="
      mt-32
      pb-20
      ">


        <h2 className="
        text-4xl
        font-black
        text-center
        ">
          选择你的创作计划
        </h2>



        <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-12
        ">


          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          ">

            <h3 className="
            text-2xl
            font-bold
            ">
              Free
            </h3>

            <p className="
            text-5xl
            font-black
            mt-5
            ">
              ¥0
            </p>

            <p className="
            text-gray-400
            mt-5
            ">
              基础AI创作体验
            </p>

          </div>





          <div className="
          rounded-3xl
          border
          border-purple-500/50
          bg-purple-500/10
          p-8
          ">

            <h3 className="
            text-2xl
            font-bold
            ">
              Creator
            </h3>

            <p className="
            text-5xl
            font-black
            mt-5
            ">
              ¥39
            </p>

            <p className="
            text-gray-400
            mt-5
            ">
              适合短视频创作者
            </p>


            <button className="
            mt-8
            w-full
            py-4
            rounded-full
            bg-white
            text-black
            font-bold
            ">
              开通
            </button>

          </div>






          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          ">

            <h3 className="
            text-2xl
            font-bold
            ">
              Pro
            </h3>

            <p className="
            text-5xl
            font-black
            mt-5
            ">
              ¥99
            </p>

            <p className="
            text-gray-400
            mt-5
            ">
              专业AI工作流
            </p>


          </div>


        </div>


      </section>








      {/* CTA */}

      <section className="
      mb-20
      rounded-3xl
      border
      border-white/20
      bg-gradient-to-r
      from-cyan-500/20
      via-purple-500/20
      to-pink-500/20
      p-10
      text-center
      ">


        <h2 className="
        text-4xl
        font-black
        ">
          开始创造你的第一个 AI 作品
        </h2>


        <p className="
        text-gray-300
        mt-5
        ">
          从想法到作品，只需要一句话
        </p>


        <button className="
        mt-8
        px-10
        py-4
        rounded-full
        bg-white
        text-black
        font-bold
        ">
          立即体验
        </button>


      </section>







      {/* Footer */}

      <footer className="
      text-center
      text-gray-500
      pb-10
      ">

        © 2026 PromptX Studio

      </footer>



    </div>

  </main>

  )
}
