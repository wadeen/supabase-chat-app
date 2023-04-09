import Layout from "@/components/Layout";
import { authUser } from "@/components/atom/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const { isLogin } = useRecoilValue(authUser);

  console.log("isLogin, chat: ", isLogin);

  const router = useRouter();

  // ログインしていない場合はログインページに遷移
  useEffect(() => {
    isLogin || router.push("/");
  }, [isLogin, router]);

  return isLogin ? (
    <Layout>
      <h1>チャットアプリ</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://www.wadeen.net/images/profile/chara.png" width={370} height={320} alt="dummy image" />
    </Layout>
  ) : (
    <div>
      <p>ログインに失敗しました。</p>
      <Link href={"/"}>Homeへ戻る</Link>
    </div>
  );
};

export default Chat;
