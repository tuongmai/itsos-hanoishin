import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Location, Matching, MatchingLocation } from "../../models";

const MatchingController = {
  matchingList: async (req, res) => {
    try {
      // const searchText = req.query.searchText || "";
      const matchingList = await Matching.findAll({
        include: [
            {
              model: Location,
              required: true,
            },
          ]
      });

      res.status(201).json(matchingList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  getMatchingByJpId: async (req, res) => {
    try {
      const userId = req.param("id");
      const matchingList = await Matching.findAll({
        include: [
            {
              model: Location,
              required: true,
            },
          ],
        where: {
          jap_user_id: userId,
        }
      });

      res.status(201).json(matchingList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  getMatchingByTgId: async (req, res) => {
    try {
      const userId = req.param("id");
      const matchingList = await Matching.findAll({
        include: [
            {
              model: Location,
              required: true,
            },
          ],
        where: {
          tour_guide_id: userId,
        }
      });

      res.status(201).json(matchingList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  createMatching: async (req, res) => {
    try {
      const { jap_user_id, tour_guide_id, location_id, matching_date } = req.body;
      const existMatching = await Matching.findOne({
        where: {
          jap_user_id, tour_guide_id, matching_date
        }
      });

      if (existMatching)
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Can\'t match same person on same day' });

      const matching = await Matching.create({
        jap_user_id, tour_guide_id, matching_date,
        status: "BOOKED"
      })

      const matchingLocation = await MatchingLocation.create({
        location_id,
        matching_id: matching.matching_id
      })

      const matchResult = await Matching.findOne({
        include: [
            {
              model: Location,
              required: true,
            },
          ],
        where: {
          matching_id: matching.matching_id
        }
      });

      res.status(201).json(matchResult);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
};

export default MatchingController;
