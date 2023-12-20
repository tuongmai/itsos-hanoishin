import { Router } from "express";
import ReviewController from "../controllers/review";

export default function reviewRouter(app) {
  const router = Router();
  app.use("/api/review", router);

  router.get("/history/:userId", ReviewController.getReviewsByUserId);
  // Define routes for location reviews
  router.post("/location", ReviewController.createLocationReview);
  router.delete("/location/:reviewId", ReviewController.deleteLocationReview);
  router.put("/location/:reviewId", ReviewController.editLocationReview);

  // Define routes for tour guide reviews
  router.post("/tour-guide", ReviewController.createTourGuideReview);
  router.delete("/tour-guide/:reviewId", ReviewController.deleteTourGuideReview);
  router.put("/tour-guide/:reviewId", ReviewController.editTourGuideReview);
}

