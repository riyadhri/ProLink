import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Vid from "./vid";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Videocallmodal({ currentChat, user, socket }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton sx={{ p: 0.5 }} onClick={handleOpen}>
        <CallIcon />
      </IconButton>
      <IconButton sx={{ p: 0.5 }} onClick={handleOpen}>
        <VideocamIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ background: "#fff", height: "100%", width: "70%" }}>
          {open ? (
            <Vid currentChat={currentChat} user={user} socket={socket} />
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </div>
  );
}
