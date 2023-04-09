import supabase from "@/lib/supabase";
import { useSetRecoilState } from "recoil";
import { authUser } from "./atom/auth";

const LogoutButton = () => {
  const setIsLogin = useSetRecoilState(authUser);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error: ", error.message);
      } else {
        // ログアウト成功時の処理
        setIsLogin({ isLogin: false });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else if (typeof error === "string") {
        console.error(error);
      } else {
        console.error("ログアウトに失敗しました。");
      }
    }
  };

  return <button onClick={handleLogout}>ログアウト</button>;
};

export default LogoutButton;
