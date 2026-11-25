import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { CourseCard } from "@/components/course-card";
import { COURSES_DATA } from "@/lib/courses-data";
import { Sparkles } from "lucide-react";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("courses");

  return (
    <>
      <TopControls />
      <main className="flex w-3xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-24">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-wider uppercase text-foreground flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#A855F7] inline-block" />
                  {t("title")} ({COURSES_DATA.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {t("subtitle")}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border border-[#A855F7]/30 bg-[#A855F7]/10 text-purple-700 dark:text-purple-300">
                <Sparkles size={12} className="text-[#A855F7]" />
                {t("leadInstructor")}
              </span>
            </div>
          </Reveal>

          {/* List of Interactive Course Cards */}
          <div className="grid gap-6">
            {COURSES_DATA.map((course, i) => (
              <Reveal key={course.id || i} delay={Math.min(0.3, i * 0.06)}>
                <CourseCard course={course} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
