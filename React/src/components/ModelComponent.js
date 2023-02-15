import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { Box } from "@mui/material";

export default function FormDialog({ profileId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation(
    (newUser) => {
      return axios.patch(
        "http://localhost:3000/users/addproject/" + profileId,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (response) => {
        console.log("mutation succesed");
        console.log(response.data);
        console.log(response);
      },
      onError: (response) => {
        console.log("mutation failed");
        console.log(response);
      },
    }
  );

  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    try {
      mutation.mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box
      //   component="form"
      ///  noValidate
      //onSubmit={methods.handleSubmit(onSubmit)}
      //  key={1}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Project{" "}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <Controller
              name={"name"}
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  value={value ? value : ""}
                />
              )}
            />

            <Controller
              name={"date"}
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="date"
                  label="name"
                  type="date"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  value={value ? value : ""}
                />
              )}
            />

            <Controller
              name={"description"}
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  value={value ? value : ""}
                />
              )}
            />

            <Controller
              name={"link"}
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="link"
                  label="link"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  value={value ? value : ""}
                />
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={methods.handleSubmit(onSubmit)}>
              Add Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
