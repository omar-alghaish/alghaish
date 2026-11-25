"use client";

import { useState } from "react";
import {
  BookOpen,
  Code2,
  Sparkles,
  Layers,
  CheckCircle2,
  Check,
  Target,
  ListChecks,
  Cpu,
} from "lucide-react";
import { CourseData } from "@/lib/courses-data";

interface CourseTabsProps {
  course: CourseData;
  locale: string;
}

type TabKey = "syllabus" | "requirements" | "projects" | "highlights";

export function CourseTabs({ course, locale }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("syllabus");
  const isAr = locale === "ar";

  const syllabus = isAr ? course.syllabusAr : course.syllabusEn;
  const projects = isAr ? course.projectsBuiltAr : course.projectsBuiltEn;
  const audience = isAr ? course.audienceAr : course.audienceEn;
  const prerequisites = isAr ? course.prerequisitesAr : course.prerequisitesEn;
  const highlights = isAr ? course.highlightsAr : course.highlightsEn;

  const tabs: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
    {
      key: "syllabus",
      label: isAr ? "المنهج والمحاور التدريبية" : "Curriculum & Syllabus",
      icon: BookOpen,
    },
    {
      key: "requirements",
      label: isAr ? "المفاهيم والمتطلبات والفئة المستهدفة" : "Skills, Audience & Prerequisites",
      icon: Layers,
    },
    {
      key: "projects",
      label: isAr ? "المشاريع العملية" : "Hands-on Projects",
      icon: Code2,
    },
    {
      key: "highlights",
      label: isAr ? "مميزات التدريب" : "Learning Experience",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation Header */}
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-2 -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#A855F7] text-[#A855F7] bg-[#A855F7]/5 font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#A855F7]" : "text-muted-foreground"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Curriculum & Syllabus */}
      {activeTab === "syllabus" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#A855F7] inline-block" />
              {isAr ? "المنهج والوحدات التدريبية" : "Detailed Curriculum & Modules"} ({syllabus.length} {isAr ? "وحدات" : "Modules"})
            </h2>
          </div>

          <div className="space-y-4">
            {syllabus.map((mod, idx) => (
              <div
                key={idx}
                className="border border-border bg-card p-5 shadow-sm transition-all hover:border-[#A855F7]/50"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#A855F7]/10 text-[#A855F7] text-xs font-mono flex items-center justify-center shrink-0 font-bold">
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
      )}

      {/* Tab 2: Skills, Audience & Prerequisites */}
      {activeTab === "requirements" && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          {/* Section 1: Key Skills & Technologies */}
          <div className="border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={18} className="text-[#A855F7]" />
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                {isAr ? "المفاهيم والتقنيات الأساسية:" : "Key Skills & Technologies Covered:"}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border bg-muted/60 text-foreground font-mono text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Section 2: Target Audience */}
          <div className="border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Target size={18} className="text-[#00E5FF]" />
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                {isAr ? "الفئة المستهدفة:" : "Target Audience:"}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {audience}
            </p>
          </div>

          {/* Section 3: Prerequisites */}
          <div className="border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks size={18} className="text-[#FFC107]" />
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                {isAr ? "المتطلبات المسبقة:" : "Prerequisites:"}
              </h3>
            </div>

            <ul className="space-y-2.5">
              {prerequisites.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <span className="text-[#A855F7] font-bold text-base shrink-0 leading-none mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Practical Projects Built */}
      {activeTab === "projects" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#00E5FF] inline-block" />
              {isAr ? "مشاريع عملية ينجزها الطلاب" : "Hands-on Student Projects"} ({projects.length})
            </h2>
          </div>

          <div className="grid gap-4">
            {projects.map((proj, pidx) => (
              <div
                key={pidx}
                className="border border-border bg-card p-5 flex items-start gap-4 shadow-sm transition-all hover:border-[#00E5FF]/60"
              >
                <span className="p-2 border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 mt-0.5">
                  <Code2 size={20} />
                </span>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    {isAr ? `مشروع تخرّج عملي 0${pidx + 1}` : `Production Project 0${pidx + 1}`}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-foreground mb-1">
                    {proj}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {isAr
                      ? "مشروع متكامل يبنيه الطالب تحت الإشراف المباشر مع مراجعة كود فردية تمهيداً لضمه لمعرض أعماله الشخصي."
                      : "Production-scale project built from scratch with architecture code reviews to add directly to the student portfolio."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Learning Experience & Mentorship Highlights */}
      {activeTab === "highlights" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-base font-bold tracking-wider uppercase text-foreground flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FFC107] inline-block" />
              {isAr ? "مميزات التدريب والإرشاد" : "Mentorship & Learning Highlights"}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, hidx) => (
              <div
                key={hidx}
                className="border border-border bg-card p-4 flex items-start gap-3 shadow-sm hover:border-[#FFC107]/50 transition-colors"
              >
                <span className="p-1.5 rounded-full bg-[#FFC107]/10 text-[#FFC107] shrink-0 mt-0.5">
                  <Check size={14} />
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
