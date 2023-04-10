import supabase, { Database } from "./supabase";

// テーブル名
export const TABLE_NAME = "chat-app";

// データの全取得
export const fetchDatabase = async () => {
  try {
    const { data } = await supabase.from(TABLE_NAME).select("*").order("createdAt");
    return data;
  } catch (error) {
    console.error(error);
  }
};

// データの追加
export const addSupabaseData = async ({ message }: { message: Database["message"] }) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData?.user?.email; // ログインしているユーザーのメールアドレス
    await supabase.from(TABLE_NAME).insert({ message, userEmail });
  } catch (error) {
    console.error(error);
  }
};
