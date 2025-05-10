'use client'
import { useState, useEffect } from "react";
import Header from "../../components/Header"
import Link from "next/link";
import { supabase } from "../../lib/supabase-client";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession]  = useState<any>(null);
  
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("取得したセッション:", data.session);
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

  // const logout = async () => {
  //   await supabase.auth.signOut();
  //   setSession(null);
  // };

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <>          
          {!session ? (
          <main className="flex justify-center items-center h-screen">
            <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
                <div>
                  <div className="mb-2">
                    <Link href="/user/login" className="text-blue-500 hover:underline">
                      ログインページ
                    </Link>
                  </div>
                  <div className="mb-2">
                    <Link href="/user/signup" className="text-blue-500 hover:underline">
                      新規登録ページ
                    </Link>
                  </div>
                </div>
            </div>
          </main>
          ) : (
            <>
              <Header />
              <main className="flex justify-center items-center h-screen">
                <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
                  <Link href="/kakeibo">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-lg mt-4">
                      家計簿
                    </button>
                  </Link>
                  <Link href="/todo">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-lg mt-4">
                      やることリスト
                    </button>
                  </Link>
                </div>
              </main>
            </>
          )};
    </>
  );
}
