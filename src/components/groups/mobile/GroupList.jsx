import React, { useEffect, useState, useContext } from "react";
import { TextField, Avatar, Badge } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import GroupIcon from "@material-ui/icons/Group";
import { GroupContext } from "../../../context/GroupContext";
import { GroupListContext } from "../../../context/GroupListContext";
import VideocamIcon from "@material-ui/icons/Videocam";
import { Link } from "react-router-dom";
import "../../../style/conversation/mobile/conversations.css";

export const GroupList = () => {
  const { groupMobile, setGroupMobile, setOpen } = useContext(GroupContext);
  const {
    groupList,
    searchGroup,
    setIsSearching,
    searchingPhrase,
    setSearchingPhrase,
  } = useContext(GroupListContext);

  return (
    <div className="mobile-conversations-container">
      <div className="mobile-conversations">
        {groupList?.map(({ notSeenMessages, group: element }) => (
          <div
            className={`${
              groupMobile?._id === element._id ? "conversation-active" : ""
            } conversations-item`}
            key={element._id}
          >
            <div
              className="conversation-item-text-container"
              onClick={() => setGroupMobile(element)}
            >
              {notSeenMessages > 0 ? (
                <Badge
                  max={99}
                  badgeContent={notSeenMessages}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
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
            {/* <Link */}
            <a
              className="conversation-video-link"
              href={`/videoCall/${element._id}`}
              target="_blank"
              rel="noreferrer"
              // to={`/videoCall/${element._id}`}
            >
              <VideocamIcon />
            </a>
            {/* </Link> */}
          </div>
        ))}
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
            searchGroup(e.target.value);
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
