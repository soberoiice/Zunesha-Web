import { Router } from "express";
import { withCache } from "../lib/cache.js";
import {
  fetchRanking,
  fetchSeasonalAnime,
  fetchAnimeDetails,
  searchAnime,
  currentSeason,
  LIST_FIELDS,
  SPOTLIGHT_FIELDS,
  DETAIL_FIELDS,
} from "../lib/malClient.js";
import {
  fetchCharacters,
  fetchRecommendations,
  fetchLatestEpisodes,
  fetchPopularEpisodes,
  fetchSchedule,
  WEEKDAYS,
  fetchEpisodes,
} from "../lib/jikanClient.js";
import {
  fetchBannerByMalId,
  fetchBannersByMalIds,
  fetchNextAiringEpisode,
} from "../lib/anilistClient.js";

const router = Router();

const MIN = 60 * 1000;

// Small helper so every route follows the same
// try/cache/respond/handle-error shape.
function makeListRoute({ path, ttl, load }) {
  router.get(path, async (req, res) => {
    try {
      const cacheKey = `${path}:${JSON.stringify(req.query)}`;
      const data = await withCache(cacheKey, ttl, () => load(req));
      res.json(data);
    } catch (error) {
      console.error(`${path} error:`, error.response?.data || error.message);
      res.status(error.status || 500).json({
        error: error.status ? error.message : `Failed to load ${path}`,
      });
    }
  });
}

// ---------------------------------------------------------------------
// Spotlight / hero banner — a handful of the most popular currently
// airing shows, with the richer field set (synopsis, trailer, banner art)
// a homepage carousel needs.
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/spotlight",
  ttl: 30 * MIN,
  load: async (req) => {
    const limit = Number(req.query.limit) || 8;
    const { year, season } = currentSeason();
    const data = await fetchSeasonalAnime({
      year,
      season,
      sort: "anime_num_list_users",
      limit,
      fields: SPOTLIGHT_FIELDS,
    });
    const anime = data.data.map((entry) => entry.node);

    // MAL has no wide banner image, only a poster (main_picture) — pull
    // banner + cover art from AniList in parallel, keyed by MAL id.
    const banners = await fetchBannersByMalIds(anime.map((a) => a.id));

    return {
      season,
      year,
      results: anime.map((a) => ({ ...a, banner: banners[a.id] })),
    };
  },
});

// ---------------------------------------------------------------------
// Top airing
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/top-airing",
  ttl: 30 * MIN,
  load: async (req) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchRanking({ rankingType: "airing", limit, offset });
    return {
      results: data.data.map((e) => ({ ...e.node, ranking: e.ranking })),
    };
  },
});

// ---------------------------------------------------------------------
// Top upcoming
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/top-upcoming",
  ttl: 60 * MIN,
  load: async (req) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchRanking({ rankingType: "upcoming", limit, offset });
    return {
      results: data.data.map((e) => ({ ...e.node, ranking: e.ranking })),
    };
  },
});

// ---------------------------------------------------------------------
// Top rated (all-time)
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/top-rated",
  ttl: 60 * MIN,
  load: async (req) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchRanking({ rankingType: "all", limit, offset });
    return {
      results: data.data.map((e) => ({ ...e.node, ranking: e.ranking })),
    };
  },
});

// ---------------------------------------------------------------------
// Most popular (by member count)
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/most-popular",
  ttl: 60 * MIN,
  load: async (req) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchRanking({
      rankingType: "bypopularity",
      limit,
      offset,
    });
    return {
      results: data.data.map((e) => ({ ...e.node, ranking: e.ranking })),
    };
  },
});

// ---------------------------------------------------------------------
// Seasonal browse — defaults to the current season, but accepts
// ?year=2026&season=summer for a "browse by season" page.
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/seasonal",
  ttl: 60 * MIN,
  load: async (req) => {
    const fallback = currentSeason();
    const year = Number(req.query.year) || fallback.year;
    const season = req.query.season || fallback.season;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchSeasonalAnime({ year, season, limit, offset });
    return { year, season, results: data.data.map((e) => e.node) };
  },
});

// ---------------------------------------------------------------------
// Latest episodes — recently released episodes across currently airing
// anime. Good for a "Latest Episodes" / "Recently Updated" homepage rail.
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/latest-episodes",
  ttl: 15 * MIN,
  load: async (req) => {
    const page = Number(req.query.page) || 1;
    const data = await fetchLatestEpisodes(page);
    return { results: data.data, pagination: data.pagination };
  },
});

makeListRoute({
  path: "/api/popular-episodes",
  ttl: 30 * MIN,
  load: async (req) => {
    const page = Number(req.query.page) || 1;
    const data = await fetchPopularEpisodes(page);
    return { results: data.data, pagination: data.pagination };
  },
});

// ---------------------------------------------------------------------
// Broadcast schedule for a single day: ?day=monday (omit for "today").
// ---------------------------------------------------------------------
makeListRoute({
  path: "/api/schedule",
  ttl: 60 * MIN,
  load: async (req) => {
    const { day, page, kids, sfw } = req.query;
    const data = await fetchSchedule({
      day,
      page: Number(page) || 1,
      kids: kids === "true",
      sfw: sfw !== "false",
    });
    return {
      day: day || "today",
      results: data.data,
      pagination: data.pagination,
    };
  },
});

