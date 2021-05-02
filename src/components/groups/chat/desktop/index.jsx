import React, { useContext } from "react";
import { GroupList } from "components/groups/chat/desktop/GroupList";
import { Chat } from "components/groups/chat/desktop/Chat";
import { GroupContext } from "context/GroupContext";
import "style/conversation/desktop/index.css";

export const GroupsDesktop = () => {
  const { groupDesktop } = useContext(GroupContext);
  return (
    <div className="conversation-desktop">
      <div className="desktop-conversations">
        <GroupList />
      </div>
      <div className="desktop-messages">{groupDesktop ? <Chat /> : null}</div>
    </div>
  );
};
