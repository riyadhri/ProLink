import React from "react";
import ReactDOM from "react-dom";

import { Box, TextField, Divider, Avatar, Grid, Paper } from "@mui/material";

export default function Comments({ comments }) {
  console.log(comments);
  return (
    <div style={{ padding: 0 }} className="App">
      <h4 style={{ marginTop: 0 }}>Comments</h4>
      {comments.map((comment) => (
        <Paper style={{ padding: "10px 10px" }}>
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
          <TextField fullWidth label="Add Comment" id="fullWidth" />
        </Grid>
      </Grid>
    </div>
  );
}
