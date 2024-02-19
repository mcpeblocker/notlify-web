import mongoose from "mongoose";
import { logger } from "./logger";

export const initDb = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to database");
  } catch (error) {
    logger.error("Error connecting to database", { error });
    process.exit(1);
  }
};
