import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchSchedule(date) {
  const res = await axios.get(`${PROXY_URL}${API_URL}schedule?date=${date}`);
  return res.data.results;
}
