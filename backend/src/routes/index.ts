import authRouter from "./auth";
import botsRouter from "./bots";
import accessRouter from "./access";

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
];
