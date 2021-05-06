import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
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
            <Link to="/groups" aria-label="groups">
              <FontAwesomeIcon icon={faCommentAlt} />
            </Link>
          </li>
          <li>
            <Link to="/calendar" aria-label="calendar">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Link>
          </li>
          <li>
            <Link to="/files" aria-label="files">
              <FontAwesomeIcon icon={faFileAlt} />
            </Link>
          </li>
          <li>
            <Link to="/account" aria-label="account">
              <FontAwesomeIcon icon={faCogs} />
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
