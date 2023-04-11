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

type InsertProps = Pick<Database, "message" | "nickName" | "avatarUrl">;

// データの追加
export const addSupabaseData = async ({ message, avatarUrl, nickName }: InsertProps) => {
  try {
    await supabase.from(TABLE_NAME).insert({ message, avatarUrl, nickName });
  } catch (error) {
    console.error(error);
  }
};
