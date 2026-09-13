import Link from "next/link";
import {
  ArrowRight, BookOpenText, CheckCircle2, Clock3, FileText,
  Plus, ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";

const metrics = [
  { label: "Published content", value: "248", note: "+12 this month", icon: BookOpenText, tone: "blue" },
  { label: "Pending review", value: "8", note: "3 due today", icon: Clock3, tone: "amber" },
  { label: "Knowledge sources", value: "1,284", note: "98.7% indexed", icon: FileText, tone: "violet" },
  { label: "Security posture", value: "96%", note: "+2.4% this week", icon: ShieldCheck, tone: "green" },
];

const workflow = [
  { title: "Remote Work Policy 2027", owner: "Maya Chen", state: "Awaiting review", time: "18 min ago", tone: "amber" },
  { title: "Data Classification Standard", owner: "Alex Morgan", state: "Security review", time: "1 hr ago", tone: "violet" },
  { title: "Employee Onboarding Guide", owner: "Sarah Williams", state: "Ready to publish", time: "3 hrs ago", tone: "green" },
];

export function Dashboard() {
  return (
    <div className="dashboard">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Admin overview · Sample workspace</p>
          <h1>Your workspace at a glance.</h1>
          <p>Here is what needs your attention across the workspace.</p>
        </div>
        <Link className="primary-button" href="/admin/articles"><Plus size={18} /> Articles</Link>
      </section>

      <section aria-label="Workspace metrics" className="metric-grid">
        {metrics.map(({ label, value, note, icon: Icon, tone }) => (
          <article className="metric-card" key={label}>
            <div className={`metric-icon ${tone}`}><Icon size={20} /></div>
            <p>{label}</p><strong>{value}</strong>
            <span><TrendingUp size={14} /> {note}</span>
          </article>
        ))}
      </section>

      <div className="content-grid">
        <section className="panel workflow-panel">
          <div className="panel-heading">
            <div><h2>Approval workflow</h2><p>Content requiring action from your teams</p></div>
            <Link href="/admin/approvals">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="workflow-list">
            {workflow.map((item) => (
              <article className="workflow-row" key={item.title}>
                <div className="document-icon"><FileText size={19} /></div>
                <div className="workflow-copy"><strong>{item.title}</strong><span>{item.owner} · {item.time}</span></div>
                <span className={`status ${item.tone}`}>{item.state}</span>
                <Link aria-label={`View approvals for ${item.title}`} className="row-action" href="/admin/approvals"><ArrowRight size={17} /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-panel">
          <div className="ai-orb"><Sparkles size={23} /></div>
          <span className="ai-label">CloudPress AI</span>
          <h2>Turn trusted knowledge into answers.</h2>
          <p>Ask permission-aware questions across your governed workspace.</p>
          <Link className="secondary-button" href="/admin/ai">Open AI workspace <ArrowRight size={16} /></Link>
          <div className="ai-trust"><CheckCircle2 size={15} /> Guardrails and citations planned</div>
        </section>
      </div>

      <section className="panel activity-panel">
        <div className="panel-heading">
          <div><h2>Recent activity</h2><p>Illustrative events — not connected to a backend</p></div>
          <span className="live-status"><i /> Sample</span>
        </div>
        <div className="activity-row">
          <span className="activity-icon green"><CheckCircle2 size={17} /></span>
          <p><strong>Quarterly Security Brief</strong> was approved and published by Priya Shah</p>
          <time>9 min ago</time>
        </div>
        <div className="activity-row">
          <span className="activity-icon blue"><Sparkles size={17} /></span>
          <p>AI indexing completed for <strong>42 updated documents</strong></p>
          <time>26 min ago</time>
        </div>
      </section>
    </div>
  );
}
