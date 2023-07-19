import dotenv from "dotenv";
import { setupSequelize } from "./db.config.js";

async function setupConfig() {
  dotenv.config();
  
  await setupSequelize()
}

export default setupConfig;
