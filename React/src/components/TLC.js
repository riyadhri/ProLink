import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import Comments from "./Comments";
import { Divider, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FlagIcon from "@mui/icons-material/Flag";

import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import API_URL from "../services/API_URL";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        // eslint-disable-next-line no-undef
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "0",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TLC({
  postId,
  postDescription,
  postPhotos,
  postvideos,
  postDate,
  postLikes,
  postComments,
  postShares,
  postViews,
  postOwner,
  postownername,
  postownerimage,
}) {
  const { user, setUser } = useContext(CurrentUserContext);
  console.log("postlikes" + postLikes.likeinfo);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClicklike = () => {
    if (containsString) {
      console.log(postId);
      axios.post(API_URL + "/posts/dislike", {
        postId: postId,
        sender: user._id,
      });
    } else {
      axios.post(API_URL + "/posts/addlike", {
        postId: postId,
        sender: user._id,
      });
    }
  };
  console.log(postLikes.likeinfo);

  const containsString = postLikes.likeinfo.some((obj) => {
    return Object.values(obj).some((val) => {
      return val.includes(user._id);
    });
  });

  console.log(containsString);

  return (
    <>
      <Card elevation={10} sx={{ width: "100%", mb: 1 }}>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <BookmarkIcon />
            Save
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <FlagIcon />
            Report
          </MenuItem>
        </StyledMenu>

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {postOwner.firstname.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={postOwner.firstname + " " + postOwner.lastname}
          subheader={postDate}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postDescription}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          image={postPhotos[0] ? postPhotos[0] : "https://picsum.photos/200"}
          alt="Paella dish"
          sx={{ maxHeight: "450px", maxWidth: "100%" }}
        />

        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <IconButton
            aria-label="add to favorites"
            color={containsString ? "error" : "default"}
            onClick={handleClicklike}
          >
            <FavoriteIcon />
            {postLikes.number}
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ChatIcon />
          </ExpandMore>

          <IconButton aria-label="share">
            <ShareIcon />
            {postShares}
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0 }}>
            <Comments comments={postComments} postId={postId} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
