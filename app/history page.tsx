"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function HistoryPage() {

  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    async function loadHistory() {

      const {
        data: {
          user
        }
      } = await supabase.auth.getUser()


      if (!user) {
        setLoading(false)
        return
      }


      const {
        data,
        error
      } = await supabase
        .from("prompt_history")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order(
          "created_at",
          {
            ascending:false
          }
        )


      if (!error) {
        setHistory(data || [])
      }


      setLoading(false)

    }


    loadHistory()

  }, [])



  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        加载中...
      </div>
    )

  }



  return (

    <main className="min-h-screen bg-black text-white p-6">


      <h1 className="text-3xl font-bold mb-8">
        我的历史
      </h1>



      {
        history.length === 0 ? (

          <div className="text-gray-400">
            暂无生成记录
          </div>

        ) : (


          <div className="space-y-6">


          {
            history.map((item)=>(

              <div
                key={item.id}
                className="rounded-2xl bg-white/10 p-5"
              >

                <div className="text-sm text-gray-400 mb-3">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </div>


                <h2 className="font-bold mb-2">
                  创意：
                </h2>

                <p className="mb-4">
                  {item.input_text}
                </p>


                <h2 className="font-bold mb-2">
                  Prompt：
                </h2>


                <p className="whitespace-pre-wrap text-gray-200">
                  {item.result_text}
                </p>


              </div>


            ))
          }


          </div>

        )
      }


    </main>

  )

}
