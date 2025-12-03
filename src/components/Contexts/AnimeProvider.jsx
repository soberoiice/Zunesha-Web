import React, { createContext, useContext, useState, useRef } from "react";
import { fetchHomepage } from "../../utils/fetchHomepage";
import { fetchAnimeDetails } from "../../utils/fetchAnimeDetails";
import { fetchAnimeEpisodes } from "../../utils/fetchAnimeEpisodes";

const AnimeContext = createContext();
export const useAnime = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {
  const [homepage, setHomepage] = useState([]);
  const [info, setInfo] = useState([]);
  const [episodes, setEpisodes] = useState({});
  const [loadingHomepage, setLoadingHomepage] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const getHomepage = async () => {
    try {
      setLoadingHomepage(true);
      const data = await fetchHomepage();
      setHomepage(data);
      console.log("Homepage data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHomepage(false);
    }
  };

  const getAnimeDetails = async (id) => {
    try {
      setLoadingDetails(true);
      const data = await fetchAnimeDetails(id);
      setInfo(data);
      console.log("Anime info:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const getAnimeEpisodes = async (id) => {
    try {
      setLoadingEpisodes(true);
      const data = await fetchAnimeEpisodes(id);
      setEpisodes(data);
      console.log("Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  return (
    <AnimeContext.Provider
      value={{
        homepage,
        info,
        episodes,
        loadingDetails,
        loadingEpisodes,
        setLoadingEpisodes,
        loadingHomepage,
        getHomepage,
        getAnimeDetails,
        getAnimeEpisodes,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
