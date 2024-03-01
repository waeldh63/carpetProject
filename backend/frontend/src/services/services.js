import axios from "axios";
import config from "../config";
import { jwtDecode } from "jwt-decode";

const fetchData = async () => {
  // HERE WE FETCH ALL THE THE CLIENT WE HAVE IN THE DATABASE
  try {
    const response = await fetch(config + "/api/clients");
    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postData = async (fullname, number, address) => {
  // HERE WE ADD A NEW CLIENT TO THE DATABASE
  try {
    const response = await fetch(config + "/api/addClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        number: number,
        address: address,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data from server:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const createOrder = async (
  // HERE WE CREATE A NEW ORDER
  clientId,
  image,
  status,
  price,
  large,
  medium,
  small,
  createdAt,
  updatedAt
) => {
  try {
    const response = await fetch(config + "/api/addNewOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: clientId,
        image: image,
        status: status,
        price: price,
        large: large,
        medium: medium,
        small: small,
        createdAt: createdAt,
        updatedAt: updatedAt,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data from server:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const fetchOrdres = async () => {
  // HERE WE FETCH ALL THE ORDERS
  try {
    const response = await fetch(config + "/api/orders");
    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const driverRegister = async (username, password, number) => {
  // HERE WE REGISTER A NEW DRIVER
  try {
    await axios.post(config + "/register", { username, password, number });
    console.log("Registration successful");
  } catch (error) {
    console.error(
      "Registration error:",
      error.response?.data?.message || "Unknown error"
    );
  }
};

async function driverLogin(username, password) {
  // HERE WE LLOGIN AS A DRIVER AND WE SAVE THE TOKEN IN COOKIES
  try {
    const response = await axios.post(config + "/login", {
      username,
      password,
    });
    const token = response.data.driver;
    console.log(token);
    setCookie("token", token, 1);
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data?.message || "Unknown error"
    );
  }
}

function setCookie(name, value, days) {
  // FUNCTION TO SAVE THE TOKEN IN COOKIES
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

const services = {
  postData,
  fetchData,
  createOrder,
  fetchOrdres,
  driverRegister,
  driverLogin,
};
export default services;
