import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Location, Matching, MatchingLocation, Account } from "../../models";
import { Op } from "sequelize";
import { getMatchingInfoByUserId } from "../utils/getMatchingInfoByUserId";
import Dayjs from "dayjs";

const MatchingController = {
  matchingList: async (req, res) => {
    const userId = req.params.id;
    try {
      const matchingList = await getMatchingInfoByUserId(userId);
      res.status(StatusCodes.OK).json(matchingList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  getMatchingByJpId: async (req, res) => {
    try {
      const userId = req.params.id;
      const matchingList = await Matching.findAll({
        include: [
          {
            model: Location,
            required: true,
          },
        ],
        where: {
          japUserId: userId,
        },
      });

      const formattedList = matchingList.map((matching) =>
        formatMatchingInfo(matching)
      );

      res.status(StatusCodes.OK).json(formattedList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  getMatchingByTgId: async (req, res) => {
    try {
      const userId = req.params.id;
      const matchingList = await Matching.findAll({
        include: [
          {
            model: Location,
            required: true,
          },
          {
            model: Account,
            required: true,
            as: "japUser",
          },
        ],
        where: {
          tourGuideId: userId,
        },
      });

      res.status(StatusCodes.OK).json(matchingList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  createMatching: async (req, res) => {
    try {
      const { japUserId, tourGuideId, locationId, matchingDate } = req.body;
      const existMatching = await Matching.findAll({
        where: {
          japUserId,
          tourGuideId,
        },
      });
      const existMatchingFilter = existMatching.filter((matching) => {

        const isSameDate =
          Dayjs(matching.dataValues.matchingDate).format("YYYY/MM/DD") ===
          Dayjs(matchingDate).format("YYYY/MM/DD");
        return isSameDate && matching.dataValues.status === "保留中";
      });

      if (existMatchingFilter.length !== 0)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Can't match the same person on the same day" });

      const matching = await Matching.create({
        japUserId,
        tourGuideId,
        matchingDate,
        status: "保留中",
      });

      const matchingLocation = await MatchingLocation.create({
        locationId,
        matchingId: matching.matchingId,
      });

      // const matchResult = await getMatchingInfo(matching.matchingId);

      res.status(StatusCodes.CREATED).json({ message: "Succefully" });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  cancelMatching: async (req, res) => {
    const matchingId = req.params.id;
    try {
      const matching = await Matching.findByPk(matchingId);

      if (!matching) {
        return res.status(404).json({ error: "Matching not found" });
      }
      // Check if the matching is cancellable (you might have additional conditions)
      if (matching.status !== "保留中") {
        return res.status(400).json({ error: "Matching cannot be canceled" });
      }

      // Update the status to "Cancel"
      matching.status = "キャンセル";
      matching.save();

      // Respond with the updated matching
      res.json({ message: "Matching canceled successfully", matching });
    } catch (error) {
      console.error("Error canceling matching:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  agreeMatching: async (req, res) => {
    const matchingId = req.params.id;
    try {
      const matching = await Matching.findByPk(matchingId);

      if (!matching) {
        return res.status(404).json({ error: "Matching not found" });
      }
      // Check if the matching is cancellable (you might have additional conditions)
      if (matching.status !== "保留中") {
        return res.status(400).json({ error: "Matching cannot be agreed" });
      }

      // Update the status to "Cancel"
      matching.status = "承認";
      matching.save();

      // Respond with the updated matching
      res.json({ message: "Matching agreed successfully", matching });
    } catch (error) {
      console.error("Error agreement matching:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

function formatMatchingInfo(matching) {
  return {
    key: matching.matching_id.toString(), // Update to 'matching_id'
    name: `${matching.japUser.username} - ${matching.tourGuide.username}`,
    date: matching.matching_date.toLocaleDateString("en-US"), // Update to 'matching_date'
    createAt: matching.created_at.toLocaleDateString("en-US"), // Update to 'created_at'
    status: matching.status,
    location:
      matching.MatchingLocations.length > 0
        ? matching.MatchingLocations[0].Location.name
        : "",
  };
}

export default MatchingController;
