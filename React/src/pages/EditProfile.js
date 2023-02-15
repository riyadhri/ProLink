import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModelComponent from "../components/ModelComponent";
import Appbar from "../components/Appbar";
import Tabs from "../components/Tabs";
import axios from "axios";
import API_URL from "../services/API_URL";
import { useQuery, useMutation, useQueryClient } from "react-query";

function EditProfile() {
  const [profile, setProfile] = React.useState({});
  const fetchMyprofile = () => {
    return axios.get("http://localhost:3000/users/Myprofile", {
      withCredentials: true,
    });
  };
  const { isLoading, data, isError, error, refetch } = useQuery(
    "Myprofile",
    fetchMyprofile,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setProfile(data.data[0]);
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
