import React, { useState } from "react";
import NumericInput from "react-numeric-input";
import services from "../services/services";
import Button from "react-bootstrap/Button";

const ClientOrder = ({ client_id }) => {
  const [large_carpet_number, set_large_carpet_number] = useState(0); // this var is for the number of large carpet to add it to the order
  const [medium_carpet_number, set_medium_carpet_number] = useState(0); // this var is for the number of medium carpet to add it to the order
  const [small_carpet_number, set_small_carpet_number] = useState(0); // this var is for the number of small carpet to add it to the order
  const [price, set_price] = useState(0); // this var is for the price of the order
  const [image, setImage] = useState(null); // this var is to get the path of the image

  const handlePriceChange = (
    // this function will change the price of the order if any number of carpet has changed
    large_carpet_number,
    medium_carpet_number,
    small_carpet_number
  ) => {
    set_price(
      large_carpet_number * 100 +
        medium_carpet_number * 50 +
        small_carpet_number * 25
    );
  };

  const createNewOrder = async () => {
    //here we create a new order , we call the createorder function that call the api in services file
    try {
      const clientsData = await services.createOrder(
        client_id,
        image,
        "shipping",
        price,
        large_carpet_number,
        medium_carpet_number,
        small_carpet_number,
        null,
        null
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (event) => {
    // here we select the path of the image
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div>
      <input type="file" onChange={onImageChange} className="filetype" />
      <img alt="preview image" src={image} style={{ maxWidth: "100%" }} />
      <p>large</p>
      <NumericInput
        min={0}
        max={100}
        value={large_carpet_number}
        onChange={(v) => {
          set_large_carpet_number(v);
          handlePriceChange(v, medium_carpet_number, small_carpet_number);
        }}
      />

      <p>medium</p>
      <NumericInput
        min={0}
        max={100}
        value={medium_carpet_number}
        onChange={(v) => {
          set_medium_carpet_number(v);
          handlePriceChange(large_carpet_number, v, small_carpet_number);
        }}
      />

      <p>small</p>
      <NumericInput
        min={0}
        max={100}
        value={small_carpet_number}
        onChange={(v) => {
          set_small_carpet_number(v);
          handlePriceChange(large_carpet_number, medium_carpet_number, v);
        }}
      />

      <p> price: {price} </p>

      <Button variant="primary" onClick={createNewOrder}>
        save{" "}
      </Button>
    </div>
  );
};

export default ClientOrder;
