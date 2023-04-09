import { useState } from "react";
import supabase from "@/lib/supabase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // サインアップ成功時の処理
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

  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={signUpWithEmail} autoComplete="off">
        <div>
          <label htmlFor="signup_email">メールアドレス</label>
          <input type="email" placeholder="メールアドレスを入力してください" id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" placeholder="パスワードを入力してください" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} autoComplete="off" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "ローディング..." : "登録"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
