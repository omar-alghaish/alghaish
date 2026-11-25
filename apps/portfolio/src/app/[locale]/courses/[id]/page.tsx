import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { Reveal } from "@/components/reveal";
import { COURSES_DATA, getCourseById } from "@/lib/courses-data";
import { Link } from "@/i18n/routing";
import {
  GraduationCap,
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Code2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  Check,
  Send,
} from "lucide-react";

export const instant = false;

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of routing.locales) {
    for (const c of COURSES_DATA) {
      params.push({ locale, id: c.id });
    }
  }
  return params;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const course = getCourseById(id);
  if (!course) notFound();

  const t = await getTranslations("courses");
  const isAr = locale === "ar";
  const BackIcon = isAr ? ChevronRight : ChevronLeft;

  const title = isAr ? course.titleAr : course.titleEn;
  const description = isAr ? course.descriptionAr : course.descriptionEn;
  const role = isAr ? course.roleAr : course.roleEn;
  const duration = isAr ? course.durationAr : course.durationEn;
  const format = isAr ? course.formatAr : course.formatEn;
  const level = isAr ? course.levelAr : course.levelEn;
  const audience = isAr ? course.audienceAr : course.audienceEn;
  const syllabus = isAr ? course.syllabusAr : course.syllabusEn;
  const projects = isAr ? course.projectsBuiltAr : course.projectsBuiltEn;
  const prerequisites = isAr ? course.prerequisitesAr : course.prerequisitesEn;
  const highlights = isAr ? course.highlightsAr : course.highlightsEn;

  const isActive = course.status === "active";
  const isUpcoming = course.status === "upcoming";

  return (
    <>
      <TopControls />
      <main className="flex w-4xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-20 py-16">
        {/* Breadcrumb Back Link */}
        <div className="pt-6 pb-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-[#A855F7] transition-colors"
          >
            <BackIcon size={16} />
            {isAr ? "العودة إلى كافة الدورات" : "Back to Courses"}
          </Link>
        </div>

        {/* Hero Header */}
        <header className="pb-8 border-b border-border">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="p-2 border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7]">
                <GraduationCap size={20} />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                {role} • {course.provider}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed mb-6">
              {description}
            </p>

            {/* Meta Summary Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-foreground shadow-sm">
                <Clock size={13} className="text-[#A855F7]" />
                {duration}
              </span>
              <span className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-foreground shadow-sm">
                <Layers size={13} className="text-[#A855F7]" />
                {level}
              </span>
              <span className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-foreground shadow-sm">
                <Sparkles size={13} className="text-[#A855F7]" />
                {format}
              </span>
              {course.studentsCount && (
                <span className="flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-foreground shadow-sm">
                  <Users size={13} className="text-[#A855F7]" />
                  {course.studentsCount}
                </span>
              )}
              <span
                className={`flex items-center gap-1.5 px-3 py-1.5 border font-semibold ${
                  isActive
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : isUpcoming
                    ? "border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    : "border-border bg-muted text-muted-foreground"
                }`}
              >
                <CheckCircle2 size={13} />
                {isActive ? t("active") : isUpcoming ? t("upcoming") : t("completed")}
              </span>
            </div>
          </Reveal>
        </header>

        {/* Course Body Grid */}
        <div className="pt-10 grid gap-10 md:grid-cols-3">
          {/* Main Syllabus and Highlights (2 Columns) */}
          <div className="md:col-span-2 space-y-10">
            {/* Syllabus Modules */}
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-4 bg-[#A855F7] inline-block" />
                  {t("syllabus")}
                </h2>

                <div className="space-y-4">
                  {syllabus.map((mod, idx) => (
                    <div
                      key={idx}
                      className="border border-border bg-card p-5 shadow-sm transition-all hover:border-[#A855F7]/50"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2.5 mb-3">
                        <span className="w-6 h-6 rounded-full bg-[#A855F7]/10 text-[#A855F7] text-xs font-mono flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {mod.title}
                      </h3>

                      <ul className="space-y-2 ltr:pl-8 rtl:pr-8">
                        {mod.topics.map((topic, tidx) => (
                          <li
                            key={tidx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Hands-on Projects Built */}
            <Reveal delay={0.2}>
              <div>
                <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-4 bg-[#00E5FF] inline-block" />
                  {t("projectsBuilt")}
                </h2>

                <div className="grid gap-3">
                  {projects.map((proj, pidx) => (
                    <div
                      key={pidx}
                      className="border border-border bg-card p-4 flex items-start gap-3 shadow-sm"
                    >
                      <Code2 size={18} className="text-[#00E5FF] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
                          {isAr ? `مشروع عملي 0${pidx + 1}` : `Practical Project 0${pidx + 1}`}
                        </div>
                        <div className="text-sm font-semibold text-foreground">{proj}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Course Highlights */}
            {highlights && highlights.length > 0 && (
              <Reveal delay={0.25}>
                <div>
                  <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-4 bg-[#FFC107] inline-block" />
                    {isAr ? "مميزات التدريب العملي" : "Learning Experience & Mentorship"}
                  </h2>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {highlights.map((item, hidx) => (
                      <div
                        key={hidx}
                        className="border border-border bg-card p-3.5 flex items-start gap-2.5 shadow-sm"
                      >
                        <Check size={16} className="text-[#FFC107] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sticky Sidebar (1 Column) */}
          <div className="space-y-6">
            {/* Enrollment / Inquire Card */}
            <div className="border border-border bg-card p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold mb-2">
                <Award size={16} />
                {course.provider}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4">
                {title}
              </h3>

              <div className="space-y-3 pb-6 border-b border-border text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("duration")}:</span>
                  <span className="font-semibold text-foreground font-mono">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("format")}:</span>
                  <span className="font-semibold text-foreground font-mono">{format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("role")}:</span>
                  <span className="font-semibold text-foreground">{role}</span>
                </div>
              </div>

              {/* Technologies Covered */}
              <div className="py-5 border-b border-border">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  {t("topicsCovered")}:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono uppercase tracking-wider bg-muted border border-border px-2 py-0.5 text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Audience & Prerequisites */}
              <div className="py-5 border-b border-border text-xs space-y-3">
                <div>
                  <div className="font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    {t("audience")}:
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{audience}</p>
                </div>

                {prerequisites && prerequisites.length > 0 && (
                  <div>
                    <div className="font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      {isAr ? "المتطلبات المسبقة:" : "Prerequisites:"}
                    </div>
                    <ul className="space-y-1 text-muted-foreground">
                      {prerequisites.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#A855F7]">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 border border-[#A855F7] bg-[#A855F7] text-white hover:bg-purple-700 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
                >
                  <Send size={14} />
                  {t("inquire")}
                </Link>
                <p className="text-[11px] text-center text-muted-foreground mt-2">
                  {isAr
                    ? "تواصل مباشرة للاستفسار عن مواعيد الأفواج القادمة أو ورش العمل الخاصة"
                    : "Reach out directly for upcoming cohort dates or custom team workshops"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
