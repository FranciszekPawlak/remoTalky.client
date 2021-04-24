import React from "react";
import { Layout } from "../Layout";
import { useMediaQuery } from "react-responsive";
import { CreateGroup } from "./CreateGroup";
import { GroupContextProvider } from "../../context/GroupContext";
import { GroupListContextProvider } from "../../context/GroupListContext";
import { GroupsDesktop } from "./desktop";
import { GroupsMobile } from "./mobile";

export const Groups = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 800 });

  return (
    <Layout>
      <GroupContextProvider>
        <GroupListContextProvider>
          {isDesktopOrLaptop ? <GroupsDesktop /> : <GroupsMobile />}
          <CreateGroup />
        </GroupListContextProvider>
      </GroupContextProvider>
    </Layout>
  );
};
