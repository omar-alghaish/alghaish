import { redirect } from "next/navigation";

export const instant = false;

export default async function CourseDetailRedirectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  redirect(`/${locale}/courses/${id}`);
}
