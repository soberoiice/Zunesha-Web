import axios from "axios";

const jikan = axios.create({
  baseURL: "https://api.tenrai.org/v1",
  timeout: 10000,
});

// Jikan is an unofficial scraper of MAL, and MAL itself occasionally times
// out on Jikan's end — you'll see this as a 503/504 ("Jikan failed to
// connect to MyAnimeList") or a 429 if Jikan itself is rate-limiting.
// These are transient, so retry a couple times with backoff before
// giving up, instead of failing the whole route on the first hiccup.
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_RETRIES = 5; // 3 often isn't enough during a MAL flake
const BASE_DELAY = 800;

async function getWithRetry(path, params) {
  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { data } = await jikan.get(path, { params });
      return data;
    } catch (error) {
      lastError = error;
      const status = error.response?.status;
      const retryAfter = error.response?.headers?.["retry-after"];
      const isRetryable = RETRYABLE_STATUSES.has(status) || !error.response;
      if (!isRetryable || attempt === MAX_RETRIES) throw error;

      const delay = retryAfter
        ? Number(retryAfter) * 1000
        : BASE_DELAY * 2 ** attempt + Math.random() * 300; // jitter avoids thundering herd
      await sleep(delay);
    }
  }
  throw lastError;
}

/**
 * Character list for an anime, via Jikan (MAL has no official character
 * endpoint on the v2 API).
 */
export async function fetchCharacters(id, offset = 0) {
  return getWithRetry(`/anime/${id}/characters`);
}

/**
 * User recommendations for an anime, via Jikan.
 */
export async function fetchRecommendations(id) {
  return getWithRetry(`/anime/${id}/recommendations`);
}

export async function fetchEpisodes(id, page) {
  return getWithRetry(`/anime/${id}/episodes?page=${page}`);
}

/**
 * Recently released episodes across all currently airing anime — good for
 * a "Latest Episodes" / "Recently Updated" homepage rail. Jikan scrapes
 * this straight from MAL's own "Watch" page.
 */
export async function fetchLatestEpisodes(page = 1) {
  return getWithRetry("/watch/episodes", { page });
}

/**
 * Same as above, but MAL's "Popular" ordering instead of most-recent.
 */
export async function fetchPopularEpisodes(page = 1) {
  return getWithRetry("/watch/episodes/popular", { page });
}

/**
 * Weekly broadcast schedule. `day` is one of monday..sunday, or
 * "unknown" / "other" for shows without a fixed slot. Omit `day` to get
 * Jikan's default (shows airing today).
 */
export async function fetchSchedule({
  day,
  page = 1,
  kids = false,
  sfw = true,
} = {}) {
  const params = { page, kids, sfw };
  if (day) params.filter = day;
  return getWithRetry("/schedules", params);
}

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
