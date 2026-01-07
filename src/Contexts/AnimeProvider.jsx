import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchHomepage } from "../utils/fetchHomepage";
import { fetchAnimeDetails } from "../utils/fetchAnimeDetails";
import { fetchAnimeEpisodes } from "../utils/fetchAnimeEpisodes";
import { fetchCurrentEpisodeInfo } from "../utils/fetchCurrentEpisodeInfo";
import { fetchAnime } from "../utils/fetchAnime";
import { fetchSchedule } from "../utils/fetrchSchedule";
import { fetchMetaData } from "../utils/fetchMetaData";
import { fetchAnimeCharacters } from "../utils/fetchAnimeCharacters";
import { fetchAnimeEpisodeSchedule } from "../utils/fetchAnimeEpisodeSchedule";
import { fetchFilterdAnime } from "../utils/fetchFilteredAnime";
import { fetchRandomAnime } from "../utils/fetchRandomAnime";

const AnimeContext = createContext();
export const useAnime = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [homepage, setHomepage] = useState([]);
  const [info, setInfo] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [episodes, setEpisodes] = useState({});
  const [metaData, setMetaData] = useState({});
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [currentEpisodeInfo, setCurrentEpisodeInfo] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [episodeSchedule, setEpisodeSchedule] = useState([]);
  const [loadingHomepage, setLoadingHomepage] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingMetaData, setLoadingMetaData] = useState(false);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [loadingEpisobeSchedule, setLoadingEpisodeSchedule] = useState(false);
  useEffect(() => {
    setCurrentEpisodeIndex(0);
  }, [episodes]);
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
      setCurrentEpisodeInfo({});
      const data = await fetchCurrentEpisodeInfo(id, server, type);
      setCurrentEpisodeInfo(data);
      // console.log("Current Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getSchedule = async (date) => {
    try {
      setLoadingSchedule(true);
      setSchedule({});
      const data = await fetchSchedule(date);
      setSchedule(data);
      // console.log("Current schedule data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSchedule(false);
    }
  };

  const getAnime = async (searchTerm, page) => {
    try {
      setLoadingSearch(true);
      setSearchResults({});
      const data = await fetchAnime(searchTerm, page);
      setSearchResults(data);
      // console.log("Search Results data on page", page, data);
      // console.log("Current Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const getMetaData = async (id) => {
    try {
      setLoadingMetaData(true);
      setMetaData({});
      const data = await fetchMetaData(id);
      setMetaData(data);
      // console.log("meta data", data);
      // console.log("Current Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMetaData(false);
    }
  };

  const getAnimeCharacters = async (id) => {
    try {
      setLoadingCharacters(true);
      setAnimeCharacters([]);
      const data = await fetchAnimeCharacters(id);
      setAnimeCharacters(data.data);
      // console.log("character data", data);
      // console.log("Current Episodes data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCharacters(false);
    }
  };

  const getAnimeEpisodeSchedule = async (id) => {
    // console.log("schedule id", id);
    try {
      setLoadingEpisodeSchedule(true);
      setEpisodeSchedule([]);
      const data = await fetchAnimeEpisodeSchedule(id);
      setEpisodeSchedule(data);
      // console.log("episode schedule", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEpisodeSchedule(false);
    }
  };
  const getFilterdAnime = async (searchTerm, page, params) => {
    // console.log("schedule id", id);
    try {
      setLoadingSearch(true);
      const data = await fetchFilterdAnime(searchTerm, page, params);
      setSearchResults(data);
      console.log("filtered search", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };
  const getRandomAnime = async () => {
    try {
      setLoadingDetails(true);
      setInfo({});
      const data = await fetchRandomAnime();
      setInfo(data);
      console.log("rand Anime info:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
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
        getAnime,
        searchResults,
        loadingSearch,
        getSchedule,
        schedule,
        loadingSchedule,
        getMetaData,
        loadingMetaData,
        metaData,
        getAnimeCharacters,
        animeCharacters,
        loadingCharacters,
        getAnimeEpisodeSchedule,
        episodeSchedule,
        loadingEpisobeSchedule,
        setCurrentEpisodeIndex,
        currentEpisodeIndex,
        searchTerm,
        setSearchTerm,
        getFilterdAnime,
        getRandomAnime
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
