'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../../lib/supabase-client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push("/")
    else alert("ログイン失敗: " + error.message)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="block mb-2 border px-2 py-1"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="block mb-4 border px-2 py-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ログイン</button>
      </form>
    </main>
  )
}
