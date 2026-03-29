export type GitHubProfileStats = {
  followers: number;
  totalStars: number;
  totalForks: number;
  publicRepos: number;
  contributionImageUrl: string;
  profileUrl: string;
  totalContributions: number;
};

const GITHUB_API_BASE = "https://api.github.com";

function buildHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      Accept: "application/vnd.github+json",
      "User-Agent": "about-open-source-section",
    };
  }

  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "about-open-source-section",
  };
}

export async function getGitHubProfileStats(username: string): Promise<GitHubProfileStats> {
  const headers = buildHeaders();

  const [userResponse, reposResponse, contributionsResponse] = await Promise.all([
    fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&type=owner&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
      next: { revalidate: 3600 },
    }).catch(() => null),
  ]);

  if (!userResponse.ok) {
    throw new Error(`Failed to fetch GitHub user for ${username}`);
  }

  if (!reposResponse.ok) {
    throw new Error(`Failed to fetch GitHub repos for ${username}`);
  }

  let totalContributions = 0;
  if (contributionsResponse && contributionsResponse.ok) {
    try {
      const contributionsData = await contributionsResponse.json();
      totalContributions = contributionsData.totalContributions || 0;
    } catch (e) {
      console.error("Failed to parse contributions data", e);
    }
  }

  const user = (await userResponse.json()) as {
    followers: number;
    public_repos: number;
  };

  const repos = (await reposResponse.json()) as Array<{
    stargazers_count: number;
    forks_count: number;
  }>;

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  return {
    followers: user.followers,
    totalStars,
    totalForks,
    publicRepos: user.public_repos,
    totalContributions,
    contributionImageUrl: `https://ghchart.rshah.org/7c83fd/${username}`,
    profileUrl: `https://github.com/${username}`,
  };
}