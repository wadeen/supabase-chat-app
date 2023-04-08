import supabase from "@/lib/supabase";
import { useRecoilState } from "recoil";
import { authUser } from "./atom/auth";

const LogoutButton = () => {
  const [isLogin, setIsLogin] = useRecoilState(authUser);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error: ", error.message);
      } else {
        // ログアウト成功時の処理
        setIsLogin({ isLogin: false });
        alert("ログアウトしました");
      }
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
