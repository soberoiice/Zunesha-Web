import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

export async function fetchHomepage() {
  const banner = await axios.get(`${API_BASE_URL}/spotlight`);
  const topAiring = await axios.get(`${API_BASE_URL}/top-airing`);
  const topUpcoming = await axios.get(`${API_BASE_URL}/top-upcoming`);
  const topRated = await axios.get(`${API_BASE_URL}/top-rated`);
  return {
    spotlight: banner.data.results,
    topAiring: topAiring.data.results,
    topUpcoming: topUpcoming.data.results,
    topRated: topRated.data.results,
  };
}
