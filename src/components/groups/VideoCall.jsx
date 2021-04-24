import { useEffect, useRef, useState, useContext } from "react";
import { Layout } from "../Layout";
import Peer from "simple-peer";
import io from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";
import { Video } from "./Video";
import CallEndIcon from "@material-ui/icons/CallEnd";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import { VideoCallContext } from "../../context/VideoCallContext";
import { AuthContext } from "../../context/AuthContext";
import "../../style/video.css";
const url = "http://localhost:4002";

export const VideoCall = () => {
  const { socket, setIncommingCall } = useContext(VideoCallContext);
  const { user } = useContext(AuthContext);
  const [peers, setPeers] = useState([]);
  const [audio, setAudio] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { id } = useParams();
  const groupId = id;
  const history = useHistory();

  useEffect(() => {
    setIncommingCall(null);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const microphone = stream.getAudioTracks()[0];
        setAudio(microphone);
        microphone.enabled = false;

        userVideo.current.srcObject = stream;

        socket.current.emit("join call", groupId, user);

        socket.current.on("all users", (callUSers) => {
          const peersToSet = [];
          console.log("users from api", callUSers);
          callUSers.forEach((userInGroup) => {
            const peer = createPeer(
              userInGroup.socketId,
              socket.current.id,
              stream,
              userInGroup.username
            );
            console.log("add create - before set state peers", peer);
            peersRef.current.push({
              peerID: userInGroup.socketId,
              peer,
            });
            peersToSet.push({ socketId: userInGroup.socketId, peer });
          });
          console.log("add create - peersToSet", peersToSet);
          setPeers(peersToSet);
        });

        socket.current.on("user joined", (payload) => {
          const peer = addPeer(
            payload.signal,
            payload.callerID,
            stream,
            payload.username
          );
          console.log("add peer - before set state peers", peer);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((prevPeers) => {
            console.log("prevp", prevPeers);
            return [...prevPeers, { socketId: payload.callerID, peer }];
          });
        });

        socket.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }
        });
      })
      .catch((error) => console.log(error));

    socket.current.on("user left", (socketId) => {
      console.log(socketId);
      console.log(peersRef.current);
      peers.forEach((x) => console.log("xxx ", x, " xxx"));
      setPeers((prevPeers) =>
        prevPeers.filter((item) => item.socketId !== socketId)
      );
      const disconnectedPeer = peersRef.current.find(
        (item) => item.peerID === socketId
      );
      if (disconnectedPeer) {
        disconnectedPeer.peer.destroy();
      }
      const currentPeers = peersRef.current.filter(
        (item) => item.peerID !== socketId
      );
      peersRef.current = currentPeers;
      setTimeout(() => console.log(peersRef.current), 2000);
    });
  }, [,]);

  const createPeer = (userToSignal, callerID, stream, username) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      username,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        username,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream, username) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      username,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const muteMicrophone = () => {
    audio.enabled = !audio.enabled;
    setIsMuted(!audio.enabled);
  };

  const callAllUsersInGroup = () =>
    socket.current.emit("call users", groupId, user.id);

  useEffect(() => {
    console.log(peers);
  }, [peers]);

  return (
    <div className="video-container">
      <div className="video-peers">
        {peers.length > 0 ? (
          peers.map((peer) => <Video key={peer.peer._id} peer={peer} />)
        ) : (
          <span>You are alone ;_;</span>
        )}
      </div>

      <div className="video-bar">
        <video ref={userVideo} autoPlay playsInline className="user-video" />

        <div
          onClick={() => {
            socket.current.emit("leave call", user.id);
            // history.goBack();
            window.close();
          }}
        >
          <CallEndIcon />
          <span>End call</span>
        </div>
        <div onClick={callAllUsersInGroup}>
          <CallIcon />
          <span>Call all users</span>
        </div>
        <div onClick={muteMicrophone}>
          {isMuted ? <MicOffIcon /> : <MicIcon />}
          <span>Microphone {isMuted ? "off" : "on"}</span>
        </div>
      </div>
    </div>
  );
};
