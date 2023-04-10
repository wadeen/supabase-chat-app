import LogoutButton from "./LogoutButton";
import useAuth from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { session: isLogin } = useAuth();

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
