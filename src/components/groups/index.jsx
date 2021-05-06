import React from "react";
import { Layout } from "components/Layout";
import { useMediaQuery } from "react-responsive";
import { CreateGroup } from "components/groups/CreateGroup";
import { GroupContextProvider } from "context/GroupContext";
import { GroupListContextProvider } from "context/GroupListContext";
import { GroupsDesktop } from "components/groups/chat/desktop";
import { GroupsMobile } from "components/groups/chat/mobile";

const Groups = () => {
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
export default Groups;
