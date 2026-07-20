// Simple in-memory cache with per-key TTL.
// MAL's API rate limits are tight, and frontpage sections (spotlight, top
// airing, etc.) barely change minute to minute, so caching each of these
// GET responses is worth far more than it costs.

const store = new Map();

/**
 * Get a cached value if it exists and hasn't expired.
 */
export function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

/**
 * Store a value with a TTL in milliseconds.
 */
export function cacheSet(key, value, ttlMs) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

/**
 * Wrap an async fetcher so its result is cached under `key` for `ttlMs`.
 * Concurrent calls for the same key while a fetch is in flight reuse the
 * same promise instead of firing duplicate upstream requests.
 */
const inFlight = new Map();

export async function withCache(key, ttlMs, fetcher) {
  const cached = cacheGet(key);
  if (cached !== undefined) return cached;

  if (inFlight.has(key)) return inFlight.get(key);

  const promise = (async () => {
    try {
      const value = await fetcher();
      cacheSet(key, value, ttlMs);
      return value;
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);
  return promise;
}
