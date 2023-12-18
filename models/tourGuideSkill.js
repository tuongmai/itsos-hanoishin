"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TourGuideSkill extends Model {
    static associate(models) {
    //   define association here
      this.belongsTo(models.TourGuideSkill, {
        foreignKey: "tourGuideId"
      });
    }
  }

  TourGuideSkill.init(
    {
      skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Set auto-increment
        primaryKey: true, // Define it as the primary key
      },
      tourGuideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      skillDetail: {
        type: DataTypes.STRING,
        defaultValue: null,
      }
    },
    {
      sequelize,
      modelName: "TourGuideSkill",
      tableName: "tour_guide_skill",
      underscored: true,
    }
  );

  return TourGuideSkill;
};