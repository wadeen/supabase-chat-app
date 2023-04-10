import useAuth from "@/hooks/useAuth";

const SignInGithub = () => {
  const { signInWithGithub, error } = useAuth();

  return (
    <div>
      <button onClick={signInWithGithub}>Githubでサインインする</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInGithub;
