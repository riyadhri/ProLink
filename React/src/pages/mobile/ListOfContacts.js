import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const ListOfContacts = ({
  contacts,
  changeChat,
  setIsOnlistofconatacts,
  isOnlistofconatacts,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",

          flexDirection: "column",

          zIndex: 2,
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            height: "40px",
            backgroundColor: "primary.dark",
          }}
        >
          <IconButton sx={{ p: 0.5 }} onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>

          <Typography variant="subtitle1">Messages</Typography>
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            display: "flex",
            background: "#fff",
            height: "100%",
            zIndex: 2,
          }}
        >
          {contacts.users &&
            contacts.users.map((contact, index) => (
              <Box
                key={index}
                sx={{
                  pl: 2,
                  pt: 2,
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onClick={() => {
                  setIsOnlistofconatacts(false, () => {
                    console.log(isOnlistofconatacts);
                  });
                  changeChat(contact);
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ mr: 0.5 }}
                />
                <Typography variant="subtitle1">
                  {contact.firstname + " " + contact.lastname}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default ListOfContacts;
