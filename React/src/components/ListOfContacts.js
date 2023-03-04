import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const ListOfContacts = ({
  contacts,
  changeChat,
  setOpen,
  setIsActivechatinput,
}) => {
  const [MessagesisActive, setIsActive] = React.useState(true);
  const messageshandleClick = () => {
    setIsActive((current) => !current);
  };
  return (
    <>
      <Box
        sx={{
          width: "350px",
          position: "fixed",
          flexDirection: "column",
          right: 15,
          bottom: 0,
          zIndex: 2,
          display: "flex",
        }}
      >
        <Box
          onClick={messageshandleClick}
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
          <Typography variant="subtitle1">Messages</Typography>
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            display: MessagesisActive ? "flex" : "none",
            background: "#fff",
            height: "500px",
            zIndex: 2,
          }}
        >
          {console.log(
            "list of contacts  : " + contacts.users && contacts.users
          )}
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
                  changeChat(contact);
                  setOpen(true);
                  setIsActivechatinput(true);
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
