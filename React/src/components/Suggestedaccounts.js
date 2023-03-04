import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ChatContext } from "../Contexts/ChatContext";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
export default function Suggestedaccounts({ user }) {
  console.log("suggested accounts", user._id);
  const { setOpen, changeChat, setIsActivechatinput } = React.useContext(
    ChatContext
  );
  return (
    <Card elevation={10} sx={{ mb: 1, ml: 1, mr: 1, mt: 0 }}>
      <MuiLink
        component={RouterLink}
        to={`/profile/${user._id}`}
        //relative="path"
      >
        <CardHeader
          sx={{ px: 1 }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.firstname.charAt(0)}
            </Avatar>
          }
          title={user.firstname + " " + user.lastname}
          subheader={user.job}
        />
      </MuiLink>
      <CardContent
        sx={{
          pr: 1,
          pl: 1,
          pt: 0,

          pb: "0px",
        }}
      >
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            changeChat(user);
            setOpen(true);
            setIsActivechatinput(true);
          }}
        >
          <ChatBubbleIcon />
          <Typography variant="subtitle2">Message</Typography>
        </Button>
        <Button size="small">
          <PersonAddIcon />
          <Typography variant="subtitle2">Follow</Typography>
        </Button>
      </CardContent>
    </Card>
  );
}
