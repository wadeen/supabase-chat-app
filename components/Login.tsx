import { useState } from "react";
import supabase from "@/lib/supabase";
import { useSetRecoilState } from "recoil";
import { authUser } from "./atom/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setIsLogin = useSetRecoilState(authUser);

  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // ログイン成功時の処理
        setIsLogin({ isLogin: true });
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

  return (
    <div>
      <h2>ログイン</h2>
      <p>メールアドレスでログインする</p>
      <form onSubmit={signInWithEmail}>
        <div>
          <label htmlFor="login_email">メールアドレス</label>
          <input type="email" placeholder="メールアドレスを入力してください" id="login_email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="login_password">パスワード</label>
          <input type="password" placeholder="パスワードを入力してください" id="login_password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
