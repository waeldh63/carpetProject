import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Clients from "./clients";
import Orders from "../components/orders";
import UserAuth from "../components/userAuth";

import { useDriverContext } from "../users/DriverProvider";

const Home = () => {
  const [activeKey, setActiveKey] = useState("clients"); // HERE WE DETECT IN ANY TAB WE ARE THIS IS AN ACTIVE KEY FOR TABS
  const { driverInfo, updateDriverInfo } = useDriverContext(); //  HERE WE ACCESS THE DATA OF THE DRIVER THAT IS LOGED IN

  const handleTabSelect = (selectedKey) => {
    // HERE WE CHANGE THE ACTIVE KEY ON CLICK ON ANY TAB
    setActiveKey(selectedKey);
  };

  const handleOrdersTabClick = () => {
    setActiveKey("orders");
  };

  return (
    <Tabs
      defaultActiveKey="clients"
      id="uncontrolled-tab-example"
      className="mb-3"
      activeKey={activeKey}
      onSelect={handleTabSelect}
    >
      <Tab eventKey="home" title="Home">
        <UserAuth />
      </Tab>
      <Tab eventKey="clients" title="clients">
        {driverInfo.id != -1 ? (
          <Clients />
        ) : (
          <>
            <p>you need to login</p>
          </>
        )}
      </Tab>
      <Tab eventKey="orders" title="Orders" onClick={handleOrdersTabClick}>
        {driverInfo.id != -1 ? (
          <Orders key={activeKey === "orders" ? "orders" : "other"} />
        ) : (
          <>
            <p>you need to login</p>
          </>
        )}
      </Tab>
    </Tabs>
  );
};

export default Home;
