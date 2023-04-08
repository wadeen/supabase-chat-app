import { atom } from "recoil";

type AtomProps = {
  isLogin: boolean;
};

export const authUser = atom<AtomProps>({
  key: "user",
  default: {
    isLogin: false,
  },
});
