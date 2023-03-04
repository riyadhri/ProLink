import React from "react";
import { Box } from "@mui/system";
import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import Videocallmodal from "../../components/Videocallmodal";
import axios from "axios";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import API_URL from "../../services/API_URL";
import Peer from "simple-peer";

const ChatContainer = ({ currentChat, socket, setIsOnlistofconatacts }) => {
  const { user, setUser } = useContext(CurrentUserContext);
  console.log(user);
  const [msg, setMsg] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const scrollRef = React.useRef();
  const [arrivalMessage, setArrivalMessage] = React.useState(null);

  React.useEffect(() => {
    const getmsg = async () => {
      const data = user._id;
      const response = await axios.post(API_URL + "/messages/getmsg", {
        from: data,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    getmsg();
  }, [currentChat]);
  /*
  React.useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);
*/

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = async (msg) => {
    const data = user._id;
    console.log(socket.current);
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data,
      msg,
    });
    await axios.post(API_URL + "/messages/addmsg", {
      to: currentChat._id,
      from: data,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  React.useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  React.useEffect(() => {
    // @ts-ignore
    scrollRef.current &&
      // @ts-ignore
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  socket.current &&
    socket.current.on("msg-recieve", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            p: 1,
            height: "40px",
            width: "100%",
            backgroundColor: "primary.dark",
          }}
        >
          <Box sx={{ display: "flex", direction: "row", alignItems: "center" }}>
            <Avatar
              alt={currentChat.firstname && currentChat.firstname.charAt(0)}
              src={currentChat.photo}
              sx={{ mr: 0.5 }}
            />
            <Typography variant="subtitle1">
              {currentChat.firstname + " " + currentChat.lastname}{" "}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", direction: "row", alignItems: "center" }}>
            <Videocallmodal
              socket={socket}
              user={user}
              currentChat={currentChat}
            />

            <IconButton
              sx={{ p: 0.5 }}
              onClick={() => setIsOnlistofconatacts(true)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "100%",
            mb: 2,
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              background: "#fff",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={scrollRef}
                style={{
                  display: "flex",
                  justifyContent: msg.fromSelf ? "flex-end" : "flex-start",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    background: msg.fromSelf ? "#dcf8c6" : "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "60%",
                  }}
                >
                  <span>{msg.message}</span>
                </div>
              </div>
            ))}
          </Box>

          <Box
            sx={{
              height: "100%",
              background: "#fff",
              //  display: "flex",
              // alignItems: "center",
            }}
          >
            <IconButton aria-label="delete">
              <AttachFileIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <KeyboardVoiceIcon />
            </IconButton>

            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <IconButton
              aria-label="delete"
              onClick={(event) => sendChat(event)}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatContainer;
