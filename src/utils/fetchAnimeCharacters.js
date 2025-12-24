import axios from "axios";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/characters"
    : "/api/characters";

export async function fetchAnimeCharacters(id) {
  const res = await axios.get(`${API_BASE_URL}?id=${id}`);
  return res.data;
}
