import { supabase } from '../supabase-client';

export const fetchTodos = async () => {
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
    .from("todo")
    .select("*")
    .eq("user_id", user.id);  // ユーザーIDでフィルタ

  if (error) {
    console.error("todo取得エラー:", error.message);
    return [];
  }

  return data;
};

export const addTodo = async (title: string) => {
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
  .from("todo")
  .insert([
    {title: title, user_id: user.id}
  ])
  .select();
  
  if (error) {
    console.error("追加エラー", error.message);
  }

  return data;
}; 

export const deleteTodo = async (id: number) => {
  const { error } =await supabase
  .from("todo")
  .delete()
  .eq("id", id);

  if (error) {
    console.error("削除エラー", error.message);
    return false;
  }

  return true;
};
