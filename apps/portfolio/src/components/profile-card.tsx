import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { NavLinks } from "@/components/nav-links";
import { getGitHubUser } from "@/lib/github";

export async function ProfileCard({
  showBio = true,
  showNav = true,
}: {
  showBio?: boolean;
  showNav?: boolean;
}) {
  const t = await getTranslations("home");
  const user = await getGitHubUser();

  return (
    <div className="w-full ">
      <Reveal>
        <div className="mb-8 inline-block shadow-2xl">
          <div className="relative overflow-hidden">
            <Image
              src={user.avatar_url || "/avatar.png"}
              alt={user.name || "Omar Alghaish"}
              width={124}
              height={144}
              priority
              className="block object-cover aspect-[124/144]"
            />
            {/* Colorful RGB rainbow strip at the bottom of the photo */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-pink-500 via-amber-400 via-blue-500 to-emerald-400" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3 leading-snug">
          {t("greeting")} {t("name")}
        </h1>
      </Reveal>

      {showBio && (
        <Reveal delay={0.2}>
          <p className="text-gray-400 text-sm leading-6  mb-6">
            {t("bio")}
          </p>
        </Reveal>
      )}

      {showNav && (
        <Reveal delay={0.3}>
          <NavLinks />
        </Reveal>
      )}
    </div>
  );
}
