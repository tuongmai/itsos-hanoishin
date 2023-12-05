import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Location } from "../../models";
import { Op } from "sequelize";

const LocationController = {
  locationList: async (req, res) => {
    try {
      const searchText = req.query.searchText || "";
      const locationList = await Location.findAll({
        where: {
          name: { [Op.iLike]: `%${searchText}%` }
        },
        order: [["locationId", "ASC"], ["averageRating", "ASC"]]
      });

      res.status(201).json(locationList);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await Location.findOne({
        where: {
          locationId
        }
      });

      if (!location)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });

      res.status(201).json(location);
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

export default LocationController;
