"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
    //   define association here
    //   this.belongsTo(models.TourGuideSkill, {
    //     foreignKey: "tour_guide_id"
    //   });
    }
  }

  Location.init(
    {
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Set auto-increment
        primaryKey: true, // Define it as the primary key
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      average_rating: {
        type: DataTypes.DOUBLE,
        defaultValue: null,
      }
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "location",
      underscored: true,
      timestamps: false
    }
  );

  return Location;
};