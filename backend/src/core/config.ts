import { config as configEnv } from "dotenv";

configEnv();

export const config = {
  port: process.env.PORT || 8000,
  dbUri: process.env.DB_URI || "mongodb://localhost/notlify",
  jwtSecret: process.env.JWT_SECRET!,
};
