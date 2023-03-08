import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Paper,
  Rating,
  Tab,
  Tabs,
  IconButton,
  Avatar,
  Link,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import TLC from "../components/TLC";
import Appbar from "../components/Appbar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import API_URL from "../services/API_URL";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { ChatContext } from "../Contexts/ChatContext";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile(props) {
  const methods = useForm({
    mode: "onChange",

    defaultValues: {
      rating: 0,
      review: "",
      datetimepicker: dayjs("2022-04-17T15:30"),
    },
  });

  const { setOpen, changeChat, setIsActivechatinput } = useContext(ChatContext);

  const [profile, setProfile] = React.useState({});
  const { profileId } = useParams();

  const { user, setUser } = useContext(CurrentUserContext);
  let isMyprofile = false;

  if (user._id == profileId) {
    isMyprofile = true;
  }

  React.useEffect(() => {
    if (profileId != profile._id)
      axios
        .get("http://localhost:3000/users/profile", {
          params: {
            isMyprofile,
            profileId,
          },
          withCredentials: true,
        })
        .then(function(response) {
          //  console.log(response);
          setProfile(response.data[0]);
          //  console.log("profile", profile);
        });

    // console.log(`ID parameter changed to ${profileId}`);
  }, [profileId]);

  //console.log("user._id", user._id);
  // console.log("profileId", profileId);

  //console.log("ismyprofile" + isMyprofile);

  const fetchprofile = () => {
    return axios.get("http://localhost:3000/users/profile", {
      params: {
        isMyprofile,
        profileId,
      },
      withCredentials: true,
    });
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "Myprofile",
    fetchprofile,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setProfile(data.data[0]);

        //  console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  //const down = useMediaQuery(theme.breakpoints.down("1000"));

  const showInMapClicked = () => {
    window.open(
      "https://maps.google.com?q=" +
        profile.locationMap.longitude +
        "," +
        profile.locationMap.latitude
    );
  };

  // check if the user._id in followers.followers array
  // state for isfollowing
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [numberOffollow, setNumberOffollow] = React.useState(0);
  const [numberOffollowing, setNumberOffollowing] = React.useState(0);

  // create use effect
  React.useEffect(() => {
    // get followers
    axios
      .get(API_URL + "/users/" + profileId + "/followers")
      .then((res) => {
        // console.log("followers : " + JSON.stringify(res.data));
        setNumberOffollow(res.data.followers.length);
        setNumberOffollowing(res.data.following.length);

        const Following = () => {
          let Following = false;

          res.data.followers.forEach((follower) => {
            //  console.log("follower._id : " + follower._id);
            // console.log("user._id : " + user._id);

            if (follower._id == user._id) {
              Following = true;
            }
          });
          //console.log("bool Following : " + Following);
          return Following;
        };
        setIsFollowing(Following());
      })
      .catch((err) => console.log(err));
  }, []);

  // handleClickfollow
  const handleClickfollow = () => {
    setIsFollowing(!isFollowing);

    if (isFollowing) {
      setNumberOffollow(numberOffollow - 1);
      axios.delete(API_URL + "/users/followers/" + profileId + "/" + user._id);
    } else {
      setNumberOffollow(numberOffollow + 1);
      axios.post(API_URL + "/users/followers", {
        profileId: profileId,
        sender: user._id,
      });
    }
  };

  const onSubmitAppointment = (data) => {
    console.log("appointments" + JSON.stringify(data));
    // send req to the appointment api
    axios.post(API_URL + "/users/appointments", {
      sender: user._id,
      receiver: profileId,
      date: data.datetimepicker,
      location: data.location,
    });
  };

  const onSubmitReview = (data) => {
    // console.log(data);
    // send req to the appointment api
    //console.log("user._id", user._id);
    //console.log("profileId", profileId);

    axios.post(API_URL + "/users/reviews", {
      sender: user._id,
      receiver: profileId,
      review: data.review,
      rating: data.rating,
    });
  };

  return (
    <>
      {console.log("profile", profile)}
      <Appbar />

      <Box sx={{ p: { xs: 1, sm: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={10}
              sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                px: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    flexGrow: 2,
                    pl: 1,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      borderRadius: "50%",
                      maxHeight: 90,
                      maxWidth: 90,
                      "&:hover, &.Mui-focusVisible": {
                        opacity: 0.4,
                      },
                    }}
                    alt="The house from the offer."
                    src={
                      profile.photo != "none"
                        ? profile.photo
                        : "https://th.bing.com/th/id/OIP.OesLvyzDO6AvU_hYUAT4IAHaHa?pid=ImgDet&dpr=2"
                    }
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: 1,
                      px: 1,
                    }}
                  >
                    <Typography variant="subtitle1">
                      {" "}
                      {profile.firstname + "  " + profile.lastname}
                    </Typography>
                    <Typography variant="subtitle2">{profile.job}</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        direction: "row",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {profile.rating}
                      </Typography>
                      <Rating
                        size="small"
                        name="size-large"
                        value={profile.rating ? profile.rating : 4}
                        readOnly
                      />
                    </Box>
                  </Box>
                </Box>
                {isMyprofile ? (
                  ""
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      p: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        changeChat(profile);
                        setOpen(true);
                        setIsActivechatinput(true);
                      }}
                    >
                      <ChatBubbleIcon />
                      <Typography variant="subtitle2"> Message</Typography>
                    </Button>

                    {isFollowing ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleClickfollow}
                        collor="success"
                      >
                        <PersonAddIcon />
                        <Typography variant="subtitle2"> following</Typography>
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleClickfollow}
                      >
                        <PersonAddIcon />
                        <Typography variant="subtitle2"> Follow</Typography>
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              elevation={10}
              sx={{
                display: "flex",
                p: { xs: 1, md: 2 },
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "30%",
                    minWidth: "60px",
                  }}
                >
                  Phone :
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    width: "70%",
                  }}
                  color="primary"
                  variant="subtitle1"
                  component="div"
                >
                  {profile.phone}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "30%",
                    minWidth: "70px",
                  }}
                >
                  Address :
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "70%",
                    fontWeight: "regular",
                  }}
                >
                  {profile.location &&
                    profile.location.wilaya +
                      " " +
                      profile.location.daira +
                      " " +
                      profile.location.commune}
                </Typography>
                <IconButton
                  onClick={() => showInMapClicked()}
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <LocationOnIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: { xs: "100%", sm: "30%" },

                    minWidth: "55px",
                  }}
                >
                  Email :
                </Typography>
                <Typography
                  noWrap
                  color="primary"
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: { xs: "100%", sm: "70%" },
                    fontWeight: "regular",
                    // overflow: "hidden",
                    //  textOverflow: "ellipsis",
                  }}
                >
                  {profile.email}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "30%",
                    fontWeight: "regular",
                  }}
                >
                  Followers :
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "70%",
                    fontWeight: "regular",
                  }}
                >
                  {numberOffollow}
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "30%",
                    fontWeight: "regular",
                  }}
                >
                  Following :
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="div"
                  sx={{
                    width: "70%",
                    fontWeight: "regular",
                  }}
                >
                  {numberOffollowing}
                </Typography>
              </Box>

              <Box>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <LinkedInIcon />
                </IconButton>

                <IconButton color="primary" aria-label="add to shopping cart">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <YouTubeIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <PublicIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 2 }} spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={10}>
              <Box sx={{ position: "sticky", top: 0 }}>
                <Divider textAlign="left">
                  <Chip label="Work" />
                </Divider>

                {profile.projects &&
                  profile.projects.map((project, index) => {
                    return (
                      <Card sx={{ m: 1 }} key={index}>
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
                    );
                  })}

                <Divider textAlign="left">
                  <Chip label="Skils" />
                </Divider>
                <Box sx={{ p: 1.5 }}>
                  {profile.skills &&
                    profile.skills.map((skill, index) => (
                      <Chip color="primary" label={skill} key={index} />
                    ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={10}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  position: "sticky",
                  top: 0,
                  bgcolor: "#FFFFFF",
                  //opacity: 1,
                  zIndex: 1,
                }}
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Time Line"
                    iconPosition="start"
                    icon={<RemoveRedEyeIcon fontSize="small" />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<PersonIcon fontSize="small" />}
                    iconPosition="start"
                    label="Appointments"
                    {...a11yProps(1)}
                  />
                  <Tab
                    icon={<PersonIcon fontSize="small" />}
                    iconPosition="start"
                    label="Reviews"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {profile.posts &&
                  profile.posts.map((post, index) => (
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                {isMyprofile &&
                  profile.appointments &&
                  profile.appointments.map((appointment, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 1 }} elevation={10}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt="Cindy Baker" src="" />
                        <Typography>
                          {appointment.sender &&
                            appointment.sender.firstname +
                              " " +
                              appointment.sender.lastname}{" "}
                        </Typography>{" "}
                        {"   to    "}{" "}
                        <Typography>
                          {appointment.receiver &&
                            appointment.receiver.firstname +
                              " " +
                              appointment.receiver.lastname}{" "}
                        </Typography>
                      </Box>
                      <Typography>{appointment.date}</Typography>
                      <Typography> {appointment.location}</Typography>
                    </Paper>
                  ))}

                <Paper
                  key={555}
                  sx={{ p: 2, mb: 1 }}
                  elevation={10}
                  component="form"
                  onSubmit={methods.handleSubmit(onSubmitAppointment)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Avatar alt="Cindy Baker" src="" />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker", "DateTimePicker"]}
                      >
                        <Controller
                          name={"datetimepicker"}
                          control={methods.control}
                          render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                              label="Controlled picker"
                              value={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>

                  <Controller
                    name={"location"}
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        onChange={onChange}
                        value={value ? value : ""}
                        label={"firstname"}
                        id="firstname"
                        variant="outlined"
                        maxRows={4}
                        sx={{ flexGrow: 1, mr: 1 }}
                        multiline
                      />
                    )}
                  />

                  <Button type="submit" variant="contained">
                    submit
                  </Button>
                </Paper>
              </TabPanel>

              <TabPanel
                classes={{
                  "& .css-19kzrtu": {
                    p: 0,
                  },
                }}
                sx={{ m: 5 }}
                value={value}
                index={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mb: 1.5,
                  }}
                >
                  {profile.reviews &&
                    profile.reviews.map((review, index) => (
                      <Paper key={index} sx={{ p: 1, m: 1 }} elevation={10}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar alt="Cindy Baker" src="" />
                          <Typography>
                            {" "}
                            {review.sender.firstname +
                              " " +
                              review.sender.lastname}{" "}
                          </Typography>
                        </Box>
                        <Rating
                          name="size-large"
                          value={review.rating ? review.rating : 0}
                        />
                        <Typography> {review.review} </Typography>
                      </Paper>
                    ))}
                  <Paper key={555} sx={{ p: 1, m: 1 }} elevation={10}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      component="form"
                      onSubmit={methods.handleSubmit(onSubmitReview)}
                    >
                      <Avatar alt="Cindy Baker" src="" />
                      <Typography> user</Typography>

                      <Controller
                        name={"rating"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                          <Rating
                            name="simple-controlled"
                            value={parseInt(value)}
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        name={"review"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            onChange={onChange}
                            value={value}
                            label={"review"}
                            id="review"
                            variant="outlined"
                            maxRows={4}
                            sx={{ flexGrow: 1, mr: 1 }}
                            multiline
                          />
                        )}
                      />
                      <Button type="submit">save</Button>
                    </Box>
                  </Paper>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
