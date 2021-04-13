import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faVideo,
  faCommentAlt,
  faCalendarAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../style/layout.css";

export const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="chat">
              <FontAwesomeIcon icon={faCommentAlt} />
            </Link>
          </li>
          <li>
            <Link to="call">
              <FontAwesomeIcon icon={faVideo} />
            </Link>
          </li>
          <li>
            <Link to="calendar">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Link>
          </li>
          <li>
            <Link to="files">
              <FontAwesomeIcon icon={faFileAlt} />
            </Link>
          </li>
          <li>
            <Link to="account">
              <FontAwesomeIcon icon={faCogs} />
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
