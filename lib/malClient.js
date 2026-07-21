import axios from "axios";

const mal = axios.create({
  baseURL: "https://api.myanimelist.net/v2",
  timeout: 10000,
});

// Read the client ID fresh on every request rather than baking it into a
// header at module-load time. This avoids a subtle ESM footgun: if this
// module is ever imported before dotenv has run (e.g. via a route file
// pulled in earlier than the env loader), a header set once at import time
// would be permanently stuck as "undefined" for the life of the process.
mal.interceptors.request.use((config) => {
  config.headers["X-MAL-CLIENT-ID"] = process.env.VITE_MAL_CLIENT_ID;
  return config;
});

// Fields used for list-style sections (cards/carousels). Kept lighter than
// the full detail fetch so list endpoints stay fast.
export const LIST_FIELDS = [
  "id",
  "title",
  "main_picture",
  "alternative_titles",
  "start_date",
  "mean",
  "rank",
  "popularity",
  "num_list_users",
  "media_type",
  "status",
  "genres",
  "num_episodes",
  "start_season",
  "broadcast",
  "source",
  "studios",
].join(",");

// Fuller field set for the hero/spotlight banner, which usually wants a
// synopsis, trailer, and background art in addition to the list fields.
export const SPOTLIGHT_FIELDS = [
  LIST_FIELDS,
  "synopsis",
  "background",
  "trailer",
  "pictures",
].join(",");

// Fields for a single anime's full detail page.
export const DETAIL_FIELDS = [
  "id,title,main_picture,episodes,alternative_titles,start_date,end_date",
  "synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw",
  "created_at,updated_at,media_type,status,genres,my_list_status,num_episodes",
  "start_season,broadcast,source,average_episode_duration,rating,pictures",
  "background,related_anime,related_manga,recommendations,studios,statistics",
  "videos,trailer",
].join(",");

/**
 * Ranked anime lists: ranking_type is one of
 * all | airing | upcoming | tv | ova | movie | special | bypopularity | favorite
 */
export async function fetchRanking({
  rankingType,
  limit = 10,
  offset = 0,
  fields = LIST_FIELDS,
}) {
  const { data } = await mal.get("/anime/ranking", {
    params: { ranking_type: rankingType, limit, offset, fields },
  });
  return data;
}

/**
 * Seasonal anime, e.g. season="summer", year=2026.
 * sort can be "anime_score" or "anime_num_list_users".
 */
export async function fetchSeasonalAnime({
  year,
  season,
  sort = "anime_num_list_users",
  limit = 20,
  offset = 0,
  fields = LIST_FIELDS,
}) {
  const { data } = await mal.get(`/anime/season/${year}/${season}`, {
    params: { sort, limit, offset, fields },
  });
  return data;
}

/**
 * Full detail for a single anime by MAL id.
 */
export async function fetchAnimeDetails(id, fields = DETAIL_FIELDS) {
  const { data } = await mal.get(`/anime/${id}`, { params: { fields } });
  return data;
}

/**
 * Free-text search, used for a search bar / "find anime" box.
 */
export async function searchAnime({
  q,
  limit = 10,
  offset = 0,
  fields = LIST_FIELDS,
}) {
  const { data } = await mal.get("/anime", {
    params: { q, limit, offset, fields },
  });
  return data;
}

export function currentSeason(date = new Date()) {
  const month = date.getMonth() + 1; // 1-12
  const year = date.getFullYear();
  let season;
  if (month >= 1 && month <= 3) season = "winter";
  else if (month >= 4 && month <= 6) season = "spring";
  else if (month >= 7 && month <= 9) season = "summer";
  else season = "fall";
  return { year, season };
}
