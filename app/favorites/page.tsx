"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("prompt_history")
        .select("*")
        .eq("user_id", user.id)
        .eq("favorite", true)
        .order("created_at", {
          ascending: false,
        })

      if (!error) {
        setFavorites(data || [])
      }

      setLoading(false)
    }

    loadFavorites()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        加载中...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        我的收藏
      </h1>

      {favorites.length === 0 ? (
        <div className="text-gray-400">
          暂时没有收藏的 Prompt
        </div>
      ) : (
        <div className="space-y-6">
          {favorites.map((item) => (
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

              <p className="mb-4 text-gray-300">
                {item.input_text}
              </p>

              <h2 className="font-bold mb-2">
                Prompt：
              </h2>

              <p className="whitespace-pre-wrap text-gray-200">
                {item.result_text}
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    item.result_text
                  )
                  alert("Prompt 已复制")
                }}
                className="mt-4 rounded-xl bg-white px-4 py-2 text-black"
              >
                复制 Prompt
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
