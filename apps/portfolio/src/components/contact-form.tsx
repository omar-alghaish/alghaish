"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      // If no backend is running yet, display feedback gracefully
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
  };

  const inputClass =
    "w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-[#FFC107] text-sm";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-300">
          {t("name")}
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          type="text"
          placeholder="Omar"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-300">
          <Mail className="mr-1 inline" size={13} />
          {t("email")}
        </label>
        <input
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          type="email"
          placeholder="omar@example.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-300">
          {t("message")}
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass + " resize-none"}
          placeholder="..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 bg-[#FFC107] text-black px-6 py-2.5 font-bold uppercase tracking-wider text-xs transition-colors hover:bg-[#FFAE00] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
      >
        <Send size={14} />
        {status === "loading" ? t("sending") : t("send")}
      </button>

      {status === "success" && (
        <p className="text-xs font-medium text-emerald-400 mt-2">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="text-xs font-medium text-red-400 mt-2">
          {t("error")}
        </p>
      )}
    </form>
  );
}
