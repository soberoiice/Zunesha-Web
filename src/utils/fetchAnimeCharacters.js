import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  import.meta.env.VITE_DEPLOYMENT === "development"
    ? "http://localhost:3000/api/characters"
    : `${API_URL}/api/characters`;

export async function fetchAnimeCharacters(id) {
  const res = await axios.get(`${API_BASE_URL}?id=${id}`);
  return res.data;
}
