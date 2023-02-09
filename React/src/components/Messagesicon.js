import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "50ch",
          },
        }}
      >
        <MenuItem
          key={1}
          onClick={handleClose}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            //    justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              //   onClick={handleClick}
              size="small"
              sx={{ ml: 0 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Typography>Jalile der</Typography>
          </Box>

          <Typography> Message 1 </Typography>
          <Typography> 1 min </Typography>
        </MenuItem>
        <MenuItem
          key={1}
          onClick={handleClose}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            //    justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              //   onClick={handleClick}
              size="small"
              sx={{ ml: 0 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Typography>Jalile der</Typography>
          </Box>

          <Typography> Message 1 </Typography>
          <Typography> 1 min </Typography>
        </MenuItem>
        <MenuItem
          key={1}
          onClick={handleClose}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            //    justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              //   onClick={handleClick}
              size="small"
              sx={{ ml: 0 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Typography>Jalile der</Typography>
          </Box>

          <Typography> Message 1 </Typography>
          <Typography> 1 min </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
