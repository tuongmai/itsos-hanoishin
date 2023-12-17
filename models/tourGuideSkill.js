"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TourGuideSkill extends Model {
    static associate(models) {
    //   define association here
      this.belongsTo(models.TourGuideSkill, {
        foreignKey: "tour_guide_id"
      });
    }
  }

  TourGuideSkill.init(
    {
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Set auto-increment
        primaryKey: true, // Define it as the primary key
      },
      tour_guide_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      skill_detail: {
        type: DataTypes.STRING,
        defaultValue: null,
      }
    },
    {
      sequelize,
      modelName: "TourGuideSkill",
      tableName: "tour_guide_skill",
      underscored: true,
      timestamps: true
    }
  );

  return TourGuideSkill;
};