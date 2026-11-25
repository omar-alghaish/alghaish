import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { getGitHubRepos } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { ExternalLink, Github, Star, Folder } from "lucide-react";

export const instant = false;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const repos = await getGitHubRepos();

  return (
    <>
      <TopControls />
      <main className="flex w-3xl m-auto flex-col justify-center px-6 sm:px-12 md:px-24 bg-black text-white">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-8">
          <Reveal>
            <h2 className="text-lg font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00E5FF] inline-block" />
              {t("title")} ({repos.length})
            </h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Live data synced automatically from GitHub API
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {repos.map((repo, i) => (
              <Reveal key={repo.id} delay={Math.min(0.3, i * 0.04)}>
                <div className="border border-white/10 bg-white/[0.02] p-5 h-full flex flex-col justify-between transition-all hover:border-[#00E5FF]/60 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                        <Folder size={16} className="text-[#00E5FF] shrink-0" />
                        {repo.name}
                      </h3>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-yellow-400 border border-yellow-400/30 px-1.5 py-0.5 font-mono">
                          <Star size={11} className="fill-yellow-400" />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-xs text-gray-300 line-clamp-3 leading-relaxed">
                      {repo.description || "Project on GitHub."}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] uppercase font-mono tracking-wider bg-white/5 border border-white/10 px-1.5 py-0.5 text-gray-400"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    {repo.language && (
                      <span className="text-gray-400 font-mono text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                        {repo.language}
                      </span>
                    )}

                    <div className="flex gap-3 ml-auto">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00E5FF] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <ExternalLink size={12} />
                          {t("viewLive")}
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <Github size={12} />
                        {t("viewCode")}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
