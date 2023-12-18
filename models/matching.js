"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Matching extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.MatchingLocation, {
        foreignKey: "matchingId",
      });
      this.belongsTo(models.Account, {
        foreignKey: "japUserId"
      });
      this.belongsTo(models.Account, {
        foreignKey: "tourGuideId"
      });
      this.belongsToMany(models.Location, {
        through: models.MatchingLocation,
        unique: false,
        foreignKey: "matchingId"
      });
    }
  }

  Matching.init(
    {
      matchingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      japUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tourGuideId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('キャンセル', '保留中', '拒否', '承認', '閉まった'),
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      matchingDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Matching",
      tableName: "matching_tour",
      underscored: true,
    }
  );

  return Matching;
};