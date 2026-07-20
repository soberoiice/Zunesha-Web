import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  import.meta.env.VITE_DEPLOYMENT === "development"
    ? "http://localhost:3000/api"
    : `${API_URL}`;

export async function fetchAnimeEpisodeSchedule(id) {
  const res = await axios.get(`${API_BASE_URL}/next-episode?id=${id}`);
  console.log("Episode Schedule Response:", res);
  return res.data.timeUntilAiring;
}
