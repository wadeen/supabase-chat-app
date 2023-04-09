import { useRecoilValue } from "recoil";
import LogoutButton from "./LogoutButton";
import { authUser } from "./atom/auth";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { isLogin } = useRecoilValue(authUser);

  return (
    <>
      <header>
        {isLogin && <LogoutButton />}
        <p>This is the header area</p>
        <hr />
      </header>
      {children}
      <footer>
        <hr />
        <p>This is the footer area</p>
      </footer>
    </>
  );
};

export default Layout;
