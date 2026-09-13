"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { sections } from "@/config/navigation";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = sections.find(({ slug }) => pathname === "/admin/" + slug);
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <aside className="sidebar">
      <Link className="brand" href="/admin"><span className="brand-mark"><LockKeyhole size={20} /></span><span><strong>CloudPress</strong><small>Admin workspace</small></span></Link>
      <button className="icon-button menu-button" aria-expanded={open} aria-controls="admin-navigation" onClick={() => setOpen(!open)}><Menu size={20} /><span className="sr-only">Toggle navigation</span></button>
      <nav id="admin-navigation" aria-label="Admin navigation" className={"nav-group " + (open ? "nav-open" : "")}>
        <p className="nav-label">Workspace</p>
        {[{ slug: "", label: "Overview" }, ...sections].map(({ slug, label }) => {
          const href = "/admin" + (slug ? "/" + slug : "");
          return <Link key={href} href={href} className={"nav-item " + (pathname === href ? "active" : "")} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
        })}
      </nav>
      <div className="security-card"><div><strong>Frontend demo</strong><span>Security services not connected</span></div></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><nav aria-label="Breadcrumb"><Link href="/admin">Admin</Link> / {current?.label ?? "Overview"}</nav>
        <div className="topbar-actions"><ThemeToggle /><details className="account-menu"><summary>Demo administrator</summary><p>Preview identity only. Sign-in and roles arrive in a later milestone.</p></details></div>
      </header>
      <main id="main-content" tabIndex={-1} className="main-content"><p className="demo-notice">Demo preview · All metrics and activity are fictional. No live AWS or AI services.</p>{children}</main>
    </div>
  </div>;
}
