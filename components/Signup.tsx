import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithEmail, loading, error } = useAuth();

  const onSubmitSignupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpWithEmail(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={onSubmitSignupForm} autoComplete="off">
        <div>
          <label htmlFor="signup_email">メールアドレス</label>
          <input type="email" placeholder="メールアドレスを入力してください" id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" placeholder="パスワードを入力してください" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} autoComplete="off" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "メール送信中..." : "登録"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
