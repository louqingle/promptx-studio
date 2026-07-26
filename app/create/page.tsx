export default function CreatePage() {

return (

<main className="
min-h-screen
bg-black
text-white
">

<div className="
min-h-screen
bg-gradient-to-b
from-purple-900/30
via-black
to-black
px-6
py-10
">


{/* 顶部 */}

<header className="
max-w-5xl
mx-auto
flex
justify-between
items-center
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


<a
href="/"
className="
border
border-white/20
px-5
py-2
rounded-full
"
>
首页
</a>


</header>





{/* 标题 */}

<section className="
max-w-5xl
mx-auto
text-center
mt-20
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

✨ AI Creation Workspace

</div>



<h2 className="
text-5xl
font-black
mt-10
">

AI 创作工作台

</h2>


<p className="
text-gray-400
mt-5
text-lg
">

输入一个想法，生成电影级内容

</p>


</section>
</div>

</main>

)
}
