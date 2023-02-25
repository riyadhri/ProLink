import * as React from "react";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import API_URL from "../services/API_URL";
const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required(),
    firstName: yup
      .string()
      .min(5)
      .required(),
    lastName: yup
      .string()
      .min(5)
      .required(),
    password: yup
      .string()
      .min(7)
      .required(),
  })
  .required();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// @ts-ignore
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    formState: { errors },
    handleSubmit,
    // @ts-ignore
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // @ts-ignore
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrentUserContext);

  const mutation = useMutation(
    (newUser) => {
      return axios.post("http://localhost:3000/auth/signup", newUser, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        withCredentials: true,
      });
    },
    {
      onSuccess: (response) => {
        console.log("mutation succesed");
        console.log(response.data);
        console.log(response);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        //  navigate("/");
      },
      onError: (response) => {
        console.log("mutation failed");
        console.log(response);
        // localStorage.setItem("user", JSON.stringify(response));
        // navigate("/");
      },
    }
  );
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // @ts-ignore
      mutation.mutate({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
        useemail: data.useemail,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="success" variant="contained">
        register
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          sx={{
            background: "#fff",
            width: mobile ? "100%" : "40%",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("firstName")}
                    // @ts-ignore
                    // error={errors.firstName}
                    // @ts-ignore
                    //helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    {...register("lastName")}
                    // @ts-ignore
                    //    error={errors.lastName}
                    // @ts-ignore
                    //   helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email")}
                    // @ts-ignore
                    //  error={errors.email}
                    // @ts-ignore
                    //  helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password")}
                    // @ts-ignore
                    //  error={errors.password}
                    // @ts-ignore
                    /// helperText={errors.Password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={true}
                        color="primary"
                        name="useemail"
                        {...register("useemail")}
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {
                //mutation.isError ? (
                // <div>{mutation.error?.response?.data?.errors[0].msg}</div>
                // ) : null
              }
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Modal>
    </div>
  );
}
