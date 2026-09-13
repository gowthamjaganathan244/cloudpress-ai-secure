import {
  Activity, BookOpenText, Bot, ChevronDown, CircleGauge, FileCheck2,
  Files, LockKeyhole, Search, Settings, ShieldCheck, Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { label: "Overview", icon: CircleGauge, active: true },
  { label: "Articles", icon: BookOpenText },
  { label: "Documents", icon: Files },
  { label: "Approvals", icon: FileCheck2, badge: "8" },
  { label: "Knowledge", icon: Bot },
  { label: "Users & roles", icon: Users },
];

const governance = [
  { label: "Security", icon: ShieldCheck },
  { label: "Audit log", icon: Activity },
  { label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><LockKeyhole size={20} /></span>
          <span><strong>CloudPress</strong><small>AI Secure</small></span>
        </div>

        <nav aria-label="Primary navigation" className="nav-group">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ label, icon: Icon, active, badge }) => (
            <a className={`nav-item ${active ? "active" : ""}`} href="#" key={label}>
              <Icon size={18} /><span>{label}</span>
              {badge ? <span className="nav-badge">{badge}</span> : null}
            </a>
          ))}
        </nav>

        <nav aria-label="Governance navigation" className="nav-group governance-nav">
          <p className="nav-label">Governance</p>
          {governance.map(({ label, icon: Icon }) => (
            <a className="nav-item" href="#" key={label}><Icon size={18} /><span>{label}</span></a>
          ))}
        </nav>

        <div className="security-card">
          <ShieldCheck size={19} />
          <div><strong>Security healthy</strong><span>All controls operational</span></div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search workspace</span>
            <input placeholder="Search content, people, or activity…" type="search" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <ThemeToggle />
            <button className="profile-button" type="button">
              <span className="avatar">GJ</span>
              <span className="profile-copy"><strong>Gowtham</strong><small>Administrator</small></span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
