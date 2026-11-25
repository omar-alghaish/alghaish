import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { getServerUrl } from "@/lib/server-api";
import {
  GraduationCap,
  ExternalLink,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export const instant = false;

interface CourseItem {
  id: string;
  titleEn: string;
  titleAr: string;
  provider: string;
  descriptionEn: string;
  descriptionAr: string;
  certificateUrl?: string | null;
  courseUrl?: string | null;
  skills: string[];
  status: "completed" | "in-progress" | string;
  issuedAt?: string | null;
  order?: number;
}

const DEFAULT_COURSES: CourseItem[] = [
  {
    id: "cs50",
    titleEn: "CS50: Introduction to Computer Science",
    titleAr: "CS50: مقدمة في علوم الحاسب",
    provider: "Harvard University",
    descriptionEn:
      "Comprehensive computer science foundations covering algorithmic thinking, computational problem solving, memory management, data structures, and web technologies.",
    descriptionAr:
      "أسس علوم الحاسب الشاملة التي تغطي التفكير الخوارزمي، وحل المشكلات الحسابية، وإدارة الذاكرة، وهياكل البيانات، وتطوير الويب.",
    certificateUrl: "https://cs50.harvard.edu/certificates",
    courseUrl: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
    skills: ["C", "Python", "SQL", "Algorithms", "Data Structures"],
    status: "completed",
    issuedAt: "2024",
  },
  {
    id: "meta-frontend",
    titleEn: "Meta Front-End Developer Professional Certificate",
    titleAr: "شهادة مطور الواجهات الأمامية المعتمدة من ميتا",
    provider: "Meta",
    descriptionEn:
      "Rigorous industry specialization covering advanced React, UI architecture, responsive design, testing with Jest, and modern state management patterns.",
    descriptionAr:
      "تخصص معتمد من ميتا يغطي أحدث تقنيات React وهندسة الواجهات والتصميم المتجاوب والاختبارات البرمجية وإدارة الحالة.",
    certificateUrl: "https://coursera.org",
    courseUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "JavaScript (ES6+)", "UI/UX", "Jest", "CSS3 / Tailwind"],
    status: "completed",
    issuedAt: "2024",
  },
  {
    id: "fullstack-open",
    titleEn: "Full Stack Open: Modern Web Development",
    titleAr: "Full Stack Open: تطوير الويب الحديث المتكامل",
    provider: "University of Helsinki",
    descriptionEn:
      "Deep dive into modern single page applications, Node.js and Express backends, RESTful APIs, TypeScript typing, and production CI/CD workflows.",
    descriptionAr:
      "دراسة معمقة لتطبيقات الويب الحديثة، وبناء الخوادم بـ Node.js وExpress، وواجهات REST البرمجية، وTypeScript وتدفقات النشر المستمر.",
    certificateUrl: "https://fullstackopen.com",
    courseUrl: "https://fullstackopen.com/en",
    skills: ["TypeScript", "Node.js", "Express", "REST APIs", "CI/CD"],
    status: "completed",
    issuedAt: "2024",
  },
  {
    id: "web-bootcamp",
    titleEn: "The Complete Web Development Bootcamp",
    titleAr: "المعسكر التدريبي الشامل لتطوير الويب",
    provider: "Udemy",
    descriptionEn:
      "Full-spectrum software engineering curriculum covering modern full-stack development, PostgreSQL database design, API integrations, and authentication.",
    descriptionAr:
      "منهج هندسي شامل لتطوير الويب المتكامل وتصميم قواعد بيانات PostgreSQL وتكامل واجهات البرمجة وأنظمة المصادقة.",
    certificateUrl: "https://udemy.com",
    courseUrl: "https://www.udemy.com",
    skills: ["Full-Stack", "PostgreSQL", "Next.js", "Git / GitHub"],
    status: "completed",
    issuedAt: "2023",
  },
];

async function getCourses(): Promise<CourseItem[]> {
  try {
    const url = getServerUrl("/api/courses");
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch {
    // Fall back gracefully to curated courses
  }
  return DEFAULT_COURSES;
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
  const isAr = locale === "ar";
  const courses = await getCourses();

  return (
    <>
      <TopControls />
      <main className="flex w-3xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-24 bg-black text-white">
        <ProfileCard showBio={false} showNav={false} />

        <div className="mt-12 max-w-4xl space-y-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-wider uppercase text-white flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#A855F7] inline-block" />
                  {t("title")} ({courses.length})
                </h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {t("subtitle")}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border border-[#A855F7]/30 bg-[#A855F7]/10 text-purple-300">
                <Sparkles size={12} className="text-[#A855F7]" />
                Verified
              </span>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {courses.map((c, i) => {
              const title = isAr ? c.titleAr || c.titleEn : c.titleEn;
              const description = isAr
                ? c.descriptionAr || c.descriptionEn
                : c.descriptionEn;
              const isCompleted = c.status === "completed";

              return (
                <Reveal key={c.id || i} delay={Math.min(0.3, i * 0.05)}>
                  <div className="border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-white/[0.04]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="p-2 border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7]">
                          <GraduationCap size={18} />
                        </span>
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                            <Award size={12} />
                            {c.provider}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mt-0.5">
                            {title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {c.issuedAt && (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400 border border-white/10 px-2 py-0.5">
                            <Calendar size={11} />
                            {c.issuedAt}
                          </span>
                        )}
                        <span
                          className={`flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                            isCompleted
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={11} />
                              {t("completed")}
                            </>
                          ) : (
                            <>
                              <Clock size={11} />
                              {t("inProgress")}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {description}
                    </p>

                    {c.skills && c.skills.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">
                          {t("skillsLearned")}:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {c.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-end gap-3 text-xs">
                      {c.courseUrl && (
                        <a
                          href={c.courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-mono text-[11px]"
                        >
                          <ExternalLink size={12} />
                          {t("viewCourse")}
                        </a>
                      )}
                      {c.certificateUrl && (
                        <a
                          href={c.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 border border-[#A855F7]/40 bg-[#A855F7]/10 hover:bg-[#A855F7]/20 text-purple-200 px-3 py-1 font-mono text-[11px] transition-colors"
                        >
                          <Award size={12} className="text-[#A855F7]" />
                          {t("viewCertificate")}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
