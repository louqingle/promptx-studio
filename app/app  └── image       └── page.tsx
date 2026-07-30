"use client"

import {useState} from "react"

export default function ImageAI(){

const [idea,setIdea]=useState("")
const [result,setResult]=useState("")


function create(){

setResult(`
${idea},

Ultra realistic,
8K resolution,
cinematic lighting,
professional photography,
Hollywood movie style,
high detail,
dramatic atmosphere,
realistic texture
`)

}


return (

<main className="
min-h-screen
bg-black
text-white
p-10
">

<h1 className="
text-5xl
font-black
text-center
">

🎨 AI图片生成

</h1>


<div className="
max-w-3xl
mx-auto
mt-20
bg-white/10
rounded-3xl
p-8
">


<textarea

value={idea}

onChange={(e)=>setIdea(e.target.value)}

placeholder="
例如：
未来城市中的机器人女孩
"

className="
w-full
h-40
bg-black/40
rounded-xl
p-5
"

/>


<button

onClick={create}

className="
mt-5
w-full
py-4
rounded-xl
bg-gradient-to-r
from-cyan-400
to-purple-600
font-bold
">

生成图片Prompt

</button>


{
result &&

<div className="
mt-8
bg-black/40
p-6
rounded-xl
whitespace-pre-line
">

{result}

</div>

}


</div>


</main>

)

}
