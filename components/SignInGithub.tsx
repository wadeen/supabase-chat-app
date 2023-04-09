import supabase from "@/lib/supabase";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authUser } from "./atom/auth";

const SignInGithub = () => {
  const [error, setError] = useState("");

  const setIsLogin = useSetRecoilState(authUser);

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
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
    }
  };
  return (
    <div>
      <button onClick={signInWithGithub}>Githubでサインインする</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInGithub;
