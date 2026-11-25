export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  twitter_username: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  pushed_at: string;
}

const FALLBACK_USER: GitHubUser = {
  login: "omar-alghaish",
  name: "Omar Alghaish",
  avatar_url: "https://avatars.githubusercontent.com/u/96939501?v=4",
  html_url: "https://github.com/omar-alghaish",
  bio: "A software engineer with basic knowledge of software design, development and testing.",
  blog: "omar-alghaish.web.app",
  location: "Egypt",
  public_repos: 50,
  followers: 10,
  following: 4,
  twitter_username: "AlghaishO",
};

export async function getGitHubUser(): Promise<GitHubUser> {
  try {
    const res = await fetch("https://api.github.com/users/omar-alghaish", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "portfolio-app",
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!res.ok) return FALLBACK_USER;
    const data = await res.json();
    return {
      login: data.login ?? FALLBACK_USER.login,
      name: data.name ?? FALLBACK_USER.name,
      avatar_url: data.avatar_url ?? FALLBACK_USER.avatar_url,
      html_url: data.html_url ?? FALLBACK_USER.html_url,
      bio: data.bio ?? FALLBACK_USER.bio,
      blog: data.blog ?? FALLBACK_USER.blog,
      location: data.location ?? FALLBACK_USER.location,
      public_repos: data.public_repos ?? FALLBACK_USER.public_repos,
      followers: data.followers ?? FALLBACK_USER.followers,
      following: data.following ?? FALLBACK_USER.following,
      twitter_username: data.twitter_username ?? FALLBACK_USER.twitter_username,
    };
  } catch {
    return FALLBACK_USER;
  }
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/omar-alghaish/repos?sort=pushed&per_page=50",
      {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "portfolio-app",
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<Record<string, unknown>>;
    return data
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id as number,
        name: r.name as string,
        description: (r.description as string) || null,
        html_url: r.html_url as string,
        homepage: (r.homepage as string) || null,
        language: (r.language as string) || null,
        stargazers_count: (r.stargazers_count as number) || 0,
        forks_count: (r.forks_count as number) || 0,
        topics: ((r.topics as string[]) || []),
        updated_at: r.updated_at as string,
        pushed_at: r.pushed_at as string,
      }));
  } catch {
    return [];
  }
}
