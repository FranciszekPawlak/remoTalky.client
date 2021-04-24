import React, { useEffect, useState, useContext } from "react";
import { TextField, Avatar, Badge } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import GroupIcon from "@material-ui/icons/Group";
import { GroupContext } from "../../../context/GroupContext";
import { GroupListContext } from "../../../context/GroupListContext";
import VideocamIcon from "@material-ui/icons/Videocam";
import { Link } from "react-router-dom";
import "../../../style/conversation/desktop/conversations.css";

export const GroupList = () => {
  const {
    groupDesktop,
    setGroupDesktop,
    setOpen,
    setDesktopInitScroll,
  } = useContext(GroupContext);
  const {
    groupList,
    searchGroup,
    setIsSearching,
    searchingPhrase,
    setSearchingPhrase,
  } = useContext(GroupListContext);

  useEffect(() => {
    if (!groupDesktop && groupList?.length > 0) {
      setGroupDesktop(groupList[0].group);
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
            searchGroup(e.target.value);
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
        {groupList?.map(({ notSeenMessages, group: element }) => (
          <div
            className={`${
              groupDesktop?._id === element._id ? "conversation-active" : ""
            } conversations-item`}
            key={element._id}
          >
            <div
              className="conversation-item-text-container"
              onClick={() => {
                setDesktopInitScroll(true);
                setGroupDesktop(element);
              }}
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
    </>
  );
};
