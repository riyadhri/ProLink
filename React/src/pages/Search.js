import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import SearchcardComponent from "../components/SearchcardComponent";
import Suggestedaccounts from "../components/Suggestedaccounts";
import React from "react";
import TLC from "../components/TLC";
import Appbar from "../components/Appbar";
import List from "../components/List";
import { Searchinputs } from "../components/Searchinputs";
import Postinput from "../components/Postinput";
import API_URL from "../services/API_URL";
function Search(props) {
  //  axios get request
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(API_URL + "/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar />
      <Grid container>
        <Grid container xs={12} sx={{ display: { md: "none" } }}>
          <Searchinputs />
        </Grid>

        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
          <List />
        </Grid>
        <Grid item xs={12} md={6}>
          <Postinput />

          {
            // get posts from /posts and display it with TLC
            posts.map((post) => (
              <TLC
                key={post._id}
                id={post._id}
                postimage={post.photos}
                postdescription={post.description}
              />
            ))
          }
        </Grid>
        <Grid item xs={12} md={3}>
          <Suggestedaccounts />
          <Suggestedaccounts />
          <Suggestedaccounts />
          <Suggestedaccounts />
          <Suggestedaccounts />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
