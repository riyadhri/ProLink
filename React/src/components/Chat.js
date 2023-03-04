import * as React from "react";
import { io } from "socket.io-client";
import API_URL from "../services/API_URL";
import { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { ChatContext } from "../Contexts/ChatContext";
import axios from "axios";
import ListOfContacts from "./ListOfContacts";
import ChatContainer from "./ChatContainer";

export default function Chat() {
  const {
    socket,
    handleClickOpen,
    isOpen,
    setOpen,
    isActive,
    setIsActive,
    handleClick,
    currentChat,
    // contact
    contacts,
    changeChat,
    setIsActivechatinput,
  } = useContext(ChatContext);

  return (
    <>
      <ChatContainer
        currentChat={currentChat}
        socket={socket}
        handleClickOpen={handleClickOpen}
        isOpen={isOpen}
        setOpen={setOpen}
        isActive={isActive}
        setIsActive={setIsActive}
        handleClick={handleClick}
        changeChat={changeChat}
      />
      <ListOfContacts
        contacts={contacts}
        changeChat={changeChat}
        setOpen={setOpen}
        setIsActivechatinput={setIsActivechatinput}
      />
    </>
  );
}
