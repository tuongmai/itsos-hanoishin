import { Location } from "../../models";

const TourGuideController = {
    getById: async (req, res) => {
    try {
      const locationId = req.param("id");
      const location = await Location.findOne({
        where: {
          location_id: locationId,
        },
      });
      res.status(201).json(location);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default TourGuideController;
