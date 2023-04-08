import Login from "@/components/Login";
// import SignInGithub from "@/components/SignInGithub";
import Signup from "@/components/Signup";
import { authUser } from "@/components/atom/auth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const Home = () => {
  const router = useRouter();
  const { isLogin } = useRecoilValue(authUser);

  // ログイン時にチャットページに遷移
  useEffect(() => {
    isLogin && router.push("/chat");
  }, [isLogin, router]);

  return (
    <Layout>
      <Signup />
      <Login />
    </Layout>
  );
};

export default Home;

{
  /* <p>or</p>
          Githubで簡単サインイン
          <SignInGithub /> */
}
