import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import { Provider } from "./components/ui/provider";
import { AnimeProvider } from "./utils/AnimeProvider";
import Animedeatails from "./pages/Animedeatails";
import AnimePlayer from "./pages/AnimePlayer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider>
      <AnimeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/details/:id" exact element={<Animedeatails />} />
            <Route path="/watch/:id" exact element={<AnimePlayer />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AnimeProvider>
    </Provider>
  );
}

export default App;
