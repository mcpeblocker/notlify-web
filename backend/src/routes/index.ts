import authRouter from "./auth";
import botsRouter from "./bots";
import accessRouter from "./access";
import sendRouter from "./send";

export const routes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/bots",
    router: botsRouter,
  },
  {
    path: "/access",
    router: accessRouter,
  },
  {
    path: "/send",
    router: sendRouter,
  },
];
