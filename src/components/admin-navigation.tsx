import Link from "next/link";
import {
  Activity,
  BookOpenText,
  Bot,
  CircleGauge,
  FileCheck2,
  Files,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { adminHref, adminPages } from "@/lib/admin-navigation";

const icons = [
  CircleGauge,
  BookOpenText,
  Files,
  FileCheck2,
  Bot,
  Users,
  ShieldCheck,
  Activity,
  Settings,
];

export function AdminNavigation({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Admin navigation">
      {["Workspace", "Governance"].map((group) => (
        <div className="nav-group" key={group}>
          <p className="nav-label">{group}</p>
          {adminPages.map((page, index) => {
            if (page.group !== group) return null;
            const Icon = icons[index];
            const href = adminHref(page.slug);
            const active =
              pathname === href ||
              (page.slug !== "" && pathname.startsWith(`${href}/`));
            return (
              <Link
                key={href}
                href={href}
                title={page.label}
                aria-label={page.label}
                aria-current={active ? "page" : undefined}
                className={`nav-item ${active ? "active" : ""}`}
                onClick={onNavigate}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="nav-text">{page.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
