import React, { createContext, useState } from "react";
import { swrCall } from "../helpers/apiCall";
import useSWR from "swr";

export const GroupListContext = createContext();

export const GroupListContextProvider = ({ children }) => {
  const API_URL = "http://localhost:4000";
  const [groupList, setGroupList] = useState([]);
  const [searchingPhrase, setSearchingPhrase] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { data } = useSWR(`${API_URL}/group/getListWithNotification`, swrCall, {
    onSuccess: (e) => (isSearching ? null : setGroupList(e)),
    refreshInterval: 5000,
  });

  const searchGroup = (phrase) => {
    setSearchingPhrase(phrase);
    const result = data.filter((element) =>
      element.group.name.includes(phrase)
    );
    setGroupList(result);
  };

  return (
    <GroupListContext.Provider
      value={{
        groupList,
        setGroupList,
        searchGroup,
        setIsSearching,
        searchingPhrase,
        setSearchingPhrase,
      }}
    >
      {children}
    </GroupListContext.Provider>
  );
};
