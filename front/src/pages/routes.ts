import HomePage from "./index";
import SigninPage from "./signin";

import UserIdPage from "./user/[user_id]";

import NotFound from "./404";

interface Routes {
  key: number;
  path: string;
  Component: () => JSX.Element;
}

export const routes: Routes[] = [
  {
    key: 1,
    path: "/",
    Component: HomePage,
  },
  {
    key: 2,
    path: "/signin",
    Component: SigninPage,
  },
  {
    key: 3,
    path: "/user/:user_id",
    Component: UserIdPage,
  },

  {
    key: 404,
    path: "*",
    Component: NotFound,
  },
];
