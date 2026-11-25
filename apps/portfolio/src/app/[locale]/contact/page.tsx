import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { getGitHubUser } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { Github, Twitter } from "lucide-react";
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
      <main className="flex w-3xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-24">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-10">
          <Reveal>
            <h2 className="text-lg font-bold tracking-wider uppercase text-foreground flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FFC107] inline-block" />
              {t("title")}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
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
                className="border border-border bg-card p-4 flex items-center gap-3 transition-colors hover:border-[#FFC107] shadow-sm"
              >
                <Github size={20} className="text-[#FFC107] shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</div>
                  <div className="text-sm font-semibold text-foreground">@{user.login}</div>
                </div>
              </a>

              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border bg-card p-4 flex items-center gap-3 transition-colors hover:border-[#FFC107] shadow-sm"
                >
                  <Twitter size={20} className="text-[#FFC107] shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Twitter / X</div>
                    <div className="text-sm font-semibold text-foreground">@{user.twitter_username}</div>
                  </div>
                </a>
              )}
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={0.2}>
            <div className="border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">
                {t("title")}
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
