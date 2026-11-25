import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as never)
    ? requested
    : routing.defaultLocale;

  if (!routing.locales.includes(locale as never)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    now: new Date("2026-01-01T00:00:00.000Z"),
  };
});
