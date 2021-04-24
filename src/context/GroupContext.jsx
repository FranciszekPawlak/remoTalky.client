import React, { createContext, useState } from "react";

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [groupMobile, setGroupMobile] = useState(null);
  const [groupDesktop, setGroupDesktop] = useState(null);
  const [desktopInitScroll, setDesktopInitScroll] = useState(true);

  return (
    <GroupContext.Provider
      value={{
        open,
        setOpen,
        groupMobile,
        setGroupMobile,
        groupDesktop,
        setGroupDesktop,
        desktopInitScroll,
        setDesktopInitScroll,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
