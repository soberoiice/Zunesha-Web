import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Animedeatails from "./pages/Animedeatails";
import AnimePlayer from "./pages/AnimePlayer";
import NotFound from "./pages/NotFound";
import { AnimeProvider } from "./Contexts/AnimeProvider";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import TopLoadingBar from "./components/TopLoaderBar";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/Signup";
import Settings from "./pages/Settings";
import RandomAnime from "./pages/RandomAnime";
import { useEffect } from "react";
import NavMenu from "./components/NavMenu";
import { Box, HStack, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Box w={"100%"} h={"full"} backgroundColor={"black"}>
      <AnimeProvider>
        <BrowserRouter>
          <Navbar />
          <TopLoadingBar />
          <ScrollToTop />
          <Stack direction={"row"} gap={0} width={"full"} height={"100%"}>
            <NavMenu />
            <Box w={{ md: "60px", base: "0" }}></Box>
            <Box w={{ md: "95%", lg: "97%", base: "100%" }}  backgroundColor={"black"}>
              <Routes>
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/home" exact element={<Homepage />} />
                <Route path="/details/:id" exact element={<Animedeatails />} />
                <Route
                  path="/watch/:animeid/:currentEpisode"
                  exact
                  element={<AnimePlayer />}
                />
                <Route path="/search" exact element={<Search />} />
                <Route path="/random" exact element={<RandomAnime />} />
                <Route path="/settings" exact element={<Settings />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/account" exact element={<AccountPage />} />
                <Route path="*" exact element={<NotFound />} />
              </Routes>
          <Footer />
            </Box>
          </Stack>
        </BrowserRouter>
      </AnimeProvider>
    </Box>
  );
}

export default App;
