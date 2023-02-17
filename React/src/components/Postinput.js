import { Box, Button, IconButton, Input, TextField } from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useForm, Controller } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import API_URL from "../services/API_URL";
import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";

const Postinput = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  const [file, setFile] = React.useState(null);
  //const [img, setImg] = React.useState(null);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const mutation = useMutation(
    (post) => {
      return axios.post(API_URL + "/posts", post);
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
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onChange",
  });

  const convertToBase64 = (f) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(f);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (data) => {
    const photobase64 = await convertToBase64(data.Photo[0]);
    const POST = {
      Desc: data.Desc,
      Photo: photobase64,
      owner: user._id,
    };

    // @ts-ignore
    mutation.mutate(POST);
    console.log(POST);
  };

  return (
    <>
      <Box
        sx={{ width: "100%" }}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          fullWidth
          {...register("Desc")}
        />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Box
            component="img"
            sx={{ width: "90px" }}
            alt={file ? "xxx" : ""}
            src={file}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button component="label">
            <AddPhotoAlternateIcon />
            <input
              type="file"
              {...register("Photo", {
                onChange: handleChange,
              })}
              hidden
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Postinput;
