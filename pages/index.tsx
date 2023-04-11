import Layout from "@/components/Layout";
import ChatApp from "@/components/ChatApp";
import SignInGithub from "@/components/SignInGithub";

const Home = () => {
  const { session: isLogin } = useAuth();

  // ログインしている場合のみチャットページを表示
  return isLogin ? (
    <Layout>
      <h2>呟きエンジニア</h2>
      <ChatApp />
    </Layout>
  ) : (
    <Layout>
      <h2>Githubでサインイン</h2>
      <SignInGithub />
    </Layout>
  );
};

export default Home;

import useAuth from "@/hooks/useAuth";
