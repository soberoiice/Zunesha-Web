import axios from "axios";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/meta"
    : "/api/meta";

export async function fetchMetaData(id) {
  const res = await axios.get(`${API_BASE_URL}?id=${id}`);
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
