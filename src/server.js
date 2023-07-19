import express from "express";
import setupConfig from "./config.js";
import setupRoutes from "./routes/index.js";

(async () => {
  const app = express();

  await setupConfig();

  await setupRoutes(app)

  app.use("/ping", (req, resp) => {
    resp.json({ pong: "ok", timestamp: Date.now() });
  });

  app.listen(process.env.PORT, () => {
    console.log(`App started listening on port ${process.env.PORT}`);
  });
})();
