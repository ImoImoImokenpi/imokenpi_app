import { stagger } from 'framer-motion/dom';
import { supabase } from '../../../lib/supabase-client';

export const fetchKakeibosByMonth = async (year: number, month: number) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  
  if (!user || !user.id) {
    console.warn("ユーザー情報がありません");
    return [];
  }

  if (userError || !user) {
    console.error("ユーザー情報の取得に失敗しました", userError);
    return [];
  }

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(year, month, 0).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("kakeibo")
    .select("*")
    .eq("user_id", user.id)  // ユーザーIDでフィルタ
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) {
    console.error("todo取得エラー:", error.message);
    return [];
  }

  return data;
};


export const addKakeibo = async (
    title: string,
    isIncome: boolean,
    date: string,
    amount: number,
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    console.warn("ユーザー情報がありません");
    return [];
  }

  if (userError || !user) {
    console.error("ユーザー情報の取得に失敗しました", userError);
    return [];
  }
  
  const { data, error } = await supabase
    .from("kakeibo")
    .insert([
        {
            title,
            isIncome,
            date,
            amount,
            user_id: user.id,
        },
    ])
    .select();
  
    if (error) {
        console.error("追加エラー", error.message);
    }

    return data;
}; 

export const deleteKakeibo = async (id: number) => {
  const { error } =await supabase
  .from("kakeibo")
  .delete()
  .eq("id", id);

  if (error) {
    console.error("削除エラー", error.message);
    return false;
  }

  return true;
};
