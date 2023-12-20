import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  TourGuideReview,
  LocationReview,
  Account,
  Location,
} from "../../models";

const ReviewController = {
  createTourGuideReview: async (req, res) => {
    try {
      const { tourGuideId, japUserId, content, rating } = req.body;

      const tourGuideReview = await TourGuideReview.create({
        tour_guide_id: tourGuideId,
        jap_user_id: japUserId, // Make sure japUserId has a valid value
        content,
        rating,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.status(StatusCodes.CREATED).json({ tourGuideReview });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  createLocationReview: async (req, res) => {
    try {
      const { locationId, japUserId, content, rating } = req.body;

      const locationReview = await LocationReview.create({
        location_id: locationId,
        jap_user_id: japUserId,
        content,
        rating,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.status(StatusCodes.CREATED).json({ locationReview });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  getReviewsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const tourGuideReviews = await TourGuideReview.findAll({
        where: { jap_user_id: userId },
        include: [
          {
            model: Account,
            as: "tourGuide",
            attributes: ["username"],
          },
        ],
      });

      const locationReviews = await LocationReview.findAll({
        where: { jap_user_id: userId },
        include: [
          {
            model: Location,
            as: "location",
            attributes: ["name"],
          },
        ],
      });
      const mappedTourGuideReviews = tourGuideReviews.map((review) => {
        return {
          reviewId: review.tour_guide_review_id,
          tour_guide_id: review.tour_guide_id,
          jap_user_id: review.jap_user_id,
          content: review.content,
          rating: review.rating,
          created_at: review.created_at,
          updated_at: review.updated_at,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          tourGuide: review.tourGuide,
        };
      });

      // Map locationReviews to change keys
      const mappedLocationReviews = locationReviews.map((review) => {
        return {
          reviewId: review.location_review_id,
          location_id: review.location_id,
          jap_user_id: review.jap_user_id,
          content: review.content,
          rating: review.rating,
          created_at: review.created_at,
          updated_at: review.updated_at,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          location: review.location,
        };
      });
      return res.status(StatusCodes.OK).json({
        tourGuideReviews: mappedTourGuideReviews,
        locationReviews: mappedLocationReviews,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  deleteLocationReview: async (req, res) => {
    try {
      const { reviewId } = req.params;

      const review = await LocationReview.findByPk(reviewId);

      if (!review) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: ReasonPhrases.NOT_FOUND });
      }
      await review.destroy();

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  editLocationReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { content, rating } = req.body;

      const review = await LocationReview.findByPk(reviewId);
      if (!review) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: ReasonPhrases.NOT_FOUND });
      }
      review.content = content;
      review.rating = rating;
      review.updated_at = new Date();
      await review.save();

      return res.status(StatusCodes.OK).json({ locationReview: review });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  deleteTourGuideReview: async (req, res) => {
    try {
      const { reviewId } = req.params;

      // Find the review by ID
      const review = await TourGuideReview.findByPk(reviewId);

      // If the review is not found, return a 404 response
      if (!review) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: ReasonPhrases.NOT_FOUND });
      }

      // Delete the review
      await review.destroy();

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  editTourGuideReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { content, rating } = req.body;

      // Find the review by ID
      const review = await TourGuideReview.findByPk(reviewId);

      // If the review is not found, return a 404 response
      if (!review) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: ReasonPhrases.NOT_FOUND });
      }

      // Update the review
      review.content = content;
      review.rating = rating;
      review.updated_at = new Date();
      await review.save();

      return res.status(StatusCodes.OK).json({ tourGuideReview: review });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
};

export default ReviewController;
