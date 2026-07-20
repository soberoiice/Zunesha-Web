import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const API_BASE_URL =
  import.meta.env.VITE_DEPLOYMENT === "development"
    ? "http://localhost:3000/api"
    : `${API_URL}`;

export async function fetchMetaData(id) {
  const res = await axios.get(`${PROXY_URL}${API_BASE_URL}?id=${id}`);
  return res.data;
}
// async function getAnimeDetails(id) {
//   const res = await fetch(
//     `https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,synopsis,mean,rank,genres`,
//     {
//       headers: {
//         "X-MAL-CLIENT-ID": CLIENT_ID,
//       },
//     }
//   );

//   return res.json();
// }
