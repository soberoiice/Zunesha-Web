import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchCurrentEpisodeInfo(id, ep) {
  const targetUrl = `${API_URL}watch/${id}?ep=${ep}`;
  const encodedUrl = encodeURIComponent(targetUrl);
  const res = await axios.get(`${PROXY_URL}${encodedUrl}`);
  return res.data;
}
