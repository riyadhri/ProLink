import { Box, Container } from "@mui/system";
import React from "react";
import Appbar from "../components/Appbar";
import SearchCardComponent from "../components/SearchcardComponent";

const SearchResults = () => {
  return (
    <>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <SearchCardComponent />
        <SearchCardComponent />
        <SearchCardComponent />
        <SearchCardComponent />
        <SearchCardComponent />
        <SearchCardComponent />
      </Box>
    </>
  );
};

export default SearchResults;
