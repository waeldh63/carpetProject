import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const DriverContext = createContext();
// THIS IS A CONTEXT PROVIDER FILE FOR DRIVER TO ACCESS THE DRIVER INFO IN ALL THE APP
export const DriverProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [driverInfo, setDriverInfo] = useState({
    id: -1,
    name: "",
  });

  const updateDriverInfo = useCallback((updatedInfo) => {
    // FUNCTION TO UPDATE THE DRIVER INFO
    setDriverInfo((prevInfo) => ({ ...prevInfo, ...updatedInfo }));
  }, []);

  useEffect(() => {// here ON REFRESH OF THE PAGE WE CHECK IF WE HAVE ALREADY AN TOKEN IN COOKIES SO USER DONT LOGIN AGAIN AFTER EACH REFRESH OF THE PAGE
    const token = cookies.token;
    if (token) {
      const token = cookies.token;
      const decoded = jwtDecode(token);
      updateDriverInfo({ id: decoded.driverId, name: decoded.driver });
    }
  }, [cookies.token]);
  return (
    <DriverContext.Provider value={{ driverInfo, updateDriverInfo }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriverContext must be used within a DriverProvider");
  }
  return context;
};
