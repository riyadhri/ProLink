import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={RouterLink} to="/" color="inherit">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const schema = yup.object({}).required();

export default function SignInSide() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const mutation = useMutation(
    (User) => {
      return axios.post("http://localhost:3000/auth/login", User, {
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

        //  localStorage.setItem("user", JSON.stringify(response.data));
        //  navigate("/");
      },
      onError: (response) => {
        console.log("mutation failed");
        console.log(response.data);

        //  localStorage.setItem("user", JSON.stringify(response.data));
        //  navigate("/");
      },
    }
  );
  const onSubmit = async (data) => {
    console.log(data);
    try {
      mutation.mutate({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
*/
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Link component={RouterLink} to="/">
          <ArrowBackIcon
            fontSizeLarge
            color="primary"
            sx={{ position: "fixed", top: 25, left: 25 }}
          />
        </Link>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
              />

              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...field}
                    error={errors.password}
                    helperText={errors.password?.message}
                  />
                )}
                name="password"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    name="check"
                    {...register("check")}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {
                //mutation.isError ? (
                //<div>{mutation.error?.response?.data?.errors[0].msg}</div>
                //  ) : null
              }
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
