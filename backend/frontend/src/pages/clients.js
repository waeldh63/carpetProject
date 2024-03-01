import React, { useState, useEffect } from "react";
import services from "../services/services";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import ClientOrder from "../components/clientOrder";
const Clients = () => {
  const [dataClient, set_Data_Client] = useState([]); // var to save the client we fetched from database
  const [addNewClientModal, set_add_new_client_modal] = useState(false); //  VAR TO SHOW MODAL THAT ADD NEW CLIENT
  const [show_New_Order, set_Show_New_Order] = useState(false); // VAR TO SHOW MODAL THAT ADD NEW ORDER
  const [client_id, set_client_id] = useState(-1); // VAR TO SAVE CLIENT ID

  const [show_Alert, setShow_Alert] = useState(false); // ALERT TO SHOW THAT THE CLIENT IS ADDED SUCCESS
  const [client_name, set_client_name] = useState(""); // VAR FOR CLIENT NAME
  const [client_address, set_client_address] = useState(""); // VAR FOR CLIENT ADDRESS
  const [client_number, set_client_number] = useState(-1); // VAR FOR CLIENT NUMBER

  const handleCloseNewClientModal = () => set_add_new_client_modal(false); // here we close the new client modal
  const handleCloseNewOrder = () => set_Show_New_Order(false); // here we close the new ORDER modal
  const openNewOrder = (id) => {
    // HERE WE OPEN THE NEW ORDER MODAL AND WE SAVE THE ID OF THE CLIENT WE ARE GOING TO ADD AN ORDER FOR HIM
    set_Show_New_Order(true);
    set_client_id(id);
  };

  const handleShowAddNewClientModal = () => set_add_new_client_modal(true); //  here we open the modal of add new client
  const handlecloseAlert = () => {
    // here we close the modal of client added success and we reset the data
    setShow_Alert(false);
    set_add_new_client_modal(false);
    set_client_name("");
    set_client_address("");
    set_client_number(-1);
  };
  const handleAddClient = async () => {
    // here we add a client and we call the api from services file
    try {
      if (
        /^.+$/.test(client_name) &&
        /^.+$/.test(client_number) &&
        /^.+$/.test(client_address)
      ) {
        const clientsData = await services.postData(
          client_name,
          client_number,
          client_address
        );
        setShow_Alert(true);
        fetchClients();
      }
    } catch (error) {
      // Handle error if needed
    }
  };
   const fetchClients = async () => {
      // HERE WE FECTH ALL CLIENT WE HAVE FROM THE DATABASE
      try {
        const clientsData = await services.fetchData();
        set_Data_Client(clientsData);
      } catch (error) {
        // Handle error if needed
      }
    };

  useEffect(() => {
 
    fetchClients();
  }, []);
  return (
    <div className="ms-3">
      <>
        <Button variant="primary" onClick={handleShowAddNewClientModal}>
          Add Client
        </Button>

        <Modal show={addNewClientModal} onHide={handleCloseNewClientModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mt-3">
            <Alert
              variant="success"
              show={show_Alert}
              style={{
                position: "fixed",
                zIndex: 1000,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                textAlign: "center",
              }}
            >
              <p>client added success</p>
              <Button variant="primary" onClick={handlecloseAlert}>
                close
              </Button>
            </Alert>

            <input
              placeholder="fullname"
              className="mt-3 fs-4"
              onInput={(event) => set_client_name(event.target.value)}
            />

            <input
              placeholder="number"
              type="number"
              className="mt-3 fs-4"
              onInput={(event) => set_client_number(event.target.value)}
            />

            <input
              placeholder="address"
              className="mt-3 fs-4"
              onInput={(event) => set_client_address(event.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddClient}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {dataClient.map((item) => (
        <Card
          key={item.id}
          style={{ width: "18rem" }}
          className="mt-3"
          onClick={() => openNewOrder(item.id)}
        >
          <Card.Body>
            <Card.Title>{item.fullname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.number}
            </Card.Subtitle>
            <Card.Text>{item.address}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      <Modal show={show_New_Order} onHide={handleCloseNewOrder}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">
          <ClientOrder client_id={client_id} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Clients;
