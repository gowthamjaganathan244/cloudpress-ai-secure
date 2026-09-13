import Link from "next/link";
export default function NotFound() {
  return <main className="empty-state"><h1>Page not found</h1><p>This page does not exist.</p><Link href="/admin">Return to admin overview</Link></main>;
}
