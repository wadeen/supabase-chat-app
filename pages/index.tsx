/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "@/components/Layout";
import ChatApp from "@/components/ChatApp";
import useAuth from "@/hooks/useAuth";
import SignInGithub from "@/components/SignInGithub";

const Home = () => {
  const { session: isLogin } = useAuth();

  // ログインしている場合のみチャットページを表示
  return isLogin ? (
    <Layout>
      <h2 css={title}>オープンチャット</h2>
      <ChatApp />
    </Layout>
  ) : (
    <Layout>
      <h2 css={title}>Githubでサインイン</h2>
      <SignInGithub />
    </Layout>
  );
};

export default Home;

// css
const title = css`
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
`;
