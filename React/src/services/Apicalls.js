import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchMyprofile = () => {
  return axios.get("http://localhost:3000/users/Myprofile", {
    withCredentials: true,
  });
};

export const useMyprofiledata = (onSuccess, onError) => {
  return useQuery("Myprofile", fetchMyprofile, {
    onSuccess,
    onError,
  });
};

//const { isLoading, data, isError, error, refetch } = useQuery("Myprofile", fetchMyprofile)
