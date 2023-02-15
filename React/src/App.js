import { ReactQueryDevtools } from "react-query/devtools";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import Search from "./pages/Search";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import theme from "./theme";
import Posts from "./pages/Posts";
import { ProtectedRoutes } from "./services/ProtectedRoutes";
import React, { useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Chat from "./components/Chat";
import SearchResults from "./pages/SearchResults";
import { createContext, useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useAuth } from "./services/ProtectedRoutes";
const queryClient = new QueryClient();

function App() {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const [inputList, setInputList] = React.useState(<Chat key={1} />);
  //const [inputList, setInputList] = React.useState([]);

  const ondeleteBtnClick = (event) => {
    setInputList([]);
  };
  const onAddBtnClick = (event) => {
    setInputList([]);
  };

  const [user, setUser] = React.useState({});

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      const USER = JSON.parse(localStorage.getItem("user"));
      setUser(USER);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CurrentUserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          {inputList}
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="SearchResults" element={<SearchResults />} />
                <Route path="Profile" element={<Profile />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/EditProfile" element={<EditProfile />} />
                </Route>
                <Route path="*" element={<Search />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </CurrentUserContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;
