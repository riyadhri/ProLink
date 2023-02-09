import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";

export default function SearchCardComponent() {
  return (
    <Card
      elevation={10}
      sx={{
        mb: 1,
        ml: 1,
        mr: 1,
        mt: 0,
        minWidth: "282px",
        width: { xs: "100%", sm: "45%" },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="Freelancer"
      />

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="subtitle2" color="text.secondary">
          0656028272
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          riyadh.derbale99@gmail.com
        </Typography>
      </CardContent>
    </Card>
  );
}
