import React, { useEffect, useState, useContext } from "react";
import { TextField, Avatar, Badge } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import GroupIcon from "@material-ui/icons/Group";
import { ConversationContext } from "../../../context/ConversationContext";

import { ConversationsListContext } from "../../../context/ConversationsListContext";

import "../../../style/conversation/mobile/conversations.css";

export const Conversations = () => {
  const { conversationMobile, setConversationMobile, setOpen } = useContext(
    ConversationContext
  );
  const {
    conversationsList,
    searchConversations,
    setIsSearching,
    searchingPhrase,
    setSearchingPhrase,
  } = useContext(ConversationsListContext);

  return (
    <div className="mobile-conversations-container">
      <div className="mobile-conversations">
        {conversationsList?.map(
          ({ notSeenMessages, conversation: element }) => (
            <div
              className={`${
                conversationMobile?._id === element._id
                  ? "conversation-active"
                  : ""
              } conversations-item`}
              key={element._id}
              onClick={() => setConversationMobile(element)}
            >
              {notSeenMessages > 0 ? (
                <Badge
                  max={99}
                  badgeContent={notSeenMessages}
                  color="primary"
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                >
                  <Avatar>
                    {element.users.length > 2 ? <GroupIcon /> : null}
                  </Avatar>
                </Badge>
              ) : (
                <Avatar>
                  {element.users.length > 2 ? <GroupIcon /> : null}
                </Avatar>
              )}

              <span className="conversation-item-text">{element.name}</span>
            </div>
          )
        )}
      </div>
      <TextField
        className="mobile-conversations-search"
        placeholder="find conversation"
        variant="outlined"
        fullWidth
        size="small"
        value={searchingPhrase}
        onChange={(e) => {
          if (e.target.value === "") {
            setIsSearching(false);
            setSearchingPhrase("");
          } else {
            setIsSearching(true);
            searchConversations(e.target.value);
          }
        }}
        InputProps={{
          endAdornment: (
            <span>
              <AddCircle
                className="mobile-conversations-search-icon"
                color="primary"
                fontSize="small"
                onClick={() => setOpen(true)}
              />
            </span>
          ),
        }}
      ></TextField>
    </div>
  );
};
