"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Auth() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  async function signUp(){

    setLoading(true)

    const {error}=await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if(error){
      alert(error.message)
      return
    }

    alert("注册成功，请检查邮箱")
  }


  async function signIn(){

    setLoading(true)

    const {error}=await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if(error){
      alert(error.message)
      return
    }

    alert("登录成功")
  }


  return (
    <div className="space-y-3">

      <input
        className="w-full rounded-xl bg-white/10 p-3"
        placeholder="邮箱"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-white/10 p-3"
        placeholder="密码"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={signIn}
        disabled={loading}
        className="w-full rounded-xl bg-white py-3 font-bold text-black"
      >
        登录
      </button>


      <button
        onClick={signUp}
        disabled={loading}
        className="w-full rounded-xl bg-purple-500 py-3 font-bold text-white"
      >
        注册
      </button>

    </div>
  )
}
