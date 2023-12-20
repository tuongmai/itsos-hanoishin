import { Router } from "express";
import MatchingController from "../controllers/matching";

export default function location(app) {
  const router = Router();
  app.use("/api/matching", router);

  //debug route
  router.get("/:id", MatchingController.matchingList);

  //real routes
  router.get("/jp/:id", MatchingController.getMatchingByJpId);
  router.get("/tg/:id", MatchingController.getMatchingByTgId);
  router.post("/", MatchingController.createMatching);
  router.put("/cancel-matching/:id", MatchingController.cancelMatching);
}
