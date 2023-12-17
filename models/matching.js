"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Matching extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.MatchingLocation, {
        foreignKey: "matching_id",
      });
      this.belongsTo(models.Account, {
        foreignKey: "jap_user_id"
      });
      this.belongsTo(models.Account, {
        foreignKey: "tour_guide_id"
      });
      this.belongsToMany(models.Location, {
        through: models.MatchingLocation,
        unique: false,
        foreignKey: "matching_id"
      });
    }
  }

  Matching.init(
    {
      matching_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      jap_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tour_guide_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('キャンセル', '保留中', '拒否', '承認', '閉まった'),
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      matching_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Matching",
      tableName: "matching_tour",
      underscored: true,
      timestamps: true,
    }
  );

  return Matching;
};