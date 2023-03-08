import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { location } from "./location";
import { jobs } from "./jobs";
export const Searchinputs = () => {
  const navigate = useNavigate();
  let defaultValues = {
    searchtext: "",
    job: "",
    wilaya: "",
  };
  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });
  React.useEffect(() => {
    methods.reset(defaultValues);
  }, []);

  const mutation = useMutation(
    () => {
      return axios.patch("http://localhost:3000/users/", {
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
        console.log(response);
      },
      onError: (response) => {
        console.log("mutation failed");
        console.log(response);
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    /*
    try {
      mutation.mutate(data);
    } catch (err) {
      console.log(err);
    }
    */
  };
  // @ts-ignore
  const wilayaNames = [...new Set(location.map((loc) => loc.wilaya_name))];
  return (
    <>
      <Box
        key={0}
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Controller
          name={"searchtext"}
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <FormControl sx={{ m: 1, flexGrow: 2 }}>
              <OutlinedInput
                value={value}
                onChange={onChange}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="start"
                      type="submit"
                    >
                      <SearchSharpIcon />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  background: "#fff",
                  "& .MuiOutlinedInput-input": { pt: 1.7, pb: 1.7 },
                }}
                placeholder="Please enter text"
              />
            </FormControl>
          )}
        />

        <Controller
          name={"job"}
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <FormControl sx={{ m: 1, flexGrow: 1, minWidth: "150px" }}>
              <InputLabel id="demo-simple-select-helper-label">job</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={value ? value : ""}
                label="job"
                onChange={onChange}
                sx={{
                  background: "#fff",
                  "& .MuiSelect-select": { pt: 1.7, pb: 1.7 },
                }}
              >
                {jobs.map((job, index) => {
                  return (
                    <MenuItem key={index} value={job}>
                      {job}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name={"wilaya"}
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <FormControl sx={{ m: 1, flexGrow: 1, minWidth: "150px" }}>
              <InputLabel id="demo-simple-select-helper-label">
                wilaya
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={value ? value : ""}
                label="wilaya"
                onChange={onChange}
                sx={{
                  background: "#fff",
                  "& .MuiSelect-select": { pt: 1.7, pb: 1.7 },
                }}
              >
                {wilayaNames &&
                  wilayaNames.map((wilayaName, index) => {
                    return (
                      <MenuItem key={index} value={wilayaName}>
                        {wilayaName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
        />
      </Box>
    </>
  );
};
