import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  import.meta.env.VITE_DEPLOYMENT === "development"
    ? "http://localhost:3000/api"
    : `${API_URL}`;

export async function fetchAnimeEpisodes(id, page) {
  const episodes = await axios.get(
    `${API_BASE_URL}/episodes?id=${id}&page=${page}`,
  );
  return episodes.data;
}
