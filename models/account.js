"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.TourGuideSkill, {
        foreignKey: "tour_guide_id",
      });
      this.hasMany(models.Matching, {
        foreignKey: "jap_user_id",
      });
      this.hasMany(models.Matching, {
        foreignKey: "tour_guide_id",
      });
    }
  }

  Account.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, // Set auto-increment
        primaryKey: true, // Define it as the primary key
      },
      username: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      phone: {
        type: DataTypes.STRING, // Assuming phone is a string
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      role: {
        type: DataTypes.ENUM('日本人', 'ツアーガイド', '管理者'),
      }
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "account",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "email"],
        },
      ],
    }
  );

  return Account;
};