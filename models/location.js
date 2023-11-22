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
      locationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      averageRating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "location",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["locationId", "name", "address"],
        },
      ],
    }
  );

  return Location;
};