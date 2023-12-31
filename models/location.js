"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
    //   define association here
      this.hasMany(models.MatchingLocation, {
        foreignKey: "location_id",
      });
      this.belongsToMany(models.Matching, {
        through: models.MatchingLocation,
        unique: false,
        foreignKey: "location_id"
      });
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
      indexes: [
        {
          unique: true,
          fields: ["locationId", "name", "address"],
        },
      ],
      timestamps: false
    }
  );

  return Location;
};