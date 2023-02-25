import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CurrentUserContext } from "./../CurrentUserContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import API_URL from "../services/API_URL";
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

const schema = yup.object({}).required();

export default function LoginModal() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
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
          Accept: "",
        },
        withCredentials: true,
      });
    },
    {
      onSuccess: (response) => {
        console.log("mutation succesed");
        console.log(response.data);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      },
      onError: (response) => {
        console.log("mutation failed");
        // @ts-ignore
        console.log(response.data);
      },
    }
  );
  const onSubmit = async (data) => {
    try {
      // @ts-ignore
      mutation.mutate({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, setUser } = useContext(CurrentUserContext);

  return (
    <div>
      <Button onClick={handleOpen} color="error" variant="contained">
        login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            p: 4,
            my: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            width: mobile ? "100%" : "40%",
            borderRadius: "10px",
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
              // @ts-ignore
              error={errors.email}
              // @ts-ignore
              helperText={errors.email}
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
                  // @ts-ignore
                  error={errors.password}
                  // @ts-ignore
                  helperText={errors.password}
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
      </Modal>
    </div>
  );
}
