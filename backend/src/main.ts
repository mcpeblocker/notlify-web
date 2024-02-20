import express from "express";
import { config } from "./core/config";
import { logger } from "./core/logger";
import { server } from "./core/server";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import { initDb } from "./core/database";
import { ErrorHandle } from "./middlewares/errorHandle";

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

for (let route of routes) {
  server.use(route.path, route.router);
  logger.silly(`Route initialized: ${route.path}`);
}

server.use(ErrorHandle);

process.on("unhandledRejection", (reason: any) => {
  logger.error(`Unhandled Rejection: ${reason?.message || "Unknown reason"}`, {
    reason,
  });
});
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

initDb(config.dbUri);

server.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}`);
});
