"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MatchingTour extends Model {
    static associate(models) {
        this.belongsTo(models.TourGuideSkill, {
            foreignKey: "tour_guide_id"
        });
        this.belongsTo(models.Account, {
            foreignKey: "jap_user_id"
        });
    }
  }

  MatchingTour.init(
    {
      matching_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jap_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tour_guide_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('キャンセル', '保留中', '拒否', '承認', '閉まった'),
      },
      is_delete: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
      },
      matching_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MatchingTour",
      tableName: "matching_tour", // Adjust the table name as needed
      underscored: true,
      timestamps: false,
    }
  );

  return MatchingTour;
};