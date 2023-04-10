import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [session, setSession] = useState<any>(); // ログイン状態を管理
  const [error, setError] = useState(""); // エラー状況を管理
  const [loading, setLoading] = useState(false); // ローディング状態を管理

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // リスナーの解除
    return () => authData.subscription.unsubscribe();
  }, []);

  // メールアドレスとパスワードでサインイン
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("ログインに失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  // メールアドレスとパスワードでサインアップ
  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        alert("確認メールを送信しました。\nメールを確認してアカウントを有効化してください。");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("サインアップに失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  // GitHubでサインイン
  const signInWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "github" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("GitHubとの連携に失敗しました。");
      }
    }
  };

  // サインアウト
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    signInWithGithub,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    error,
    loading,
  };
};

export default useAuth;
