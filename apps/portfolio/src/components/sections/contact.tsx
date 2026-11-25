"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { Mail, Send } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="mt-12 space-y-5 rounded-2xl border border-border bg-card p-8 shadow-lg"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                type="text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                <Mail className="mr-1 inline" size={14} />
                {t("email")}
              </label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                type="email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/30 disabled:opacity-60"
            >
              <Send size={18} />
              {status === "loading" ? t("sending") : t("send")}
            </button>

            {status === "success" && (
              <p className="text-center text-sm font-medium text-green-500">
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-medium text-red-500">
                {t("error")}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
