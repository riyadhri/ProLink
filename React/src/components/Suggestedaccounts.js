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

export default function Suggestedaccounts() {
  return (
    <Card elevation={10} sx={{ mb: 1, ml: 1, mr: 1, mt: 0 }}>
      <CardHeader
        sx={{ px: 1 }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="Freelancer"
      />

      <CardContent
        sx={{
          pr: 1,
          pl: 1,
          pt: 0,

          pb: "0px",
        }}
      >
        <Button size="small">
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
