import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { CourseCard, CourseData } from "@/components/course-card";
import { Sparkles } from "lucide-react";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DEFAULT_TAUGHT_COURSES: CourseData[] = [
  {
    id: "fullstack-bootcamp",
    titleEn: "Full-Stack Web Development Bootcamp",
    titleAr: "معسكر تطوير الويب المتكامل (Full-Stack Bootcamp)",
    provider: "Tech Academy & Community",
    roleEn: "Lead Instructor",
    roleAr: "المحاضر الرئيسي",
    descriptionEn:
      "An intensive, project-driven bootcamp preparing developers for production engineering. Covers end-to-end web architecture from relational database modeling to modern React interfaces and deployment.",
    descriptionAr:
      "معسكر تدريبي مكثف يعتمد على إنجاز المشاريع العملية وتأهيل المتدربين لسوق العمل وهندسة البرمجيات الاحترافية، بدءاً من تصميم قواعد البيانات وحتى واجهات React الحديثة.",
    durationEn: "60 Hours • 10 Weeks",
    durationAr: "60 ساعة تدريبية • 10 أسابيع",
    formatEn: "Live Interactive & Code Reviews",
    formatAr: "تدريب عملي مباشر ومراجعة أكواد",
    studentsCount: "120+ Graduates",
    status: "active",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Next.js", "Tailwind CSS"],
    syllabusEn: [
      "Modern Web Foundations & Semantic HTML5/CSS3 Architecture",
      "JavaScript Deep Dive: Asynchronous Patterns, Event Loop, Closures",
      "Frontend Engineering with React, Custom Hooks, and State Management",
      "Backend Architecture with Node.js, Express, REST APIs, and JWT Auth",
      "Relational Database Design with PostgreSQL & Drizzle ORM",
      "Full-Stack Integration, CI/CD, and Cloud Deployment",
    ],
    syllabusAr: [
      "أساسيات الويب الحديثة وهندسة واجهات HTML5 وCSS3",
      "التعمق في جافاسكريبت: البرمجة غير المتزامنة ومفاهيم Event Loop والإغلاقات",
      "تطوير الواجهات المتقدمة بـ React وإدارة الحالة وCustom Hooks",
      "بناء الخوادم وهندسة الأنظمة الخلفية بـ Node.js وExpress وواجهات REST",
      "تصميم قواعد البيانات العلائقية بـ PostgreSQL وDrizzle ORM",
      "الربط المتكامل، النشر السحابي، وتدفقات CI/CD",
    ],
    audienceEn: "Aspiring software engineers, computer science students, and career switchers wanting industry-grade full-stack skills.",
    audienceAr: "مهندسو البرمجيات المبتدئون وطلاب كليات الحاسب والراغبون في التحول المهني لتطوير الويب بمستويات احترافية.",
    projectsBuiltEn: [
      "Full-featured E-commerce Platform with Stripe checkout",
      "Real-time Collaborative Task Management SaaS",
      "Production-ready RESTful Authentication & Role Management API",
    ],
    projectsBuiltAr: [
      "منصة تجارة إلكترونية متكاملة مع بوابات الدفع الإلكتروني",
      "تطبيق لإدارة المهام التعاونية لحظياً بنظام SaaS",
      "نظام مصادقة وإدارة صلاحيات آمن لمعايير الإنتاج",
    ],
  },
  {
    id: "javascript-typescript-mastery",
    titleEn: "Advanced JavaScript & TypeScript Architecture",
    titleAr: "احتراف جافاسكريبت المتقدمة وهندسة TypeScript",
    provider: "Developer Workshops",
    roleEn: "Instructor",
    roleAr: "المدرب والمحاضر",
    descriptionEn:
      "A specialized masterclass on building scalable, type-safe software. Emphasizes clean code, design patterns, robust typing, and asynchronous reliability.",
    descriptionAr:
      "دورة تخصصية متقدمة تركز على بناء برمجيات آمنة وقابلة للتوسع باستخدام TypeScript وكتابة كود نظيف وتطبيق أنماط التصميم البرمجي.",
    durationEn: "30 Hours • 5 Weeks",
    durationAr: "30 ساعة تدريبية • 5 أسابيع",
    formatEn: "Hands-on Workshops & Exercises",
    formatAr: "ورش تطبيقية وتمارين عملية",
    studentsCount: "85+ Developers",
    status: "upcoming",
    skills: ["TypeScript", "JavaScript ESNext", "Generics", "Design Patterns", "Unit Testing"],
    syllabusEn: [
      "Advanced ESNext Features, Memory Management & Performance",
      "TypeScript Type System: Generics, Conditional Types, Utility Types",
      "Object-Oriented & Functional Programming Paradigms in TypeScript",
      "Software Design Patterns applied to Web Applications",
      "Automated Testing and Code Quality with Vitest and Jest",
    ],
    syllabusAr: [
      "ميزات ESNext المتقدمة وإدارة الذاكرة وتحسين الأداء",
      "نظام الأنواع في TypeScript: الأنواع المعممة (Generics) والشرطية",
      "البرمجة كائنية التوجه والوظيفية في TypeScript",
      "أنماط التصميم البرمجية (Design Patterns) وتطبيقاتها في الويب",
      "الاختبارات الآلية وضمان جودة الكود باستخدام Vitest وJest",
    ],
    audienceEn: "Frontend and backend developers looking to level up their type-safety, code architecture, and engineering confidence.",
    audienceAr: "مطورو الواجهات والخوادم الساعون لرفع كفاءة كتابة الأكواد والاعتماد على TypeScript في المشاريع الكبرى.",
    projectsBuiltEn: [
      "Type-safe State Store & Event Emitter Library",
      "Enterprise Data Validation & Transformation Engine",
    ],
    projectsBuiltAr: [
      "مكتبة مخصصة لإدارة الحالة وإطلاق الأحداث آمنة الأنواع",
      "محرك لمعالجة وتحقق البيانات للمشاريع المؤسسية",
    ],
  },
  {
    id: "react-nextjs-engineering",
    titleEn: "Modern Frontend Engineering with React & Next.js",
    titleAr: "هندسة الواجهات الحديثة بـ React وNext.js",
    provider: "Tech Mentorship",
    roleEn: "Instructor",
    roleAr: "المدرب والمحاضر",
    descriptionEn:
      "Modern client and server web development using Next.js App Router, React Server Components (RSC), Partial Prerendering, and Tailwind CSS v4 styling.",
    descriptionAr:
      "تطوير الواجهات الحديثة ومفاهيم React Server Components، وموجه التطبيقات في Next.js، والتصيير المسبق الجزئي، وتنسيقات Tailwind CSS v4.",
    durationEn: "45 Hours • 7 Weeks",
    durationAr: "45 ساعة تدريبية • 7 أسابيع",
    formatEn: "Interactive Labs & Code Clinics",
    formatAr: "مختبرات برمجية وعيادات كود",
    studentsCount: "140+ Students",
    status: "active",
    skills: ["Next.js", "React 19", "Server Components", "Tailwind CSS v4", "SEO & Core Web Vitals"],
    syllabusEn: [
      "React Foundations, Reconciliation, and Hooks Architecture",
      "Next.js App Router: Layouts, Server Components, Server Actions",
      "Modern Styling Systems: Tailwind CSS v4 and Responsive UI",
      "Internationalization (i18n), SEO Best Practices, and Web Vitals",
      "Deployment, Edge/Serverless Computing, and Production Monitoring",
    ],
    syllabusAr: [
      "أسس React المعمارية وهندسة الخطافات (Hooks)",
      "موجه التطبيقات في Next.js: الصفحات والمكونات الخادمة والـ Server Actions",
      "أنظمة التصميم الحديثة: Tailwind CSS v4 وتنسيق الشاشات المختلفة",
      "تعدد اللغات (i18n)، تحسين محركات البحث SEO، وسرعة المواقع",
      "النشر على الحوسبة السحابية ومراقبة الأداء في الإنتاج",
    ],
    audienceEn: "Web developers wanting to master Next.js and build lightning-fast web applications.",
    audienceAr: "مطورو الويب الراغبون في احتراف Next.js وبناء تطبيقات فائقة السرعة وعالية الأداء.",
    projectsBuiltEn: [
      "High-Performance Multilingual Tech Blog & News Platform",
      "SaaS Analytics Dashboard with Interactive Charts",
    ],
    projectsBuiltAr: [
      "مدونة تقنية متعددة اللغات فائقة السرعة مع تحسين محركات البحث",
      "لوحة تحكم إحصائية تفاعلية بنظام SaaS",
    ],
  },
];

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
                  {t("title")} ({DEFAULT_TAUGHT_COURSES.length})
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

          {/* List of Interactive Expandable Course Cards */}
          <div className="grid gap-6">
            {DEFAULT_TAUGHT_COURSES.map((course, i) => (
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
