import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";

const skills = [
  { name: "JavaScript", level: 85, color: "from-yellow-400 to-amber-500" },
  { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-600" },
  { name: "React / Next.js", level: 82, color: "from-cyan-400 to-blue-500" },
  { name: "Node.js", level: 75, color: "from-green-500 to-emerald-600" },
  { name: "Tailwind CSS", level: 88, color: "from-teal-400 to-cyan-500" },
  { name: "PostgreSQL", level: 70, color: "from-sky-500 to-indigo-600" },
  { name: "Git", level: 80, color: "from-orange-500 to-red-500" },
  { name: "UI/UX Design", level: 72, color: "from-pink-500 to-rose-500" },
];

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
