// @ts-nocheck
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import MultipleSelectChip from "../components/SelectchipComponent";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent, Modal, Tooltip } from "@mui/material";
import axios from "axios";
import ModelComponent from "../components/ModelComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate } from "react-router";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "react-query";
import { skillsArray } from "./skills";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 0, md: 3 } }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ profile }) {
  // const [profile, setProfile] = React.useState(props.profile);
  // console.log(profile);
  //console.log(profile.location && profile.location.wilaya);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [value, setVal] = React.useState(0);

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const [file, setFile] = React.useState();

  function FileshandleChange(e) {
    console.log(" inside " + e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  let defaultValues = {
    firstname: profile.firstname,
    lastname: profile.lastname,
    phone: profile.phone,
    email: profile.email,
    facebook: profile.facebook,
    youtube: profile.youtube,
    instagram: profile.instagram,
    website: profile.website,
    linkedin: profile.linkedin,
    wilaya: profile.location && profile.location.wilaya,
    daira: profile.location && profile.location.daira,
    commune: profile.location && profile.location.commune,
    language: profile.language,
    skills: profile.skills,
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    methods.reset(defaultValues);
  }, [profile]);

  const mutation = useMutation(
    (newUser) => {
      return axios.patch(
        "http://localhost:3000/users/" + profile._id,
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
        // console.log("mutation succesed");
        // console.log(response.data);
        // console.log(response);
        //  localStorage.setItem("user", JSON.stringify(response.data));
        //  navigate("/");
      },
      onError: (response) => {
        // console.log("mutation failed");
        // console.log(response.data);
        //  localStorage.setItem("user", JSON.stringify(response.data));
        //  navigate("/");
      },
    }
  );
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
    const photobase64 = await convertToBase64(data.photo[0]);

    data.photo = photobase64;
    console.log(data);
    try {
      mutation.mutate(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Grid container>
        <Grid item xs={12} sm={2}>
          <Tabs
            orientation={matches ? "vertical" : "horizontal"}
            variant={matches ? "standard" : "scrollable"}
            scrollButtons={matches ? false : true}
            allowScrollButtonsMobile={matches ? false : true}
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              onClick={() => Navigate}
              label="Public Profile"
              {...a11yProps(0)}
            />
            <Tab label="Account management" {...a11yProps(1)} />
            <Tab label="Sociale Media" {...a11yProps(2)} />
            <Tab label="Projects & Skills" {...a11yProps(3)} />
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <FormProvider {...methods}>
            <Box
              key={0}
              component="form"
              noValidate
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      file
                        ? file
                        : profile.photo
                        ? profile.photo
                        : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
                    }
                    sx={{ width: 56, height: 56 }}
                  />
                  <Button component="label" sx={{ borderRadius: "50%" }}>
                    Change
                    <input
                      type="file"
                      {...methods.register("photo")}
                      onChange={FileshandleChange}
                      hidden
                    />
                  </Button>
                </Box>

                <Box sx={{ display: "flex", p: 1 }}>
                  <Controller
                    name={"firstname"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"firstname"}
                        id="firstname"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                  <Controller
                    name={"lastname"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"lastname"}
                        id="lastname"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ display: "flex", p: 1 }}>
                  <Controller
                    name={"phone"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"phone"}
                        id="phone"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />

                  <Controller
                    name={"language"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <FormControl sx={{ flexGrow: 1, m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Language
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={value ? value : ""}
                          label="Language"
                          onChange={onChange}
                          sx={{ minWidth: "110px" }}
                        >
                          <MenuItem value="Francais">Francais</MenuItem>
                          <MenuItem value="English">English</MenuItem>
                          <MenuItem value="العربية">العربية</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box sx={{ display: "flex", p: 1, flexWrap: "wrap" }}>
                  <Controller
                    name={"wilaya"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <FormControl sx={{ flexGrow: 1, m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          wilaya
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={value ? value : ""}
                          label="wilaya"
                          onChange={onChange}
                          sx={{ minWidth: "110px" }}
                          // defaultValue={profile.location?.wilaya}
                        >
                          <MenuItem value="naama">naama</MenuItem>
                          <MenuItem value="alger">alger</MenuItem>
                          <MenuItem value="oran">oran</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name={"daira"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <FormControl sx={{ flexGrow: 1, m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          daira
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={value ? value : ""}
                          label="daira"
                          onChange={onChange}
                          sx={{ minWidth: "110px" }}
                        >
                          <MenuItem value="naama">naama</MenuItem>
                          <MenuItem value="alger">alger</MenuItem>
                          <MenuItem value="oran">oran</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name={"commune"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <FormControl sx={{ flexGrow: 1, m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          commune
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={value ? value : ""}
                          label="commune"
                          onChange={onChange}
                          sx={{ minWidth: "110px" }}
                        >
                          <MenuItem value="naama">naama</MenuItem>
                          <MenuItem value="alger">alger</MenuItem>
                          <MenuItem value="oran">oran</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Controller
                    name={"email"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"email"}
                        id="email"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 2 }}>
                    {" "}
                    Convert Account{" "}
                  </Typography>
                  <Controller
                    name={"type"}
                    control={methods.control}
                    render={({ field: { onChange, value, isTouched } }) => (
                      <FormControl sx={{ flexGrow: 1, m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          profile type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={value}
                          label="type"
                          onChange={onChange}
                          sx={{ minWidth: "110px" }}
                        >
                          <MenuItem value="client">client</MenuItem>
                          <MenuItem value="worker">worker</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 2 }}>Change Password</Typography>
                  <Button sx={{}} variant="contained" color="error">
                    Change Password
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 2 }}>
                    Deactivate Accounte
                  </Typography>
                  <Button
                    sx={{}}
                    variant="contained"
                    color="error"
                    size="medium"
                  >
                    Deactivate Account
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 2 }}> Delete Account </Typography>
                  <Button
                    sx={{}}
                    variant="contained"
                    color="error"
                    size="medium"
                  >
                    Delete Account
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>Facebook</Typography>

                  <Controller
                    name={"facebook"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"facebook"}
                        id="facebook"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}>Youtube</Typography>

                  <Controller
                    name={"youtube"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"youtube"}
                        id="youtube"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}> Linkedin</Typography>

                  <Controller
                    name={"linkedin"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"linkedin"}
                        id="linkedin"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}> Instagram </Typography>

                  <Controller
                    name={"instagram"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"instagram"}
                        id="instagram"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ flexGrow: 1 }}> Website </Typography>

                  <Controller
                    name={"website"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"website"}
                        id="website"
                        variant="outlined"
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                    )}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Paper elevation={3}>
                  <Box
                    sx={{
                      m: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    Skills
                    <MultipleSelectChip skills={profile.skills} />
                  </Box>
                </Paper>
                <Paper sx={{}} elevation={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "sticky",
                      top: 0,
                      width: "100%",
                    }}
                  >
                    {
                      //console.log(profile.skills)
                    }
                    <Divider textaligns="left"></Divider>
                    <Card sx={{ m: 1 }}>
                      <ModelComponent profileId={profile._id} />
                    </Card>

                    {profile.projects &&
                      profile.projects.map((project, index) => (
                        <Card sx={{ width: "100%", m: 1 }} key={index}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {project.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14, position: "sticky" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {project.date}
                            </Typography>
                            <Typography variant="body2">
                              {project.description}
                              <br />
                              {project.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">
                              {" "}
                              <Link href={project.link}> Learn More</Link>
                            </Button>
                          </CardActions>
                        </Card>
                      ))}
                  </Box>
                </Paper>
              </TabPanel>
              <Button
                sx={{ position: "fixed", right: 40, bottom: 40 }}
                type="submit"
                variant="contained"
                color="success"
              >
                Save
              </Button>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
      <DevTool control={methods.control} />
    </Box>
  );
}
