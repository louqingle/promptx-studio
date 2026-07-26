export default function Home() {

  const features = [
    {
      icon:"🎬",
      title:"AI电影导演",
      desc:"一句话生成剧情、分镜、运镜、完整影片方案"
    },
    {
      icon:"🎨",
      title:"AI视觉工作室",
      desc:"生成商业海报、角色、场景和艺术作品"
    },
    {
      icon:"🎙",
      title:"AI声音引擎",
      desc:"多语言真实配音和电影级声音设计"
    },
    {
      icon:"⚡",
      title:"Prompt智能优化",
      desc:"自动生成专业级AI提示词"
    }
  ];


  const models=[
    "OpenAI Sora",
    "Runway Gen-4",
    "可灵AI",
    "即梦AI",
    "Midjourney",
    "Flux"
  ];


  const prices=[
    {
      name:"Free",
      price:"¥0",
      desc:"体验AI创作"
    },
    {
      name:"Creator",
      price:"¥39/月",
      desc:"个人创作者"
    },
    {
      name:"Pro",
      price:"¥99/月",
      desc:"专业AI工作流"
    }
  ];


  return (

<main className="
min-h-screen
bg-black
text-white
overflow-hidden
">

<div className="
fixed inset-0
bg-[radial-gradient(circle_at_top,#312e81,transparent_45%)]
">
</div>


<div className="relative z-10">


{/* NAV */}

<header className="
flex
justify-between
items-center
px-8
py-6
">

<div className="
text-3xl
font-black
">
🚀 PromptX
</div>


<nav className="
hidden md:flex
gap-8
text-gray-300
">

<span>AI视频</span>
<span>AI图片</span>
<span>Prompt库</span>
<span>价格</span>

</nav>


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


</header>




{/* HERO */}


<section className="
text-center
pt-24
px-6
">


<div className="
inline-flex
px-8
py-3
rounded-full
border
border-white/20
bg-white/5
">

✨ The Future of AI Creation

</div>



<h1 className="
mt-12
text-6xl
md:text-8xl
font-black
leading-tight
">

用 AI 创造

<br/>


<span className="
bg-gradient-to-r
from-cyan-400
via-purple-500
to-pink-500
bg-clip-text
text-transparent
">

电影级智能内容

</span>


</h1>



<p className="
mt-10
text-xl
text-gray-400
max-w-3xl
mx-auto
">

一句话生成 AI 视频、图片、脚本、分镜、
声音和专业 Prompt

</p>



<div className="
flex
justify-center
gap-6
mt-12
">


<button className="
px-10
py-5
rounded-full
bg-white
text-black
text-xl
font-bold
">

开始创作

</button>



<button className="
px-10
py-5
rounded-full
border
border-white/30
text-xl
">

AI导演模式

</button>


</div>


</section>
