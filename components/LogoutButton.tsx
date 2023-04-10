import useAuth from "@/hooks/useAuth";

const LogoutButton = () => {
  const { signOut } = useAuth();
  return <button onClick={signOut}>ログアウト</button>;
};

export default LogoutButton;
