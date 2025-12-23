import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchAnime(searchTerm, page) {
  const encodedTerm = encodeURIComponent(searchTerm);
  const res = await axios.get(
    `${API_URL}search?keyword=${encodedTerm}&page=${page}`
  );
  return res.data.results;
}
