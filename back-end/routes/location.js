import { Router } from "express";
import LocationController from "../controllers/location";

export default function tourGuide(app) {
  const router = Router();
  app.use("/api/location", router);



  // GET {baseURL}/api/account/:id
  router.get( "/:id", LocationController.getById);
}
