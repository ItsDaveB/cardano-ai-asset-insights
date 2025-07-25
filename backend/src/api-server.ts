import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startApiServer() {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 API server running on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
}

startApiServer();
