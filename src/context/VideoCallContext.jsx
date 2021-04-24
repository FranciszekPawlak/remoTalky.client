import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";

export const VideoCallContext = createContext();

export const VideoCallContextProvider = ({ children }) => {
  const ENDPOINT = "http://localhost:4002";
  const { user } = useContext(AuthContext);
  const [isConnectionSet, setIsConnectionSet] = useState(false);
  const [incommingCall, setIncommingCall] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.on("incomming call", (group) => {
      setIncommingCall(group);
    });
    return () => socket.current.emit("disconnect");
  }, [,]);

  useEffect(() => {
    if (user && !isConnectionSet) {
      socket.current.emit("login", user);
      setIsConnectionSet(true);
    }
  }, [user]);

  return (
    <VideoCallContext.Provider
      value={{
        socket,
        incommingCall,
        setIncommingCall,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};
