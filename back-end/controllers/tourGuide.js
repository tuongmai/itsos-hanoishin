import { TourGuideSkill } from "../../models";
import { Op } from "sequelize";
import { Account, TourGuideLocation, Location } from "../../models";

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
      res.status(500).send("Internal Server Error");
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
          {
            model: TourGuideLocation,
            required: true,
            include: [
              {
                model: Location,
                required: true,
              },
            ],
          },
        ],
        where: {
          user_id: userId,
        },
      });
      res.status(201).json(tourGuide);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
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
                [Op.like]: "%" + skillName + "%",
              },
            },
          },
        ],
        attributes: ["user_id"],
      });
      const tourGuideIds = tourGuideSkillQuery.map((x) => x.user_id);
      const tourGuide = await Account.findAll({
        include: [
          {
            model: TourGuideSkill,
            required: true,
          },
        ],
        where: {
          user_id: {
            [Op.in]: tourGuideIds,
          },
        },
      });
      res.status(201).json(tourGuide);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getTourGuideByLocationId: async (req, res) => {
    try {
      const locationId = req.param("locationId");
      const tourGuideList = await Account.findAll({
        include: [
          {
            model: TourGuideLocation,
            require: true,
            where: {
              location_id: locationId,
            },
          },
          {
            model: TourGuideSkill,
            require: true,
          },
        ],
      });
      res.status(201).json(tourGuideList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  searchByName: async (req, res) => {
    try {
      const name = req.param("name");
      const tourGuide = await Account.findAll({
        include: [
          {
            model: TourGuideSkill,
            required: false,
          },
        ],
        where: {
          username: {
            [Op.like]: "%" + name + "%",
          },
          role: "TOURGUIDE",
        },
      });
      res.status(201).json(tourGuide);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default TourGuideController;
