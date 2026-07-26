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
["🎬","AI电影生成","一句话生成完整电影分镜"],
["🤖","AI导演","自动运镜、剧情、脚本"],
["🎙️","智能配音","多语言真实声音"],
["✨","8K输出","电影级视觉效果"]
]


return (

<main className="min-h-screen bg-black text-white overflow-hidden">

{/* 背景 */}

<div
className="
absolute inset-0
bg-gradient-to-b
from-purple-900/40
via-black
to-black
opacity-70
"
/>


<div className="relative z-10">


{/* 导航 */}

<header className="
flex justify-between
items-center
px-8 py-6
">

<h1 className="
text-3xl font-bold
bg-gradient-to-r
from-cyan-400
to-purple-500
bg-clip-text
text-transparent
">
🚀 PromptX Studio
</h1>


<nav className="
hidden md:flex gap-8 text-gray-300
">

<span>AI视频</span>
<span>AI图片</span>
<span>Prompt市场</span>
<span>会员</span>

</nav>


<button className="
px-5 py-2
rounded-full
bg-white
text-black
font-bold
">
开始创作
</button>

</header>




{/* Hero */}

<section className="
text-center
pt-24
px-6
">


<h2 className="
text-6xl
font-black
leading-tight
">

让 AI 帮你创造

<br/>

<span className="
bg-gradient-to-r
from-cyan-400
via-blue-500
to-purple-600
bg-clip-text
text-transparent
">
电影级内容
</span>


</h2>



<p className="
mt-8
text-xl
text-gray-400
">

一句话生成
AI视频、
图片、
脚本、
分镜和专业Prompt

</p>



<div className="
mt-10
flex justify-center
gap-5
">

<button className="
px-10 py-4
rounded-xl
bg-gradient-to-r
from-cyan-500
to-purple-600
font-bold
text-lg
">

🎬 AI导演模式

</button>


<button className="
px-10 py-4
rounded-xl
border border-gray-700
">

创建Prompt

</button>


</div>


</section>





{/* 数据 */}

<section className="
grid
grid-cols-3
gap-5
max-w-4xl
mx-auto
mt-24
px-6
">


<div className="bg-white/5 p-6 rounded-2xl">
<h3 className="text-3xl font-bold">
100+
</h3>
<p className="text-gray-400">
电影模板
</p>
</div>


<div className="bg-white/5 p-6 rounded-2xl">
<h3 className="text-3xl font-bold">
10+
</h3>
<p className="text-gray-400">
AI模型
</p>
</div>


<div className="bg-white/5 p-6 rounded-2xl">
<h3 className="text-3xl font-bold">
4K
</h3>
<p className="text-gray-400">
高清输出
</p>
</div>


</section>





{/* 功能 */}

<section className="
max-w-6xl
mx-auto
mt-24
px-6
">


<h2 className="
text-4xl
font-bold
text-center
">
核心能力
</h2>



<div className="
grid md:grid-cols-4
gap-6
mt-10
">


{features.map((f,i)=>(

<div
key={i}
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
hover:bg-white/10
transition
">

<div className="text-4xl">
{f[0]}
</div>

<h3 className="text-xl font-bold mt-4">
{f[1]}
</h3>

<p className="text-gray-400 mt-3">
{f[2]}
</p>

</div>

))}


</div>

</section>





{/* 模型 */}

<section className="
mt-24
text-center
pb-20
">


<h2 className="
text-3xl font-bold
">
支持全球AI模型
</h2>


<div className="
flex flex-wrap
justify-center
gap-4
mt-8
">


{
models.map((m)=>(

<div
key={m}
className="
px-6 py-3
rounded-full
bg-white/10
border border-white/10
">

{m}

</div>

))
}


</div>


</section>



</div>

</main>

)

}
