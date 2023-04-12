/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useAuth from "@/hooks/useAuth";

const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <button onClick={signOut} css={button}>
      ログアウト
    </button>
  );
};

export default LogoutButton;

// css
const button = css`
  width: 100px;
  border: none;
  background-color: #b8ccae;
  cursor: pointer;
  font-weight: 700;
`;
