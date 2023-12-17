"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MatchingLocation extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Matching, {
        foreignKey: "matching_id",
      });
      this.belongsTo(models.Location, {
        foreignKey: "location_id",
      });
    }
  }

  MatchingLocation.init(
    {
      matching_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      matching_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "MatchingLocation",
      tableName: "matching_location",
      underscored: true,
      timestamps: true
    }
  );

  return MatchingLocation;
};