import { useEffect, useRef } from "react";
import "style/groups/peerVideo.css";
export const Video = ({ peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  return (
    <div className="peer-container">
      <span>{peer.peer._id}</span>
      <video playsInline autoPlay ref={ref} />
    </div>
  );
};
