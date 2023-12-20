"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TourGuideReview extends Model {
    static associate(models) {
      this.belongsTo(models.Account, {
        foreignKey: "tour_guide_id",
        as: "tourGuide",
      });
      this.belongsTo(models.Account, {
        foreignKey: "jap_user_id",
        as: "japaneseUser",
      });
    }
  }

  TourGuideReview.init(
    {
      tour_guide_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tour_guide_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jap_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TourGuideReview",
      tableName: "tour_guide_review",
      underscored: true,
    }
  );

  return TourGuideReview;
};
