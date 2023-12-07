import { TourGuideSkill } from "../../models";
import { Account } from "../../models";
import { Op } from "sequelize";

const TourGuideController = {
  tourGuideList: async (req, res) => {
    try {
      const tourGuide = await Account.findAll({
        include: [
            {
              model: TourGuideSkill,
              required: true,
            },
          ],
      });
      res.status(201).json(tourGuide);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    },
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
  searchBySkillName: async (req, res) => {
    try {
      const skillName = req.param("name");
      const tourGuideSkillQuery = await Account.findAll({
        include: [
            {
              model: TourGuideSkill,
              required: true,
              where: {
                skill: {
                  [Op.like]: '%' + skillName + '%'
                },
              },
            },
          ],
        attributes: ['user_id'],
      });
      const tourGuideIds = tourGuideSkillQuery.map(x => x.user_id)
      const tourGuide = await Account.findAll({
        include: [
            {
              model: TourGuideSkill,
              required: true,
            },
          ],
        where: {
          user_id: {
            [Op.in]: tourGuideIds
          },
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
