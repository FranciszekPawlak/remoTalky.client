import React, { useContext } from "react";
import { Conversations } from "./Conversations";
import { Messages } from "./Messages";
import { ConversationContext } from "../../../context/ConversationContext";
import "../../../style/conversation/desktop/index.css";

export const ConversationDesktop = () => {
  const { conversationDesktop } = useContext(ConversationContext);
  return (
    <div className="conversation-desktop">
      <div className="desktop-conversations">
        <Conversations />
      </div>
      <div className="desktop-messages">
        {conversationDesktop ? <Messages /> : null}
      </div>
    </div>
  );
};
