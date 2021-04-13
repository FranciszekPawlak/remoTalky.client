import React, { createContext, useState } from "react";
import { swrCall } from "../helpers/apiCall";
import useSWR from "swr";

export const ConversationsListContext = createContext();

export const ConversationListContextProvider = ({ children }) => {
  const API_URL = "http://localhost:4000";
  const [conversationsList, setConversationsList] = useState([]);
  const [searchingPhrase, setSearchingPhrase] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { data } = useSWR(`${API_URL}/conversation/get`, swrCall, {
    onSuccess: (e) => (isSearching ? null : setConversationsList(e)),
    refreshInterval: 5000,
  });

  const searchConversations = (phrase) => {
    setSearchingPhrase(phrase);
    const result = data.filter((element) =>
      element.conversation.name.includes(phrase)
    );
    setConversationsList(result);
  };

  return (
    <ConversationsListContext.Provider
      value={{
        conversationsList,
        setConversationsList,
        searchConversations,
        setIsSearching,
        searchingPhrase,
        setSearchingPhrase,
      }}
    >
      {children}
    </ConversationsListContext.Provider>
  );
};
