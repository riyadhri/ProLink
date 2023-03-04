import * as React from "react";
import { io } from "socket.io-client";
import API_URL from "../../services/API_URL";
import { useContext } from "react";
//import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import axios from "axios";
import ListOfContacts from "./ListOfContacts";
import ChatContainer from "./ChatContainer";
import { ChatContext } from "../../Contexts/ChatContext";

export default function ChatMobile() {
  const {
    socket,
    currentChat,
    // contact
    contacts,
    changeChat,
    setIsOnlistofconatacts,
    isOnlistofconatacts,
  } = useContext(ChatContext);

  return (
    <>
      {isOnlistofconatacts ? (
        <ListOfContacts
          contacts={contacts}
          changeChat={changeChat}
          setIsOnlistofconatacts={setIsOnlistofconatacts}
          isOnlistofconatacts={isOnlistofconatacts}
        />
      ) : (
        <ChatContainer
          currentChat={currentChat}
          socket={socket}
          setIsOnlistofconatacts={setIsOnlistofconatacts}
        />
      )}
    </>
  );
}
