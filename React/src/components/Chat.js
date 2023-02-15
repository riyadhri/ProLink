import * as React from "react";
import { io } from "socket.io-client";
import API_URL from "../services/API_URL";
import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";
import axios from "axios";
import ListOfContacts from "./ListOfContacts";
import ChatContainer from "./ChatContainer";

export default function Chat() {
  // const { user, setUser } = useContext(CurrentUserContext);
  // console.log(user);
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

  const handleChatChange = (chat) => {
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
      />
      <ListOfContacts
        contacts={contacts}
        changeChat={handleChatChange}
        setOpen={setOpen}
        setIsActivechatinput={setIsActive}
      />
    </>
  );
}
