import { notFound } from "next/navigation";
import { adminPages } from "@/lib/admin-navigation";
import { ButtonLink, EmptyState, PageHeading } from "@/components/ui/page";

export function generateStaticParams() {
  return adminPages
    .filter((page) => page.slug)
    .map((page) => ({ section: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/admin/[section]">) {
  const { section } = await params;
  return {
    title:
      adminPages.find((page) => page.slug === section)?.label ??
      "Page not found",
  };
}

export default async function PlannedPage({
  params,
}: PageProps<"/admin/[section]">) {
  const { section } = await params;
  const page = adminPages.find((item) => item.slug === section);
  if (!page) notFound();
  return (
    <>
      <PageHeading
        title={page.label}
        description={page.description}
        eyebrow="Planned feature"
      />
      <EmptyState title="Planned — not available yet">
        <p>
          This page reserves a place in the admin navigation. There are no
          connected services or actions here yet.
        </p>
        <ButtonLink href="/admin">Back to overview</ButtonLink>
      </EmptyState>
    </>
  );
}
