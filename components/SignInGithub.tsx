/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

const SignInGithub = () => {
  const { signInWithGithub, error } = useAuth();

  return (
    <div css={wrapper}>
      <button onClick={signInWithGithub}>
        <Image src="/github.svg" alt="Github" width={20} height={20} />
        Githubでサインインする
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInGithub;

const wrapper = css`
  display: grid;
  place-content: center;
  margin-block: 80px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    background-color: #272b33;
    width: 250px;
    margin-inline: auto;
    line-height: 45px;
    color: #fff;
    font-weight: 700;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
`;
