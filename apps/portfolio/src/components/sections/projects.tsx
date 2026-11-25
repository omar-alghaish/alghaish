import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack online store with product catalog, cart, checkout, and admin dashboard.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Task Management App",
    description:
      "A Kanban-style task manager with drag-and-drop, real-time updates, and team collaboration.",
    tags: ["React", "TypeScript", "Tailwind"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Portfolio Website",
    description:
      "This portfolio — multi-language, dark/light mode, animated with GSAP.",
    tags: ["Next.js", "GSAP", "i18n"],
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather app with location search, forecasts, and interactive charts.",
    tags: ["React", "API", "Charts"],
    color: "from-emerald-500 to-teal-500",
  },
];

export async function Projects() {
  const t = await getTranslations("projects");

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1">
              <div
                className={`h-44 bg-gradient-to-br ${p.color} flex items-center justify-center`}
              >
                <span className="text-3xl font-bold text-white/90">
                  {p.title.split(" ").map((w) => w[0]).join("")}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink size={14} />
                    {t("viewLive")}
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github size={14} />
                    {t("viewCode")}
                  </a>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
