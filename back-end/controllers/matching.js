import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Location, Matching } from "../../models";
import { Op } from "sequelize";

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
  createLocation: async (req, res) => {
    try {
      const { name, address, description, image, averageRating } = req.body;
      const existLocation = await Location.findOne({
        where: {
          name, address, description, image, averageRating
        }
      });

      if (existLocation)
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Location already registered' });

      const location = await Location.create({
        name, address, description, image, averageRating
      })

      res.status(201).json(location);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
};

export default MatchingController;
