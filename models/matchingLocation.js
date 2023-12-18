"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MatchingLocation extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Matching, {
        foreignKey: "matchingId",
      });
      this.belongsTo(models.Location, {
        foreignKey: "locationId",
      });
    }
  }

  MatchingLocation.init(
    {
      matchingLocationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      matchingId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "MatchingLocation",
      tableName: "matching_location",
      underscored: true,
    }
  );

  return MatchingLocation;
};