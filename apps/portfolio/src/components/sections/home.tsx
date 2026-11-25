import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { HomeNav } from "@/components/home-nav";

export async function Home() {
  const t = await getTranslations("home");

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col justify-center px-6 sm:px-12 md:px-24 text-left rtl:text-right"
    >
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <div className="mb-8 inline-block overflow-hidden shadow-2xl">
            <Image
              src="/profile.png"
              alt="Omar Alghaish"
              width={124}
              height={148}
              priority
              className="block object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {t("greeting")} {t("name")}
          </h1>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-6">
            {t("bio")}
          </p>
        </Reveal>

        <Reveal delay={0.36}>
          <HomeNav />
        </Reveal>
      </div>
    </section>
  );
}
