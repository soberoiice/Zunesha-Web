import React, { createContext, useContext, useState } from "react";
import { fetchHomepage } from "../utils/fetchHomepage";
import { fetchAnimeDetails } from "../utils/fetchAnimeDetails";
import { fetchAnimeEpisodes } from "../utils/fetchAnimeEpisodes";
import { fetchCurrentEpisodeInfo } from "../utils/fetchCurrentEpisodeInfo";

const AnimeContext = createContext();
export const useAnime = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {
  const [homepage, setHomepage] = useState([]);
  const [info, setInfo] = useState([]);
  const [episodes, setEpisodes] = useState({});
  const [currentEpisodeInfo, setCurrentEpisodeInfo] = useState({});
  const [loadingHomepage, setLoadingHomepage] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [loadingEpisodesInfo, setLoadingEpisodesInfo] = useState(false);

  const getHomepage = async () => {
    try {
      setLoadingHomepage(true);
      setHomepage([]);
      const data = await fetchHomepage();
      setHomepage(data);
      // console.log("Homepage data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHomepage(false);
    }
  };

  const getAnimeDetails = async (id) => {
    try {
      setLoadingDetails(true);
      setInfo({});
      const data = await fetchAnimeDetails(id);
      setInfo(data);
      // console.log("Anime info:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const getAnimeEpisodes = async (id) => {
    try {
      setLoadingEpisodes(true);
      setEpisodes({});
      const data = await fetchAnimeEpisodes(id);
      setEpisodes(data);
      // console.log("Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  const getCurrentEpisodeInfo = async (id, server, type) => {
    try {
      setLoadingEpisodesInfo(true);
      setCurrentEpisodeInfo({});
      const data = await fetchCurrentEpisodeInfo(id, server, type);
      setCurrentEpisodeInfo(data);
      // console.log("Current Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEpisodesInfo(false);
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
        getCurrentEpisodeInfo,
        currentEpisodeInfo,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
