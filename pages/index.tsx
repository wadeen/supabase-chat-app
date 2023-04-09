import Login from "@/components/Login";
import SignInGithub from "@/components/SignInGithub";
import Signup from "@/components/Signup";
import { authUser } from "@/components/atom/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ChatApp from "@/components/ChatApp";
// import { useEffect } from "react";
// import supabase from "@/lib/supabase";
import styles from "../styles/pages/index.module.css";

const Home = () => {
  // const router = useRouter();
  const { isLogin } = useRecoilValue(authUser);

  // const setIsLogin = useSetRecoilState(authUser);

  // useEffect(() => {
  //   // ページの読み込み時にローカルストレージから状態を復元
  //   const storedIsLogin = localStorage.getItem("isLogin");
  //   if (storedIsLogin) {
  //     setIsLogin({ isLogin: JSON.parse(storedIsLogin) });
  //   }

  //   // ログイン状態が変わったときにローカルストレージに保存
  //   const { data } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_IN") {
  //       localStorage.setItem("isLogin", JSON.stringify(true));
  //       setIsLogin({ isLogin: true });
  //     } else if (event === "SIGNED_OUT") {
  //       localStorage.removeItem("isLogin");
  //       setIsLogin({ isLogin: false });
  //     }
  //   });

  //   // クリーンアップ関数
  //   return () => {
  //     data.subscription.unsubscribe();
  //   };
  // }, [setIsLogin]);

  return isLogin ? (
    <Layout>
      <div className={styles.container}>
        <div className={styles.hoge}>
          <ChatApp />
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <Signup />
      <Login />
      {/* <small>or</small>
      <h2>Githubでサインイン</h2>
      <SignInGithub /> */}
    </Layout>
  );
};

export default Home;
