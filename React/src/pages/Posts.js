import React from "react";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import TLC from "../components/TLC";

function Posts() {
  return (
    <>
      <Box
        sx={{ display: "flex", height: "100%", m: 0, justifyContent: "center" }}
      >
        {" "}
        <Box
          sx={{
            p: "auto",
            width: { xs: "100%", md: "70%" },
            marginTop: "100px",
          }}
        >
          <Box>
            <TextField
              id="outlined-basic"
              label="search"
              variant="outlined"
              sx={{ width: "40%" }}
            />
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />
          <TLC
            date="20/12/2012"
            image="https://picsum.photos/seed/picsum/200/300"
            desc="ufhzifhjazefj"
            likes={5}
          />{" "}
        </Box>
      </Box>
    </>
  );
}

export default Posts;
