import { Database } from "@/lib/supabase";
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import useAuth from "@/hooks/useAuth";

const ChatApp = () => {
  const [inputText, setInputText] = useState(""); // 入力テキスト
  const [messageText, setMessageText] = useState<Database[]>([]); // メッセージ

  const { session } = useAuth();

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
              const { createdAt, id, message, userEmail } = payload.new;
              setMessageText((messageText) => [...messageText, { createdAt, id, message, userEmail }]);
            }
          }
        )
        .subscribe();

      // リスナーの解除
      return () => {
        supabase.channel("table_postgres_changes").unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };

  // 初回のみ全データフェッチとリアルタイムリスナー登録
  useEffect(() => {
    (async () => {
      const allMessage = await fetchDatabase();
      setMessageText(allMessage as Database[]); // '{ [x: string]: any; }[] | null'
      // const { data } = await supabase.auth.getUser();
    })();
    fetchRealtimeData();
  }, []);

  // 入力したテキスト
  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => setInputText(() => event.target.value);

  // メッセージの送信
  const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    addSupabaseData({ message: inputText }); // DBに追加
    setInputText(() => ""); // 送信後は空にする
  };

  return (
    <div>
      {messageText.map((item) => (
        <div key={item.id}>
          <p>{item.message}</p>
          <p>messaged by {item.userEmail}</p>
        </div>
      ))}

      <form onSubmit={onSubmitNewMessage}>
        <input type="text" name="message" value={inputText} onChange={onChangeInputText} aria-label="新規メッセージ" />
        <button type="submit" disabled={inputText === ""}>
          送信
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
