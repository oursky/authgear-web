/**
 * Star count for the main Authgear repository, shown in the nav.
 *
 * Fetched once per process (build or dev server) and shared by every page,
 * so a build of a few hundred pages makes one unauthenticated request, well
 * inside GitHub's 60/hour limit. The client script in SiteNav refreshes the
 * number after load and caches it in localStorage, so the build-time value
 * only has to be close.
 */
export const GITHUB_REPO = 'authgear/authgear-server';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;

/** Used when the API is unreachable at build time. Update occasionally. */
const FALLBACK_STARS = 2051;

let pending: Promise<number> | null = null;

export function getGithubStars(): Promise<number> {
  if (!pending) {
    pending = fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'authgear-web' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { stargazers_count?: number }) =>
        typeof data.stargazers_count === 'number' ? data.stargazers_count : FALLBACK_STARS,
      )
      .catch(() => FALLBACK_STARS);
  }
  return pending;
}

/** 2051 -> "2.1k", 999 -> "999", 15034 -> "15k". Matches GitHub's own rounding. */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return (k >= 10 ? Math.round(k).toString() : k.toFixed(1).replace(/\.0$/, '')) + 'k';
}
