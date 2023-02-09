import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Toolbar,
} from "@mui/material";
import React from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Accountmenu from "./Accountmenu";
import Messagesicon from "./Messagesicon";
import Notificationsicon from "./Notificationsicon";
import TemporaryDrawer from "./Temporarydrawer";
import { Searchinputs } from "./Searchinputs";

function Appbar() {
  // create use state isAuth

  const [isAuth, setIsAuth] = React.useState(true);

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container>
          <Grid xs={1} sx={{ display: { md: "none" } }}>
            <TemporaryDrawer />
          </Grid>

          <Grid xs={1}></Grid>
          <Grid
            item
            md={9}
            sx={(theme) => ({
              display: "flex",
              justifyContent: "flex-end",

              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            <Searchinputs />
          </Grid>

          <Grid
            item
            xs={10}
            md={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {isAuth ? (
              <>
                <LoginModal />
                <SignupModal />
              </>
            ) : (
              <>
                <Messagesicon />
                <Notificationsicon />
                <Accountmenu />
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
