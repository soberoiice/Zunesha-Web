import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchAnime(searchTerm) {
  const res = await axios.get(
    `${PROXY_URL}${API_URL}search?keyword=${searchTerm}`
  );
  return res.data.results;
}
