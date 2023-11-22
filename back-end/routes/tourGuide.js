import { Router } from "express";
import TourGuideController from "../controllers/tourGuide";

export default function tourGuide(app) {
  const router = Router();
  app.use("/api/tourGuide", router);



  // GET {baseURL}/api/account/:id
  router.get( "/:id", TourGuideController.getById);
}
