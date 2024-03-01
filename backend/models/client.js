"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init(
    {
      fullname: DataTypes.STRING,
      number: DataTypes.INTEGER,
      address: DataTypes.STRING,
      // longitude: DataTypes.FLOAT,
      // latitude: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: "Client",
      timestamps: false,
    }
  );
  return Client;
};
