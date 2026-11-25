import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopControls } from "@/components/top-controls";
import { ProfileCard } from "@/components/profile-card";

export const instant = false;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <div className="absolute top-0 w-full h-20 z-50">
        <TopControls />
      </div>
      <main className="flex w-3xl max-w-full m-auto flex-col justify-center px-6 sm:px-12 md:px-24 bg-black text-white">
        <ProfileCard showBio={true} showNav={true} />
      </main>
    </>
  );
}
