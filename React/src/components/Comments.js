import React from "react";
import ReactDOM from "react-dom";

import {
  Box,
  TextField,
  Divider,
  Avatar,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";
// react query
import { useMutation, useQueryClient } from "react-query";
// axios
import axios from "axios";
import API_URL from "../services/API_URL";

export default function Comments({ comments, postId }) {
  const { user, setUser } = useContext(CurrentUserContext);

  // mutation using react query
  const mutation = useMutation(
    (comment) => {
      return axios.post(API_URL + "/posts/addcomment", comment);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (data) => {
        console.log(data);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // @ts-ignore
    mutation.mutate({ value: data.value, postId, sender: user._id });
    console.log({ value: data.value, postId, user: user._id });
  };

  return (
    <div style={{ padding: 0 }} className="App">
      <h4 style={{ marginTop: 0 }}>Comments</h4>
      {comments.map((comment, index) => (
        <Paper style={{ padding: "10px 10px" }} key={index}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={comment.sender.photo} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {comment.sender.firstname + " " + comment.sender.lastname}{" "}
              </h4>
              <p style={{ textAlign: "left" }}>{comment.value}</p>
              <p style={{ textAlign: "left", color: "gray" }}>{comment.date}</p>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Grid container wrap="nowrap" spacing={2} sx={{ pt: 3 }}>
        <Grid item>
          <Avatar alt="Remy Sharp" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="add comment "
              multiline
              maxRows={4}
              {...register("value", { required: true })}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
