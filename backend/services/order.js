const { Orders } = require("../models");
async function addOrders(
  clientId,
  image,
  status,
  price,
  large,
  medium,
  small,
  createdAt,
  updatedAt
) {
  try {
    const newOrders = await Orders.create({
      clientId,
      image,
      status,
      price,
      large,
      medium,
      small,
      createdAt,
      updatedAt,
    });

    console.log("Order added successfully:", newOrders.toJSON());
    return newOrders;
  } catch (error) {
    console.error("Order adding :", error.message);
    throw error;
  }
}
async function getAllOrders() {
  try {
    const AllOrders = await Orders.findAll();
    return AllOrders;
  } catch (error) {
    console.error("Error get Orders:", error.message);
    throw error;
  }
}
module.exports = { getAllOrders, addOrders };
