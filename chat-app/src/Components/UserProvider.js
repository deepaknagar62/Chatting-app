import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";


export const UserContext = createContext();

const UserState = (props) => {
  const [userData, setUserData] = useState({ userId: null, userName: null });
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:9000");

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData,socket }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
