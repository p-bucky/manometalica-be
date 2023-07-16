import { Router } from "express";
import authRoutes from "./auth.route.js";

async function setupRoutes(app) {
  const route = Router();
  route.use(app);
  route.get("/auth/google/url", authRoutes.getGoogleAuthURL);
  route.get(`/auth/google`, authRoutes.loginUser);

  app.use("/mano", route);
}

export default setupRoutes;
