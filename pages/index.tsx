import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Layout from "@/components/Layout";
import ChatApp from "@/components/ChatApp";
import styles from "../styles/pages/index.module.css";
import SignInGithub from "@/components/SignInGithub";

const Home = () => {
  const { session: isLogin } = useAuth();

  return isLogin ? (
    <Layout>
      <ChatApp />
    </Layout>
  ) : (
    <Layout>
      <Signup />
      <Login />
      <small>or</small>
      <h2>Githubでサインイン</h2>
      <SignInGithub />
    </Layout>
  );
};

export default Home;

import useAuth from "@/hooks/useAuth";
