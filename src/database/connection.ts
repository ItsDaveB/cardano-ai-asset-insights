import { AppDataSource } from "./datasource";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
    throw error;
  }
};
