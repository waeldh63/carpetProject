const { Drivers } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function addDriver(username, password, number) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = await Drivers.create({
      username,
      password: hashedPassword,
      number,
    });

    console.log("Client added successfully:", newDriver.toJSON());
    return newDriver;
  } catch (error) {
    console.error("Error adding client:", error.message);
    throw error;
  }
}
async function loginDriver(username, password) {
  try {
    const driver = await Drivers.findOne({ where: { username } });
    console.log(driver);
    console.log(bcrypt.compare(password, driver.password));

    if (driver && (await bcrypt.compare(password, driver.password))) {
      console.log(driver);

      const token = jwt.sign(
        { driver: driver.dataValues.username, driverId: driver.dataValues.id },
        "e5383b8d051c50c5c0e45b79cc42308165f8c82ff2f9e33fc91403dd353d3de6",
        { expiresIn: "1h" }
      );
      console.log(token);
      return token;
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error login:", error.message);
    throw error;
  }
}
module.exports = { addDriver, loginDriver };
