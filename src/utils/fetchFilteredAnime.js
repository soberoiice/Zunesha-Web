import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function fetchFilterdAnime(searchTerm, page, filters) {
  const encodedTerm = encodeURIComponent(searchTerm);
  console.log(filters);
  const params = {
    type: filters.type.value,
    status: filters.status.value,
    rated: filters.rating.value,
    page: page,
    keyword: encodedTerm,
    genre: filters.genre.value.join(", "),
  };
  console.log('filtered params: ', params)
  const res = await axios.get(`${API_URL}filter`, { params });
  return res.data.results;
}
