import {
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

export const Searchinputs = () => {
  const navigate = useNavigate();

  return (
    <>
      <FormControl sx={{ m: 1, flexGrow: 2 }}>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                //  onMouseDown={handleMouseDownPassword}
                edge="start"
                onClick={() => {
                  navigate("SearchResults");
                }}
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

      <FormControl sx={{ m: 1, flexGrow: 1, minWidth: "150px" }}>
        <InputLabel>job</InputLabel>

        <Select
          //  value={age}
          //  onChange={handleChange}
          sx={{
            background: "#fff",
            "& .MuiSelect-select": { pt: 1.7, pb: 1.7 },
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, flexGrow: 1, minWidth: "150px" }}>
        <InputLabel>wilaya</InputLabel>
        <Select
          //  value={age}
          //  onChange={handleChange}
          sx={{
            background: "#fff",
            "& .MuiSelect-select": { pt: 1.7, pb: 1.7 },
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
