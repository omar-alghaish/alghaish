import { redirect } from "next/navigation";

export const instant = false;

export default async function CourseRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/courses`);
}
