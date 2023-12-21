"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TourGuideLocation extends Model {
    static associate(models) {
        this.belongsTo(models.Location, {
            foreignKey: "location_id"
        });
        this.belongsTo(models.Account, {
            foreignKey: "tour_guide_id"
        });
    }
  }

  TourGuideLocation.init(
    {
      tour_guide_location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tour_guide_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TourGuideLocation",
      tableName: "tour_guide_location", // Adjust the table name as needed
      underscored: true,
      timestamps: false,
    }
  );

  return TourGuideLocation;
};