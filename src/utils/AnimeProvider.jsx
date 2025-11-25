import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AnimeContext = createContext();

export const useAnime = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {
  const [homepage, setHomepage] = useState([]); // LST OF POPULAR MANGA
  const [info, setInfo] = useState([]);
  const [episodes, setEpisodes] = useState({});
  const [loading, setLoading] = useState();
  // FUNCTION TO GET HOMEPAGE INFO
  const getHomepage = async () => {
    try {
      setHomepage([]);
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `https://corsproxy-psi.vercel.app/api/proxy?url=${apiUrl}`
      );
      setHomepage(response.data.results);
      console.log("api data:", response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // FUNCTION TO GET ANIME INFO
  const getAnimeDetails = async (id) => {
    try {
      setInfo([]);
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `https://corsproxy-psi.vercel.app/api/proxy?url=${apiUrl}info?id=${id}`
      );
      setInfo(response.data.results);
      console.log("api data:", response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // FUNCTION TO GET ANIME EPISODES
  const getAnimeEpisodes = async (id) => {
    try {
      setEpisodes({});
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `https://corsproxy-psi.vercel.app/api/proxy?url=${apiUrl}episodes/${id}`
      );
      setEpisodes(response.data.results.episodes);
      console.log("api data:", response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimeContext.Provider
      value={{
        getHomepage,
        homepage,
        loading,
        getAnimeDetails,
        info,
        getAnimeEpisodes,
        episodes,
        setLoading,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
