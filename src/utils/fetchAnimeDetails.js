import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchAnimeDetails(id) {
  const res = await axios.get(`${PROXY_URL}${API_URL}info?id=${id}`);
  return res.data.results;
}
