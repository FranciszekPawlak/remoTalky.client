import React, { useEffect, useState, useContext } from "react";
import { TextField, Avatar, Badge } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import GroupIcon from "@material-ui/icons/Group";
import { ConversationContext } from "../../../context/ConversationContext";
import { ConversationsListContext } from "../../../context/ConversationsListContext";
import "../../../style/conversation/desktop/conversations.css";

export const Conversations = () => {
  const {
    conversationDesktop,
    setConversationDesktop,
    setOpen,
    setDesktopInitScroll,
  } = useContext(ConversationContext);
  const {
    conversationsList,
    searchConversations,
    setIsSearching,
    searchingPhrase,
    setSearchingPhrase,
  } = useContext(ConversationsListContext);

  useEffect(() => {
    if (!conversationDesktop && conversationsList?.length > 0) {
      setConversationDesktop(conversationsList[0].conversation);
    }
  });

  return (
    <>
      <TextField
        className="conversation-search"
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
                className="conversation-search-icon"
                color="primary"
                fontSize="small"
                onClick={() => setOpen(true)}
              />
            </span>
          ),
        }}
      ></TextField>
      <div className="desktop-conversations-container">
        {conversationsList?.map(
          ({ notSeenMessages, conversation: element }) => (
            <div
              className={`${
                conversationDesktop?._id === element._id
                  ? "conversation-active"
                  : ""
              } conversations-item`}
              key={element._id}
              onClick={() => {
                setDesktopInitScroll(true);
                setConversationDesktop(element);
              }}
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
    </>
  );
};
