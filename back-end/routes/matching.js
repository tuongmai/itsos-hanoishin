import { Router } from "express";
import MatchingController from "../controllers/matching";

export default function location(app) {
  const router = Router();
  app.use("/api/matching", router);

  //debug route
  router.get("/", MatchingController.matchingList);

  //real routes
  // router.get("/:japaneseId", MatchingController.getMatchingByJpId);
  // router.get("/:tourGuideId", MatchingController.getMatchingByTgId);
  // router.post("/", MatchingController.createMatching);
}
