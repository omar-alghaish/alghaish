import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { getGitHubRepos, getGitHubUser } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { Code2, GitFork, Star, BookOpen } from "lucide-react";

export const instant = false;

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("skills");
  const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);

  // Aggregate languages from real live GitHub repos
  const languageCounts: Record<string, number> = {};
  let totalStarred = 0;
  for (const r of repos) {
    totalStarred += r.stargazers_count;
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  }

  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.min(100, Math.round((count / Math.max(1, repos.length)) * 100 * 2.5)),
    }));

  const coreSkills = [
    { name: "TypeScript / JavaScript", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "React / Next.js", level: 88, color: "from-cyan-400 to-blue-600" },
    { name: "Node.js / Express", level: 82, color: "from-emerald-400 to-green-600" },
    { name: "Tailwind CSS", level: 92, color: "from-teal-400 to-cyan-500" },
    { name: "PostgreSQL / Drizzle ORM", level: 78, color: "from-indigo-400 to-purple-600" },
    { name: "Git / GitHub CLI", level: 85, color: "from-amber-400 to-orange-500" },
  ];

  return (
    <>
      <TopControls />
      <main className="flex w-3xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-24 bg-black text-white">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-12">
          {/* GitHub Live Stats */}
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-white/10 bg-white/[0.03] p-4 text-center">
                <BookOpen className="mx-auto mb-2 text-blue-400" size={20} />
                <div className="text-2xl font-bold text-white">{user.public_repos}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Public Repos
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-4 text-center">
                <Star className="mx-auto mb-2 text-yellow-400" size={20} />
                <div className="text-2xl font-bold text-white">{totalStarred}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  GitHub Stars
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-4 text-center">
                <GitFork className="mx-auto mb-2 text-cyan-400" size={20} />
                <div className="text-2xl font-bold text-white">{repos.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Active Projects
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-4 text-center">
                <Code2 className="mx-auto mb-2 text-emerald-400" size={20} />
                <div className="text-2xl font-bold text-white">{user.followers}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Followers
                </div>
              </div>
            </div>
          </Reveal>

          {/* GitHub Top Languages */}
          {sortedLanguages.length > 0 && (
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-lg font-bold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#0066FF] inline-block" />
                  GitHub Repository Languages
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {sortedLanguages.slice(0, 6).map((lang) => (
                    <div
                      key={lang.name}
                      className="border border-white/10 bg-white/[0.02] p-3.5 flex items-center justify-between"
                    >
                      <span className="text-sm font-semibold text-gray-200">
                        {lang.name}
                      </span>
                      <span className="text-xs text-blue-400 font-mono">
                        {lang.count} {lang.count === 1 ? "repo" : "repos"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Core Technologies */}
          <Reveal delay={0.2}>
            <div>
              <h2 className="text-lg font-bold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FFC107] inline-block" />
                {t("title")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {coreSkills.map((s) => (
                  <div
                    key={s.name}
                    className="border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-gray-200">{s.name}</span>
                      <span className="text-gray-400 text-xs font-mono">{s.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${s.color}`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
