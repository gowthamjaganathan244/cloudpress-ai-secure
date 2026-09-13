import Link from "next/link";
import { notFound } from "next/navigation";
import { sections } from "@/config/navigation";
export function generateStaticParams() { return sections.map(({ slug }) => ({ section: slug })); }
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = sections.find((entry) => entry.slug === section);
  if (!item) notFound();
  return <section className="panel empty-state">
    <p className="eyebrow">Planned · Milestone {item.milestone}</p>
    <h1>{item.label}</h1><p>{item.description}</p>
    <p>This route is ready. Its workflow is not implemented yet. No cloud services or permissions are active in this preview.</p>
    <Link className="secondary-button" href="/admin">Return to overview</Link>
  </section>;
}
