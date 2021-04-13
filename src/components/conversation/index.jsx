import React from "react";
import { Layout } from "../Layout";
import { useMediaQuery } from "react-responsive";
import { CreateDialog } from "./CreateDialog";
import { ConversationContextProvider } from "../../context/ConversationContext";
import { ConversationListContextProvider } from "../../context/ConversationsListContext";
import { ConversationDesktop } from "./desktop";
import { ConversationMobile } from "./mobile";

export const Conversation = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 800 });

  return (
    <Layout>
      <ConversationContextProvider>
        <ConversationListContextProvider>
          {isDesktopOrLaptop ? <ConversationDesktop /> : <ConversationMobile />}
          <CreateDialog />
        </ConversationListContextProvider>
      </ConversationContextProvider>
    </Layout>
  );
};
