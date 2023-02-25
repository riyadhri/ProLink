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
import axios from "axios";
import API_URL from "../services/API_URL";
import { useQuery, useMutation, useQueryClient } from "react-query";

function Search(props) {
  //  axios get request
  const [posts, setPosts] = React.useState([]);

  const fetchMyprofile = () => {
    return axios.get(API_URL + "/posts", {
      withCredentials: true,
    });
  };
  const { isLoading, data, isError, error, refetch } = useQuery(
    "Myprofile",
    fetchMyprofile,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setPosts(data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [users, setUsers] = React.useState([]);

  const fetchUsers = () => {
    return axios.get(API_URL + "/users/suggested", {
      withCredentials: true,
    });
  };
  const {} = useQuery("Users", fetchUsers, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUsers(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar />
      <Grid container>
        <Grid container item xs={12} sx={{ display: { md: "none" } }}>
          <Searchinputs />
        </Grid>

        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
          <List />
        </Grid>
        <Grid item xs={12} md={6}>
          <Postinput />

          {posts.map((post, index) => (
            <TLC
              key={index}
              postId={post._id}
              postPhotos={post.photos}
              postDescription={post.description}
              postComments={post.comments}
              postOwner={post.owner}
              postLikes={post.likes}
              postShares={post.shares}
              postDate={post.date}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          {users.map((user, index) => (
            <Suggestedaccounts key={index} user={user} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
