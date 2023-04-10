import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmail, loading, error } = useAuth();

  // ログイン処理
  const onSubmitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmail(email, password);
    console.log("error: ", error);
  };

  return (
    <div>
      <h2>ログイン</h2>
      <p>メールアドレスでログインする</p>
      <form onSubmit={onSubmitLoginForm}>
        <div>
          <label htmlFor="login_email">メールアドレス</label>
          <input type="email" placeholder="メールアドレスを入力してください" id="login_email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="login_password">パスワード</label>
          <input type="password" placeholder="パスワードを入力してください" id="login_password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} autoComplete="off" />
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
