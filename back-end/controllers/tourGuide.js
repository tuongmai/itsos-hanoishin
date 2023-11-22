import { TourGuideSkill } from "../../models";
import { Account } from "../../models";

const TourGuideController = {
    getById: async (req, res) => {
    try {
      const userId = req.param("id");
      const tourGuide = await Account.findAll({
        include: [
            {
              model: TourGuideSkill,
              required: true,
            },
          ],
        where: {
          user_id: userId,
        },
      });
      res.status(201).json(tourGuide);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default TourGuideController;
