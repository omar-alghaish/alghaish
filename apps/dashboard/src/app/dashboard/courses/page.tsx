import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GraduationCap, Users, Clock, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CourseRow {
  id: string;
  titleEn: string;
  titleAr: string;
  provider: string;
  role: string;
  duration: string;
  students: string;
  status: "active" | "upcoming" | "completed";
  skills: string[];
}

const COURSES: CourseRow[] = [
  {
    id: "fullstack-bootcamp",
    titleEn: "Full-Stack Web Development Bootcamp",
    titleAr: "معسكر تطوير الويب المتكامل",
    provider: "Tech Academy & Community",
    role: "Lead Instructor",
    duration: "60 Hours • 10 Weeks",
    students: "120+ Graduates",
    status: "active",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Next.js"],
  },
  {
    id: "javascript-typescript-mastery",
    titleEn: "Advanced JavaScript & TypeScript Architecture",
    titleAr: "احتراف جافاسكريبت وهندسة TypeScript",
    provider: "Developer Workshops",
    role: "Instructor",
    duration: "30 Hours • 5 Weeks",
    students: "85+ Developers",
    status: "upcoming",
    skills: ["TypeScript", "ESNext", "Design Patterns", "Unit Testing"],
  },
  {
    id: "react-nextjs-engineering",
    titleEn: "Modern Frontend Engineering with React & Next.js",
    titleAr: "هندسة الواجهات الحديثة بـ React وNext.js",
    provider: "Tech Mentorship",
    role: "Instructor",
    duration: "45 Hours • 7 Weeks",
    students: "140+ Students",
    status: "active",
    skills: ["Next.js", "React 19", "Server Components", "Tailwind CSS"],
  },
];

export default function DashboardCoursesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Courses</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono"
            >
              <ExternalLink size={13} />
              Public Courses Page
            </a>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Courses Taught</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage the bootcamps, masterclasses, and workshops you instruct.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} />
              Add New Course
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <GraduationCap size={16} className="text-purple-500" />
                Total Courses
              </div>
              <div className="text-3xl font-extrabold mt-2">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 Active, 1 Upcoming</p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Users size={16} className="text-emerald-500" />
                Students Trained
              </div>
              <div className="text-3xl font-extrabold mt-2">345+</div>
              <p className="text-xs text-muted-foreground mt-1">Across 8 Cohorts</p>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Clock size={16} className="text-amber-500" />
                Teaching Hours
              </div>
              <div className="text-3xl font-extrabold mt-2">135+</div>
              <p className="text-xs text-muted-foreground mt-1">Live interactive training</p>
            </div>
          </div>

          {/* Courses Table / Cards */}
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="text-sm font-semibold">Active & Upcoming Courses</h2>
            </div>

            <div className="divide-y divide-border">
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                        {course.role} • {course.provider}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                          course.status === "active"
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold">{course.titleEn}</h3>
                    <div className="text-xs text-muted-foreground font-arabic">
                      {course.titleAr}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {course.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 bg-muted rounded border text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-3 shrink-0 text-xs">
                    <div className="text-muted-foreground font-mono">
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/courses/${course.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                      >
                        Preview Page
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
