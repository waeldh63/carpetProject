"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init(
    {
      clientId: DataTypes.INTEGER,
      image: DataTypes.BLOB,
      status: DataTypes.STRING,
      price: DataTypes.INTEGER,
      large: DataTypes.INTEGER,
      medium: DataTypes.INTEGER,
      small: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
