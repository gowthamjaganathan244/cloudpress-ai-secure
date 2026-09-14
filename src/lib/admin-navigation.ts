export const adminPages = [
  {
    slug: "",
    label: "Overview",
    group: "Workspace",
    description: "A preview of content operations using fictional demo data.",
  },
  {
    slug: "articles",
    label: "Articles",
    group: "Workspace",
    description:
      "Article creation and editing are planned for Milestones 4 and 5.",
  },
  {
    slug: "documents",
    label: "Documents",
    group: "Workspace",
    description: "Document and media management is planned for Milestone 6.",
  },
  {
    slug: "approvals",
    label: "Approvals",
    group: "Workspace",
    description: "Review and publishing workflows are planned for Milestone 7.",
  },
  {
    slug: "knowledge",
    label: "Knowledge",
    group: "Workspace",
    description:
      "Knowledge sources and retrieval administration are planned for Milestones 8 and 9.",
  },
  {
    slug: "users",
    label: "Users & roles",
    group: "Governance",
    description:
      "Identity and permission administration is planned for Milestone 10. Navigation visibility is not access control.",
  },
  {
    slug: "security",
    label: "Security",
    group: "Governance",
    description:
      "Security reporting is planned for Milestone 11. No security controls are connected.",
  },
  {
    slug: "audit-log",
    label: "Audit log",
    group: "Governance",
    description:
      "Audit events and investigation tools are planned for Milestone 11.",
  },
  {
    slug: "settings",
    label: "Settings",
    group: "Governance",
    description:
      "Platform configuration is planned. Use the header theme selector to change this browser’s appearance.",
  },
] as const;

export function adminHref(slug: string) {
  return slug ? `/admin/${slug}` : "/admin";
}
