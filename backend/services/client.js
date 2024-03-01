const { Client } = require("../models");
async function addClient(fullname, number, address) {
  try {
    const newClient = await Client.create({
      fullname,
      number,
      address,
    });

    console.log("Client added successfully:", newClient.toJSON());
    return newClient;
  } catch (error) {
    console.error("Error adding client:", error.message);
    throw error;
  }
}
async function getAllClient() {
  try {
    const clients = await Client.findAll();
    return clients;
  } catch (error) {
    console.error("Error adding client:", error.message);
    throw error;
  }
}
module.exports = { getAllClient, addClient };
