import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";

export function PageHeading({
  title,
  description,
  eyebrow = "Admin workspace",
  action,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <section className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </section>
  );
}

export function ButtonLink({
  className = "primary-button",
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={className} {...props} />;
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="panel empty-state">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function PageLoading() {
  return (
    <div role="status" aria-live="polite" className="panel empty-state">
      <p>Loading page…</p>
      <div className="loading-line" aria-hidden="true" />
    </div>
  );
}

export function NotFoundState() {
  return (
    <div className="recovery-page">
      <PageHeading
        title="Page not found"
        description="This address does not match an available page."
      />
      <ButtonLink href="/admin">Back to overview</ButtonLink>
    </div>
  );
}
