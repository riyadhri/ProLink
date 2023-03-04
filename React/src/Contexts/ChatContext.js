import axios from "axios";
import React from "react";
import API_URL from "../services/API_URL";
import { io } from "socket.io-client";
export const ChatContext = React.createContext(null);

export const ChatContextProvider = ({ children }) => {
  const [value, setValue] = React.useState("Hello World!");

  const socket = React.useRef();
  const [currentChat, setCurrentChat] = React.useState({
    _id: "",
    firstname: "",
    lastname: "",
    photo: "",
  });
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    const getmsg = async () => {
      if (!localStorage.getItem("user")) {
        //navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    getmsg();
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      // @ts-ignore
      socket.current = io(API_URL);
      // @ts-ignore
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  React.useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const data = await axios.get(API_URL + "/users/" + currentUser._id);
        setContacts(data.data);
      }
    }
    fetchData();
  }, [currentUser]);

  const changeChat = (chat) => {
    setCurrentChat(chat);
  };
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen((current) => !current);
  };
  const [isActive, setIsActive] = React.useState(true);
  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const [isOnlistofconatacts, setIsOnlistofconatacts] = React.useState(true);

  return (
    <ChatContext.Provider
      value={{
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
        setIsActivechatinput: setIsActive,
        // mobile use contacts , ChangeChat , currentChat , Socket , setIsOnlistofconatacts , isOnlistofconatacts
        isOnlistofconatacts,
        setIsOnlistofconatacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
