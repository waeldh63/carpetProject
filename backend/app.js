const express = require("express");
const cors = require("cors");

const { Client } = require("./models"); // Update the path accordingly
const services = require("./services/client");
const servicesOrder = require("./services/order");
const servicesDriver = require("./services/driver");
const config = require("./config");
const app = express();
const port = config.port;
app.use(express.json());
app.use(cors());
const { getAllClient, addClient } = services;
const { addOrders, getAllOrders } = servicesOrder;
const { addDriver, loginDriver } = servicesDriver;

app.get("/api/clients", async (req, res) => {
  try {
    const clients = await getAllClient();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addClient", async (req, res) => {
  try {
    const { fullname, number, address } = req.body;

    const clients = await addClient(fullname, number, address);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addNewOrder", async (req, res) => {
  try {
    const {
      clientId,
      image,
      status,
      price,
      large,
      medium,
      small,
      createdAt,
      updatedAt,
    } = req.body;

    const Orders = await addOrders(
      clientId,
      image,
      status,
      price,
      large,
      medium,
      small,
      createdAt,
      updatedAt
    );
    res.status(200).json(Orders);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Registration route
app.post("/register", async (req, res) => {
  try {
    const { username, password, number } = req.body;
    const Orders = await addDriver(username, password, number);
    res.status(200).json(Orders);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const driver = await loginDriver(username, password);

    res.json({ driver });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
