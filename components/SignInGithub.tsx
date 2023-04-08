import supabase from "@/lib/supabase";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authUser } from "./atom/auth";

const SignInGithub = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(authUser);

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) {
        setError(error.message);
      } else {
        // ログイン成功時の処理
        // router.push("/chat");
        setIsLogin({ isLogin: false });
      }
    } catch (error: any) {
      setError(error.message);
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
