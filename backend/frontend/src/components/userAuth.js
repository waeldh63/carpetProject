import React, { useState } from "react";
import services from "../services/services";
import { useDriverContext } from "../users/DriverProvider";
import Alert from "react-bootstrap/Alert";
import { useCookies } from "react-cookie";

const UserAuth = () => {
  const [username, setUsername] = useState(""); // DRIVER USERNAME VAR
  const [password, setPassword] = useState(""); // DRIVER password VAR
  const [number, set_number] = useState(""); // DRIVER number VAR
  const [alert, set_show_alert] = useState(false); // THIS ALERT TO HIDE AND SHOW THE ALERT WHE A FIELD IS EMPTY
  const { driverInfo, updateDriverInfo } = useDriverContext(); // WE ACCESS HERE THE DRIVE CONTEXT TO CHANGE THE INFO
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const alertTimeOut = setTimeout(() => {
    // HERE WE HIDE THE ALERT AFTER 5 SEC
    set_show_alert(false);
  }, 5000);

  const handleLogin = async () => {
    // LOGIN FUNCTION THAT CALL API FROM SERVICES FILE
    if (username != "" && password != "") {
      const login = await services.driverLogin(username, password);
      updateDriverInfo({ id: login.driverId, name: login.driver });
    } else {
      set_show_alert(true); // IF ANY FIELD IS EMPTY SHOW ALERT
      clearTimeout(alertTimeOut); // HIDE ALERT
    }
  };
  const handleRegister = async () => {
    //REGISTER FUNCTION THAT CALL API FROM SERVICES FILE
    if (username != "" && password != "" && number != "") {
      const register = services.driverRegister(username, password, number);
    } else {
      set_show_alert(true); // IF ANY FIELD IS EMPTY SHOW ALERT
      clearTimeout(alertTimeOut); // HIDE ALERT
    }
  };

  const handleLogout = async () => {
    // here on logout we remove the token and reset the usercontext
    removeCookie("token");
    updateDriverInfo({ id: -1, name: "" });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="ms-3 me-3"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3"
      />
      <input
        type="password"
        placeholder="number"
        value={number}
        onChange={(e) => set_number(e.target.value)}
        className="mt-3"
      />
      <button onClick={handleLogin} className="mt-3">
        Login
      </button>
      <button onClick={handleRegister} className="mt-3">
        Register
      </button>
      <button onClick={handleLogout} className="mt-3">
        logout
      </button>
      <Alert
        key="warning"
        variant="warning"
        show={alert}
        style={{
          position: "fixed",
          zIndex: 1000,
          left: "30%",
          textAlign: "center",
        }}
      >
        error emty field
      </Alert>
    </div>
  );
};

export default UserAuth;
