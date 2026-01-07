import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchRandomAnime() {
  const res = await axios.get(`${PROXY_URL}${API_URL}random`);
  return res.data.results;
}