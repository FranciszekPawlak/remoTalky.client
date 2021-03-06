import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";
import { config } from "config";

export const VideoCallContext = createContext();

export const VideoCallContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isConnectionSet, setIsConnectionSet] = useState(false);
  const [incommingCall, setIncommingCall] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect(config.videoSocketUlr, {
      path: "/socket.io/webrtc",
      // transports: ["websocket"],
    });
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
