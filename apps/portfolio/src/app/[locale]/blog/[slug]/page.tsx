import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { Reveal } from "@/components/reveal";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { getGitHubUser } from "@/lib/github";

export const instant = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const user = await getGitHubUser();
  const isAr = locale === "ar";
  const BackIcon = isAr ? ChevronRight : ChevronLeft;

  return (
    <>
      <TopControls />
      <main className="flex w-3xl ma m-auto flex-col justify-center px-6 sm:px-12 md:px-24 py-16 bg-black text-white">
        {/* Back Link */}
        <div className="pt-6 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#FFC107] transition-colors"
          >
            <BackIcon size={16} />
            {t("backToBlog")}
          </Link>
        </div>

        {/* Article Header */}
        <header className="pb-8 border-b border-white/10">
          <Reveal>
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#FFC107]" />
                  {post.date}
                </span>
              )}
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#FFC107]" />
                {post.readingTime} {t("minRead")}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-6">
              {isAr ? post.titleAr : post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-gray-300"
                >
                  <Tag size={11} className="text-[#FFC107]" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Snippet */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <Image
                src={user.avatar_url || "/avatar.png"}
                alt={user.name || "Omar Alghaish"}
                width={40}
                height={40}
                className="rounded-full border border-white/20"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  {isAr ? "عمر الغايش" : "Omar Alghaish"}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Github size={13} />
                  </a>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  Software Engineer • {user.location || "Egypt"}
                </div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Article Body */}
        <article className="pt-8 pb-16">
          <Reveal delay={0.1}>
            <MarkdownContent content={post.content} />
          </Reveal>
        </article>

        {/* Footer Navigation */}
        <footer className="pt-8 pb-16 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC107] hover:underline"
          >
            <BackIcon size={16} />
            {t("backToBlog")}
          </Link>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white font-mono flex items-center gap-1.5"
          >
            <Github size={14} />
            github.com/{user.login}
          </a>
        </footer>
      </main>
    </>
  );
}
