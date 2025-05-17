import logger from "../utils/logger";
import { AppDataSource } from "./datasource";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("✅ Database connected");
  } catch (error) {
    logger.error("❌ Failed to initialize database:", error);
    throw error;
  }
};
