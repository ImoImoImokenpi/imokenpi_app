'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase-client";
import Header from "../../components/Header";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">読み込み中...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center space-y-6">
          <h2 className="text-2xl font-bold text-teal-600">ようこそ</h2>
          <div className="space-y-2">
            <Link href="/user/login" className="block text-blue-500 hover:underline text-lg">
              ログインページへ
            </Link>
            <Link href="/user/signup" className="block text-blue-500 hover:underline text-lg">
              新規登録ページへ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="flex justify-center items-center h-screen bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg space-y-6">
          <Link href="/kakeibo">
            <button className="w-full py-3 bg-teal-500 text-white text-lg font-semibold rounded hover:bg-teal-600 transition-shadow shadow-md">
              家計簿
            </button>
          </Link>
          <Link href="/todo">
            <button className="w-full py-3 bg-teal-500 text-white text-lg font-semibold rounded hover:bg-teal-600 transition-shadow shadow-md">
              やることリスト
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
