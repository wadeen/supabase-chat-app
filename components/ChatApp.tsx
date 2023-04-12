/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Database } from "@/lib/supabase";
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { dateToString } from "@/utils/dateToString";

const ChatApp = () => {
  const [inputText, setInputText] = useState(""); // 入力テキスト
  const [messageText, setMessageText] = useState<Database[]>([]); // メッセージ
  const { session: isLogin, profileFromGithub } = useAuth();
  const router = useRouter();

  // ログアウト済みの場合はログインページにリダイレクト
  if (!isLogin) router.push("/");

  // リアルタイムデータ更新
  const fetchRealtimeData = () => {
    try {
      supabase
        .channel("table_postgres_changes") // 任意のチャンネル名
        .on(
          "postgres_changes", // ここは固定
          {
            event: "*", // "INSERT" | "DELETE" | "UPDATE"  条件指定が可能
            schema: "public",
            table: TABLE_NAME, // DBのテーブル名
          },
          (payload) => {
            // データ登録
            if (payload.eventType === "INSERT") {
              const { createdAt, id, message, avatarUrl, nickName } = payload.new;
              setMessageText((messageText) => [...messageText, { createdAt, id, message, avatarUrl, nickName }]);
            }
          }
        )
        .subscribe();

      // リスナーの解除
      return () => supabase.channel("table_postgres_changes").unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  // 初回のみ全データフェッチとリアルタイムリスナー登録
  useEffect(() => {
    (async () => {
      const allMessage = await fetchDatabase();
      setMessageText(allMessage as Database[]); // '{ [x: string]: any; }[] | null'
    })();
    fetchRealtimeData();
  }, []);

  // 入力したメッセージ
  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => setInputText(() => event.target.value);

  // メッセージの送信
  const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    addSupabaseData({ message: inputText, ...profileFromGithub }); // DBに追加
    setInputText("");
  };

  return (
    <div css={wrapper}>
      {messageText.map((item) => (
        // 自分のチャットの時は右側に表示
        <div key={item.id} data-my-chat={item.nickName === profileFromGithub.nickName} css={chatWrapper}>
          <div css={chatProfile}>
            <time>{dateToString(item.createdAt, "MM/DD HH:mm")}</time>
            <a href={`https://github.com/${item.nickName}`} target="_blank" rel="noopener noreferrer" css={chatLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {item.avatarUrl ? <img src={item.avatarUrl} alt="アイコン" width={80} height={80} /> : <Image src="/noimage.png" alt="no image" width={80} height={80} />}
              <p>{item.nickName ? item.nickName : "名無し"}</p>
            </a>
          </div>
          <div css={chatMessage}>
            <p>{item.message}</p>
          </div>
        </div>
      ))}

      <form onSubmit={onSubmitNewMessage} css={formArea}>
        <input type="text" name="message" value={inputText} onChange={onChangeInputText} aria-label="新規メッセージを入力" />
        <button type="submit" disabled={inputText === ""}>
          送信
        </button>
      </form>
    </div>
  );
};

export default ChatApp;

// css
const wrapper = css`
  display: block;
  width: min(100%, 800px);
  margin-inline: auto;
  overflow: auto;
  max-height: 600px;
  padding-bottom: 80px;
`;

const chatWrapper = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &[data-my-chat="true"] {
    flex-direction: row-reverse;
  }
`;

const chatProfile = css`
  display: flex;
  flex-direction: column;

  time {
    font-size: 10px;
    text-align: center;
  }
`;

const chatLink = css`
  img {
    display: block;
    margin-inline: auto;
    border-radius: 50%;
  }
  p {
    margin: 6px;
    font-size: 12px;
    text-align: center;
  }
`;

const chatMessage = css`
  background-color: #fff;
  padding: 20px 30px;
  margin-inline: 30px;
  border-radius: 20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  p {
    margin: 0;
    padding: 0;
  }
`;

const formArea = css`
  display: flex;
  justify-content: center;
  height: 35px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #c5f1fd;

  input {
    width: 250px;
    height: 100;
  }
  button {
    height: 100%;
  }
`;
