import { BrowserRouter, Route, Routes } from "react-router";
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

function App() {
  return (
    <AnimeProvider>
      <BrowserRouter>
        <TopLoadingBar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/home" exact element={<Homepage />} />
          <Route path="/details/:id" exact element={<Animedeatails />} />
          <Route
            path="/watch/:animeid/:currentEpisode"
            exact
            element={<AnimePlayer />}
          />
          <Route path="/search/:searchTerm" exact element={<Search />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AnimeProvider>
  );
}

export default App;
