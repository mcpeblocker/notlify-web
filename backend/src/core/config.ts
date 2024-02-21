import { config as configEnv } from "dotenv";

configEnv();

export const config = {
  port: process.env.PORT || 8000,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/notlify",
  jwtSecret: process.env.JWT_SECRET!,
  token_expire_date: Number(process.env.TOKEN_EXPIRE_DATE) || 10
};
