import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { getGitHubUser } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { Github, Twitter, Globe, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const instant = false;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const user = await getGitHubUser();

  return (
    <>
      <TopControls />
      <main className="flex w-3xl m-auto flex-col justify-center px-6 sm:px-12 md:px-24 bg-black text-white">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-10">
          <Reveal>
            <h2 className="text-lg font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FFC107] inline-block" />
              {t("title")}
            </h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              {t("subtitle")}
            </p>
          </Reveal>

          {/* GitHub / Social Links */}
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3 transition-colors hover:border-[#FFC107] hover:bg-white/[0.05]"
              >
                <Github size={20} className="text-[#FFC107] shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">GitHub</div>
                  <div className="text-sm font-semibold text-white">@{user.login}</div>
                </div>
              </a>

              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3 transition-colors hover:border-[#FFC107] hover:bg-white/[0.05]"
                >
                  <Twitter size={20} className="text-[#FFC107] shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-400">Twitter / X</div>
                    <div className="text-sm font-semibold text-white">@{user.twitter_username}</div>
                  </div>
                </a>
              )}

              {user.blog && (
                <a
                  href={`https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3 transition-colors hover:border-[#FFC107] hover:bg-white/[0.05]"
                >
                  <Globe size={20} className="text-[#FFC107] shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-400">Website</div>
                    <div className="text-sm font-semibold text-white">{user.blog}</div>
                  </div>
                </a>
              )}

              {user.location && (
                <div className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3">
                  <MapPin size={20} className="text-[#FFC107] shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-400">Location</div>
                    <div className="text-sm font-semibold text-white">{user.location}</div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Working message form */}
          <Reveal delay={0.2}>
            <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
