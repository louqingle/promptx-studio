"use client";

import { useState } from "react";


export default function CreatePage(){

const [prompt,setPrompt]=useState("");
const [result,setResult]=useState("");
const [loading,setLoading]=useState(false);


async function generate(){

setLoading(true);


setTimeout(()=>{

setResult(
`电影级AI提示词：

${prompt}


cinematic lighting,
8K,
IMAX quality,
ultra realistic,
professional camera,
movie scene,
high detail,
HDR`
);


setLoading(false);


},1000);


}



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
">

首页

</a>


</header>



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



<textarea

value={prompt}

onChange={(e)=>setPrompt(e.target.value)}

placeholder="
描述你的想法，例如：
一个宇航员在火星看日落，电影级摄影
"

className="
mt-10
w-full
h-40
rounded-3xl
bg-white/10
border
border-white/20
p-6
text-white
outline-none
"

/>



<button

onClick={generate}

className="
mt-8
px-10
py-5
rounded-full
bg-white
text-black
text-xl
font-bold
"

>

{

loading?

"AI生成中..."

:

"开始创作"

}


</button>




{

result &&

<div className="
mt-10
p-6
rounded-3xl
bg-white/10
border
border-white/20
text-left
whitespace-pre-wrap
">

{result}

</div>


}


</section>


</div>


</main>


)

}
