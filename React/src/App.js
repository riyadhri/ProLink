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
import ProtectedRoutes from "./services/ProtectedRoutes";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Chat from "./components/Chat";
import EditProfileMobile from "./components/EditProfileMobile";
import SearchResults from "./pages/SearchResults";
const queryClient = new QueryClient();

function App() {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const [MessagesisActive, setIsActive] = React.useState(true);
  const messageshandleClick = () => {
    setIsActive((current) => !current);
  };

  const [inputList, setInputList] = React.useState(<Chat key={1} />);
  //const [inputList, setInputList] = React.useState([]);
  const ondeleteBtnClick = (event) => {
    setInputList([]);
  };
  const onAddBtnClick = (event) => {
    setInputList(<Chat key={inputList.length} />);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "350px",
            position: "fixed",
            right: "385px",
            bottom: 0,
            zIndex: 2,
          }}
        >
          {inputList}
        </Box>
        <Box
          sx={{
            width: "350px",
            position: "fixed",
            right: 15,
            bottom: 0,
            zIndex: 2,
            display: "none",
          }}
        >
          <Box
            onClick={messageshandleClick}
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              height: "40px",
              backgroundColor: "primary.dark",
            }}
          >
            <Typography variant="subtitle1">Messages</Typography>
          </Box>

          <Box
            sx={{
              flexDirection: "column",
              display: MessagesisActive ? "" : "none",
              background: "#fff",
              height: "500px",
            }}
          >
            <Box
              sx={{
                pl: 2,
                pt: 2,
                display: "flex",
                direction: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ mr: 0.5 }}
              />
              <Typography variant="subtitle1">Riyadh Derbale</Typography>
            </Box>
            <Box
              sx={{
                pl: 2,
                pt: 2,
                display: "flex",
                direction: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ mr: 0.5 }}
              />
              <Typography variant="subtitle1">Riyadh Derbale</Typography>
            </Box>
            <Box
              sx={{
                pl: 2,
                pt: 2,
                display: "flex",
                direction: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ mr: 0.5 }}
              />
              <Typography variant="subtitle1">Riyadh Derbale</Typography>
            </Box>
            <Box
              sx={{
                pl: 2,
                pt: 2,
                display: "flex",
                direction: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ mr: 0.5 }}
              />
              <Typography variant="subtitle1">Riyadh Derbale</Typography>
            </Box>
          </Box>
        </Box>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="SearchResults" element={<SearchResults />} />

              <Route path="EditProfileMobile" element={<EditProfileMobile />} />
              <Route path="Profile" element={<Profile />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/MyProfile" element={<Profile />} />
              </Route>
              <Route path="*" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
        <DevTool control={control} /> {/* set up the dev tool */}
      </ThemeProvider>
    </>
  );
}
export default App;
