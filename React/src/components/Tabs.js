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
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import MultipleSelectChip from "../components/SelectchipComponent";
import { useForm, FormProvider } from "react-hook-form";

import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent, Modal, Tooltip } from "@mui/material";

import ModelComponent from "../components/ModelComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate } from "react-router";

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

export default function VerticalTabs() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [file, setFile] = React.useState();

  function FileshandleChange(e) {
    console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data = {
      ...data,
      //  projects: props.user.projects,
      //  skils: props.user.skils,
      //   posts: props.user.posts,
      //   photo: props.user.photo,
    };
    //  props.editprofile(data);
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
                    : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
                }
                sx={{ width: 56, height: 56 }}
              />
              <Button component="label" sx={{ borderRadius: "50%" }}>
                Change
                <input type="file" hidden onChange={FileshandleChange} />
              </Button>
            </Box>

            <FormProvider
              component="form"
              noValidate
              onSubmit={methods.handleSubmit(onSubmit)}
              alignContent="start"
              sx={{ m: 0 }}
              spacing={2}
              justifyContent="center"
              {...methods}
            >
              <Box sx={{ display: "flex", p: 1 }}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  defaultValue={"Riyadh"}
                  {...methods.register("firstName")}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  defaultValue={"Derbale"}
                  {...methods.register("lastName")}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
              </Box>

              <Box sx={{ display: "flex", p: 1 }}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  defaultValue={"065602822"}
                  {...methods.register("phone")}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <TextField
                  id="outlined-basic"
                  label="language"
                  variant="outlined"
                  name="website"
                  defaultValue={"english"}
                  {...methods.register("website")}
                  sx={{ flexGrow: 1, mr: 1 }}
                />
              </Box>
              <Box sx={{ display: "flex", p: 1, flexWrap: "wrap" }}>
                <FormControl sx={{ flexGrow: 1, m: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Wilaya
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    //  value={age}
                    label="Wilaya"
                    onChange={handleChange}
                    sx={{ minWidth: "110px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1, m: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Daira
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    //   value={age}
                    label="Daira"
                    onChange={handleChange}
                    sx={{ minWidth: "110px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1, m: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Commune
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    //   value={age}
                    label="Commune"
                    onChange={handleChange}
                    sx={{ minWidth: "120px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ p: 1 }}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  defaultValue={"Email"}
                  {...methods.register("email")}
                  sx={{ display: "block", width: "100%" }}
                  fullWidth
                />
              </Box>
            </FormProvider>
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
              <Typography sx={{ flexGrow: 2 }}> Convert Account </Typography>
              <FormControl sx={{ flexGrow: 1, m: 1 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Client
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  //   value={age}
                  label="Client"
                  //  onChange={handleChange}
                  sx={{ minWidth: "120px" }}
                >
                  <MenuItem value="Client">
                    <em>Client</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
              <Typography sx={{ flexGrow: 2 }}>Deactivate Accounte</Typography>
              <Button sx={{}} variant="contained" color="error" size="medium">
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
              <Button sx={{}} variant="contained" color="error" size="medium">
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

              <TextField
                sx={{ flexGrow: 2 }}
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
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

              <TextField
                sx={{ flexGrow: 2 }}
                id="outlined-basic"
                label="Youtube"
                variant="outlined"
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

              <TextField
                sx={{ flexGrow: 2 }}
                id="outlined-basic"
                label="Linkedin"
                variant="outlined"
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

              <TextField
                sx={{ flexGrow: 2 }}
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
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

              <TextField
                sx={{ flexGrow: 2 }}
                id="outlined-basic"
                label="Website"
                variant="outlined"
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
                <MultipleSelectChip />
              </Box>{" "}
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
                <Divider textAligns="left"></Divider>

                <Card sx={{ m: 1 }}>
                  <Tooltip title="Add New Project" arrow>
                    <ModelComponent />
                  </Tooltip>
                </Card>

                <Card sx={{ width: "100%", m: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {"project.name"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, position: "sticky" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {"project.date"}
                    </Typography>
                    <Typography variant="body2">
                      Project Description...
                      <br />
                      {"project.desc"}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ width: "100%", m: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {"project.name"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, position: "sticky" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {"project.date"}
                    </Typography>
                    <Typography variant="body2">
                      Project Description...
                      <br />
                      {"project.desc"}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ width: "100%", m: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {"project.name"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, position: "sticky" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {"project.date"}
                    </Typography>
                    <Typography variant="body2">
                      Project Description...
                      <br />
                      {"project.desc"}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ width: "100%", m: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {"project.name"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, position: "sticky" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {"project.date"}
                    </Typography>
                    <Typography variant="body2">
                      Project Description...
                      <br />
                      {"project.desc"}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Box>
            </Paper>
          </TabPanel>
        </Grid>
      </Grid>

      <Button
        sx={{ position: "fixed", right: 40, bottom: 40 }}
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </Box>
  );
}
