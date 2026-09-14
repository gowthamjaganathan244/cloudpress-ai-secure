"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  LockKeyhole,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdminNavigation } from "@/components/admin-navigation";
import { AccountDropdown } from "@/components/account-dropdown";
import { PageFinder } from "@/components/page-finder";
import { Modal } from "@/components/ui/modal";
import { adminHref, adminPages } from "@/lib/admin-navigation";
import { savePreference, useSidebarCollapsed } from "@/lib/preferences";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const collapsed = useSidebarCollapsed();
  const [overlay, setOverlay] = useState<"navigation" | "finder" | null>(null);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const current = adminPages.find((page) => adminHref(page.slug) === pathname);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        // Do not replace an open dialog: preserve its focus restoration target.
        if (document.querySelector("dialog[open]")) return;
        setOverlay("finder");
      }
    };
    const wide = matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (wide.matches)
        setOverlay((value) => (value === "navigation" ? null : value));
    };
    window.addEventListener("keydown", shortcut);
    wide.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", shortcut);
      wide.removeEventListener("change", resize);
    };
  }, []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className="sidebar desktop-sidebar" aria-label="Admin sidebar">
        <Link
          href="/admin"
          className="brand"
          aria-label="CloudPress admin overview"
        >
          <span className="brand-mark">
            <LockKeyhole size={20} aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>CloudPress</strong>
            <small>Admin workspace</small>
          </span>
        </Link>
        <AdminNavigation pathname={pathname} />
        <div className="sidebar-footer">
          <p className="portal-note">
            Admin preview
            <br />
            <span>Employee and public portals are planned.</span>
          </p>
          <button
            type="button"
            className="collapse-button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={() =>
              savePreference("sidebar", collapsed ? "expanded" : "collapsed")
            }
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
            <span className="nav-text">Collapse sidebar</span>
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label="Open admin navigation"
            aria-haspopup="dialog"
            aria-expanded={overlay === "navigation"}
            onClick={() => setOverlay("navigation")}
          >
            <Menu size={20} />
          </button>
          <button
            className="search-box"
            type="button"
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+k Meta+k"
            onClick={() => setOverlay("finder")}
          >
            <Search size={18} aria-hidden="true" />
            <span>Find a page</span>
            <kbd>Ctrl / ⌘ K</kbd>
          </button>
          <div className="topbar-actions">
            <ThemeToggle />
            <AccountDropdown />
          </div>
        </header>
        <main className="main-content" id="main-content" tabIndex={-1}>
          <div className="page-container">
            <nav aria-label="Breadcrumb" className="breadcrumbs">
              <ol>
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
                <li aria-current="page">
                  {current?.label ?? "Page not found"}
                </li>
              </ol>
            </nav>
            {children}
          </div>
        </main>
      </div>
      {overlay === "finder" && <PageFinder onClose={closeOverlay} />}
      {overlay === "navigation" && (
        <Modal
          title="Admin navigation"
          id="mobile-navigation-title"
          className="navigation-dialog"
          onClose={closeOverlay}
        >
          <AdminNavigation pathname={pathname} onNavigate={closeOverlay} />
          <p className="portal-note">
            Admin preview. Employee and public portals are planned.
          </p>
        </Modal>
      )}
    </div>
  );
}
