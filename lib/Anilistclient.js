import axios from "axios";

const anilist = axios.create({
  baseURL: "https://graphql.anilist.co",
  timeout: 10000,
});

const BANNER_QUERY = `
  query ($malId: Int) {
    Media(idMal: $malId, type: ANIME) {
      id
      idMal
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
    }
  }
`;

const NEXT_EPISODE_QUERY = `
  query ($malId: Int) {
    Media(idMal: $malId, type: ANIME) {
      id
      idMal
      title {
        romaji
        english
      }
      status
      nextAiringEpisode {
        episode
        airingAt
        timeUntilAiring
      }
    }
  }
`;

/**
 * Look up an anime's banner + cover art on AniList using its MAL id.
 * Returns null (rather than throwing) if AniList has no match, so a
 * missing banner never breaks the rest of a page's data.
 */
export async function fetchBannerByMalId(malId) {
  try {
    const { data } = await anilist.post("", {
      query: BANNER_QUERY,
      variables: { malId: Number(malId) },
    });
    const media = data?.data?.Media;
    if (!media) return null;
    return {
      bannerImage: media.bannerImage,
      coverImage: media.coverImage,
    };
  } catch (error) {
    console.error(
      `AniList banner lookup failed for MAL id ${malId}:`,
      error.response?.data || error.message,
    );
    return null;
  }
}

/**
 * Countdown to the next episode of a currently-airing anime, looked up by
 * MAL id. Returns null for anime that aren't currently airing (finished,
 * not yet aired, etc.) since AniList only tracks this for airing shows.
 */
export async function fetchNextAiringEpisode(malId) {
  try {
    const { data } = await anilist.post("", {
      query: NEXT_EPISODE_QUERY,
      variables: { malId: Number(malId) },
    });
    const media = data?.data?.Media;
    if (!media?.nextAiringEpisode) return null;
    return {
      episode: media.nextAiringEpisode.episode,
      airingAt: media.nextAiringEpisode.airingAt, // unix timestamp (seconds)
      timeUntilAiring: media.nextAiringEpisode.timeUntilAiring, // seconds
    };
  } catch (error) {
    console.error(
      `AniList next-episode lookup failed for MAL id ${malId}:`,
      error.response?.data || error.message,
    );
    return null;
  }
}

/**
 * Fetch banners for many MAL ids in parallel. Failures for individual ids
 * resolve to null rather than rejecting the whole batch.
 */
export async function fetchBannersByMalIds(malIds) {
  const results = await Promise.all(malIds.map((id) => fetchBannerByMalId(id)));
  return Object.fromEntries(malIds.map((id, i) => [id, results[i]]));
}
