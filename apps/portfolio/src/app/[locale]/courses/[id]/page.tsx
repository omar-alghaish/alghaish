import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { Reveal } from "@/components/reveal";
import { COURSES_DATA, getCourseById } from "@/lib/courses-data";
import { CourseTabs } from "@/components/course-tabs";
import { Link } from "@/i18n/routing";
import {
  GraduationCap,
  Clock,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
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

  const isActive = course.status === "active";
  const isUpcoming = course.status === "upcoming";

  return (
    <>
      <TopControls />
      <main className="flex w-6xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-16 py-16">
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

        {/* Course Body Grid: Main Content Tabs (2 Cols) + Compact Sticky Sidebar (1 Col) */}
        <div className="pt-10 grid gap-10 lg:grid-cols-3 items-start">
          {/* Main Content with Interactive Tabs */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <CourseTabs course={course} locale={locale} />
            </Reveal>
          </div>

          {/* Clean Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-border bg-card p-6 shadow-md lg:sticky lg:top-24">
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("status")}:</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400 font-mono">
                    {isActive ? t("active") : isUpcoming ? t("upcoming") : t("completed")}
                  </span>
                </div>
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
                <p className="text-[11px] text-center text-muted-foreground mt-3 leading-relaxed">
                  {isAr
                    ? "تواصل مباشرة للاستفسار عن مواعيد الأفواج القادمة أو ورش العمل البرمجية للشركات والجامعات"
                    : "Reach out directly for upcoming cohort schedules, syllabus inquiries, or custom engineering workshops"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
