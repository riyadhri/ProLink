import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModelComponent from "../components/ModelComponent";
import Appbar from "../components/Appbar";
import Tabs from "../components/Tabs";
import axios from "axios";
import API_URL from "../services/API_URL";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
function EditProfile() {
  const [profile, setProfile] = React.useState({});

  const { profileId } = useParams();
  const fetchprofile = () => {
    return axios.get("http://localhost:3000/users/profile", {
      params: {
        isMyprofile: true,
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
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  console.log(profile);

  return (
    <>
      <Appbar />
      <Tabs profile={profile} />
    </>
  );
}
export default EditProfile;
