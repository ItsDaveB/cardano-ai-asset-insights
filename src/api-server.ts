import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { initializeDatabase } from "./database/connection";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startApiServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
}

startApiServer();
