import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";

export const instant = false;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = getAllPosts();
  const isAr = locale === "ar";

  // Gather unique tags across all posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <>
      <TopControls />
      <main className="flex w-3xl m-auto flex-col justify-center px-6 sm:px-12 md:px-24 py-16 bg-black text-white">
        {/* Blog Header */}
        <div className="pt-8 pb-10 border-b border-white/10">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-5 bg-[#FFC107] inline-block" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#FFC107]">
                {t("title")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              {isAr ? "كتابات وتجارب برمجية" : "Articles & Engineering Notes"}
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </Reveal>

          {/* Tag Chips */}
          {allTags.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-mono border border-[#FFC107] bg-[#FFC107]/10 text-[#FFC107]">
                  {t("all")} ({posts.length})
                </span>
                {allTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono border border-white/10 bg-white/[0.02] text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Posts List */}
        <div className="pt-10 pb-20 space-y-6">
          {posts.length === 0 && (
            <Reveal delay={0.1}>
              <p className="text-gray-500 text-sm py-12 text-center">{t("empty")}</p>
            </Reveal>
          )}

          <div className="grid gap-5">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(0.25, i * 0.06)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative block border border-white/10 bg-white/[0.02] p-6 sm:p-7 transition-all duration-200 hover:border-[#FFC107]/70 hover:bg-white/[0.04]"
                >
                  {/* Top Meta: Date + Reading Time */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-3">
                    {post.date && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar size={13} className="text-[#FFC107]" />
                        {post.date}
                      </span>
                    )}
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Clock size={13} className="text-[#FFC107]" />
                      {post.readingTime} {t("minRead")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-[#FFC107] transition-colors leading-snug">
                      {isAr ? post.titleAr : post.title}
                    </h2>
                    <span className="shrink-0 text-gray-500 group-hover:text-[#FFC107] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-sm text-gray-300 leading-relaxed line-clamp-2">
                    {isAr ? post.excerptAr : post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 border border-white/10 px-2 py-0.5 text-[11px] font-mono text-gray-400"
                      >
                        <Tag size={10} className="text-[#FFC107]" />
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto rtl:mr-auto rtl:ml-0 text-xs font-semibold text-[#FFC107] group-hover:underline flex items-center gap-1">
                      {t("readMore")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
