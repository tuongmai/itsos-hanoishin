"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LocationReview extends Model {
    static associate(models) {
      this.belongsTo(models.Location, {
        foreignKey: "location_id",
        as: "location",
      });
      this.belongsTo(models.Account, {
        foreignKey: "jap_user_id",
        as: "japaneseUser",
      });
    }
  }

  LocationReview.init(
    {
      location_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location_id: {
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
      modelName: "LocationReview",
      tableName: "location_review",
      underscored: true,
    }
  );

  return LocationReview;
};
