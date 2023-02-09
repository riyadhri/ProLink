import * as React from "react";
import { ChatController, MuiChat } from "chat-ui-react";
import { Box } from "@mui/system";
import { Avatar, IconButton, Typography } from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import Videocallmodal from "./Videocallmodal";

export default function App() {
  const [chatCtl] = React.useState(new ChatController());

  React.useMemo(async () => {
    // Chat content is displayed using ChatController
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
    const name = await chatCtl.setActionRequest({ type: "text", always: true });
  }, [chatCtl]);

  // Only one component used for display

  const [isActive, setIsActive] = React.useState(true);
  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);
    // 👇️ or set to true
    // setIsActive(true);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
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
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ mr: 0.5 }}
          />
          <Typography variant="subtitle1">Riyadh Derbale</Typography>
        </Box>
        <Box sx={{ display: "flex", direction: "row", alignItems: "center" }}>
          <Videocallmodal />
          <IconButton sx={{ p: 0.5 }}>
            <MinimizeIcon />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          height: "400px",
          //width: "350px",
          display: isActive ? "block" : "none",
          mb: isActive ? 2 : 0,
        }}
      >
        <MuiChat chatController={chatCtl} />
      </Box>
    </>
  );
}
