"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.TourGuideSkill, {
      //   foreignKey: "entityId",
      // });
    }
  }
  Account.init(
    {
      userId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      firstname: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastname: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      phone: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "account",
      underscored: true,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_id", "email"]
        }
      ]
    }
  );
  return Account;
};
