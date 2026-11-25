"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/routing";

export interface CourseData {
  id: string;
  titleEn: string;
  titleAr: string;
  provider: string; // Institution / Academy / Community
  roleEn: string;
  roleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  durationEn: string;
  durationAr: string;
  formatEn: string;
  formatAr: string;
  studentsCount?: string;
  status: "active" | "completed" | "upcoming" | string;
  skills: string[];
  syllabusEn: string[];
  syllabusAr: string[];
  audienceEn: string;
  audienceAr: string;
  projectsBuiltEn: string[];
  projectsBuiltAr: string[];
}

interface CourseCardProps {
  course: CourseData;
  locale: string;
}

export function CourseCard({ course, locale }: CourseCardProps) {
  const t = useTranslations("courses");
  const [isOpen, setIsOpen] = useState(false);
  const isAr = locale === "ar";

  const title = isAr ? course.titleAr || course.titleEn : course.titleEn;
  const description = isAr
    ? course.descriptionAr || course.descriptionEn
    : course.descriptionEn;
  const role = isAr ? course.roleAr || course.roleEn : course.roleEn;
  const duration = isAr
    ? course.durationAr || course.durationEn
    : course.durationEn;
  const format = isAr ? course.formatAr || course.formatEn : course.formatEn;
  const syllabus = isAr ? course.syllabusAr : course.syllabusEn;
  const audience = isAr ? course.audienceAr : course.audienceEn;
  const projectsBuilt = isAr
    ? course.projectsBuiltAr
    : course.projectsBuiltEn;

  const isActive = course.status === "active";
  const isUpcoming = course.status === "upcoming";

  return (
    <div className="border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-[#A855F7]/60">
      {/* Top Banner / Instructor Badge */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="p-2.5 border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7] shrink-0">
              <GraduationCap size={22} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                  {role} • {course.provider}
                </span>
                {course.studentsCount && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground border border-border px-2 py-0.5">
                    <Users size={11} />
                    {course.studentsCount}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-wide mt-1">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 border ${
                isActive
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : isUpcoming
                  ? "border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              <CheckCircle2 size={11} />
              {isActive
                ? t("active")
                : isUpcoming
                ? t("upcoming")
                : t("completed")}
            </span>
          </div>
        </div>

        {/* Overview Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Meta Pills: Duration, Format */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5 border border-border px-2.5 py-1 bg-muted/40">
            <Clock size={12} className="text-[#A855F7]" />
            {duration}
          </span>
          <span className="flex items-center gap-1.5 border border-border px-2.5 py-1 bg-muted/40">
            <Sparkles size={12} className="text-[#A855F7]" />
            {format}
          </span>
        </div>

        {/* Key Technologies */}
        {course.skills && course.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono uppercase tracking-wider bg-muted border border-border px-2.5 py-0.5 text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer: Toggle Details Button & Inquire Button */}
        <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#A855F7] hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            {isOpen ? (
              <>
                <ChevronUp size={16} />
                {t("hideDetails")}
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                {t("viewDetails")}
              </>
            )}
          </button>

          <Link
            href="/contact"
            className="flex items-center gap-1.5 border border-[#A855F7] bg-[#A855F7] text-white hover:bg-purple-700 px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all"
          >
            {t("inquire")}
            <ArrowRight size={13} className="ltr:inline rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Expandable Accordion Drawer */}
      {isOpen && (
        <div className="border-t border-border bg-muted/30 p-5 sm:p-6 space-y-5 animate-in fade-in-50 duration-200">
          {/* Syllabus / Modules */}
          {syllabus && syllabus.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-[#A855F7]" />
                {t("syllabus")}
              </h4>
              <ul className="space-y-2">
                {syllabus.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="font-mono text-[#A855F7] text-xs font-bold mt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects Students Build */}
          {projectsBuilt && projectsBuilt.length > 0 && (
            <div className="pt-3 border-t border-border">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-[#A855F7]" />
                {t("projectsBuilt")}
              </h4>
              <ul className="space-y-1.5">
                {projectsBuilt.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Audience */}
          {audience && (
            <div className="pt-3 border-t border-border">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-foreground mb-1.5">
                {t("audience")}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {audience}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
