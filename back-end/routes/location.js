import { Router } from "express";
import LocationController from "../controllers/location";

export default function location(app) {
  const router = Router();
  app.use("/api/location", router);

  router.get("/", LocationController.locationList);
  router.get("/:locationId", LocationController.getLocationById);
  router.post("/", LocationController.createLocation);
}
