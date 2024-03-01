// TODO WE NEED TO ADD FEATUR  SEARCH FOR A CLIENT

import React, { useEffect, useState } from "react";
import services from "../services/services";
import Card from "react-bootstrap/Card";
import ImageDisplay from "./ImageDisplay";
const Orders = () => {
  const [orderData, setorderData] = useState([]); // HERE WE WILL SAVE THE DATA OF THE ORDERS FETCHED FROM THE DATABASE TO DISPLAY IT IN FRONT END

  useEffect(() => {
    fetchOrdres(); // HERE WE CALL THE FETCH DATA FROM DATABASE
  }, []);
  const fetchOrdres = async () => {
    // fetch data we get all orders data and we save it in a var to display it
    try {
      const orderData = await services.fetchOrdres();
      setorderData(orderData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      {orderData.map((item) => (
        <Card key={item.id} style={{ width: "18rem" }} className="mt-3">
          <Card.Body>
            <Card.Title>Order id {item.id}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              price: {item.price}$
            </Card.Subtitle>
            <Card.Text>clientId:{item.clientId}</Card.Text>
            {/* <ImageDisplay blobData={item.image} /> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
