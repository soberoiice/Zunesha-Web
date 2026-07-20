import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

export async function fetchAnimeDetails(id) {
  const res = await axios.get(`${API_BASE_URL}/meta?id=${id}`);
  const characters = await axios.get(`${API_BASE_URL}/characters?id=${id}`);
  const episodes = await axios.get(`${API_BASE_URL}/episodes?id=${id}`);
  // const recommendations = await axios.get(
  //   `${API_BASE_URL}/recommendations?id=${id}`,
  // );
  // const relatedRes = await axios.get(
  //   `${PROXY_URL}${API_URL}anime/${id}/related`,
  // );
  // console.log("res:", characters);
  return {
    info: res.data,
    characters: characters.data,
    episodes: episodes.data.data,
  };
}
