import { Router } from "express";
import ProfileController from "../controllers/profile";

export default function profile(app) {
  const router = Router();
  app.use("/api/profile", router);

  router.get("/", ProfileController.profileView);
}
