"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase-client';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      console.log('User logged out');
      router.push("/")
    }
  };

  return (
    <header className="bg-teal-500 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Imokenpiアプリ</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-teal-500 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        ログアウト
      </button>
    </header>
  );
};

export default Header;
