import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [conversationMobile, setConversationMobile] = useState(null);
  const [conversationDesktop, setConversationDesktop] = useState(null);
  const [desktopInitScroll, setDesktopInitScroll] = useState(true);

  return (
    <ConversationContext.Provider
      value={{
        open,
        setOpen,
        conversationMobile,
        setConversationMobile,
        conversationDesktop,
        setConversationDesktop,
        desktopInitScroll,
        setDesktopInitScroll,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