// ---------------------------------------------------------------------
// Full week at once, grouped by day — the shape a "coming up this week"
// schedule grid usually wants. Each day is fetched (and cached) in
// parallel; a failure on one day doesn't take down the rest.
// ---------------------------------------------------------------------
router.get("/api/schedule/week", async (req, res) => {
  try {
    const results = await Promise.all(
      WEEKDAYS.map((day) =>
        withCache(`/api/schedule:${day}`, 60 * MIN, () =>
          fetchSchedule({ day }),
        ),
      ),
    );
    const week = Object.fromEntries(
      WEEKDAYS.map((day, i) => [day, results[i].data]),
    );
    res.json({ week });
  } catch (error) {
    console.error(
      "schedule/week error:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to load weekly schedule" });
  }
});

makeListRoute({
  path: "/api/search",
  ttl: 10 * MIN,
  load: async (req) => {
    const { q } = req.query;
    if (!q)
      throw Object.assign(new Error("Missing search query"), { status: 400 });
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const data = await searchAnime({ q, limit, offset });
    return { results: data.data.map((e) => e.node) };
  },
});

// ---------------------------------------------------------------------
// Single anime detail (kept as ?id= to match your original API shape)
// ---------------------------------------------------------------------
router.get("/api/meta", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });

    const data = await withCache(`/api/meta:${id}`, 30 * MIN, () =>
      fetchAnimeDetails(id, DETAIL_FIELDS),
    );
    res.json(data);
  } catch (error) {
    console.error("meta error:", error.response?.data || error.message);
    res.status(500).json({ error: "MAL request failed" });
  }
});

// Back-compat alias for your original /api/top route (all-time ranking).
router.get("/api/top", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const data = await withCache(`/api/top:${limit}`, 60 * MIN, () =>
      fetchRanking({ rankingType: "all", limit, fields: LIST_FIELDS }),
    );
    res.json(data);
  } catch (error) {
    console.error("top error:", error.response?.data || error.message);
    res.status(500).json({ error: "MAL request failed" });
  }
});

// ---------------------------------------------------------------------
// Banner art (AniList, looked up by MAL id) — for a detail page hero,
// or anywhere else you want wide banner art instead of just a poster.
// ---------------------------------------------------------------------
router.get("/api/banner", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });

    const data = await withCache(`/api/banner:${id}`, 6 * 60 * MIN, () =>
      fetchBannerByMalId(id),
    );
    if (!data)
      return res.status(404).json({ error: "No banner found for this anime" });
    res.json(data);
  } catch (error) {
    console.error("banner error:", error.response?.data || error.message);
    res.status(500).json({ error: "AniList request failed" });
  }
});

// ---------------------------------------------------------------------
// Next episode countdown for a single anime, e.g. "Episode 8 airs in
// 3 days" on a detail page. Only returns data for currently airing shows.
// ---------------------------------------------------------------------
router.get("/api/next-episode", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });

    const data = await withCache(`/api/next-episode:${id}`, 15 * MIN, () =>
      fetchNextAiringEpisode(id),
    );
    if (!data)
      return res.status(404).json({ error: "No upcoming episode found" });
    res.json(data);
  } catch (error) {
    console.error("next-episode error:", error.response?.data || error.message);
    res.status(500).json({ error: "AniList request failed" });
  }
});

// ---------------------------------------------------------------------
// Characters (Jikan) — unchanged behavior from your original route
// ---------------------------------------------------------------------
router.get("/api/characters", async (req, res) => {
  try {
    const { id, offset = 0 } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });

    const data = await withCache(
      `/api/characters:${id}:${offset}`,
      60 * MIN,
      () => fetchCharacters(id, offset),
    );
    res.json(data);
  } catch (error) {
    console.error("characters error:", error.response?.data || error.message);
    res.status(500).json({ error: "Jikan request failed" });
  }
});

router.get("/api/episodes", async (req, res) => {
  try {
    const { id, page } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });
    // if (!page) return res.status(400).json({ error: "Missing page parameter" });

    const data = await withCache(`/api/episodes:${id}:${page}`, 60 * MIN, () =>
      fetchEpisodes(id, page),
    );
    res.json(data);
  } catch (error) {
    console.error("episodes error:", error.response?.data || error.message);
    res.status(500).json({ error: "Jikan request failed" });
  }
});

// ---------------------------------------------------------------------
// Recommendations (Jikan) — nice for a "you might also like" section
// on a title's detail page.
// ---------------------------------------------------------------------
router.get("/api/recommendations", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing anime ID" });

    const data = await withCache(`/api/recommendations:${id}`, 60 * MIN, () =>
      fetchRecommendations(id),
    );
    res.json(data);
  } catch (error) {
    console.error(
      "recommendations error:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Jikan request failed" });
  }
});

export default router;
