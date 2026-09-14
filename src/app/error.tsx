"use client";

import { ButtonLink, PageHeading } from "@/components/ui/page";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="recovery-page">
      <PageHeading
        title="This page could not load"
        description="Try loading the page again, or return to the overview."
      />
      <div className="recovery-actions">
        <button className="primary-button" onClick={() => retry()}>
          Try again
        </button>
        <ButtonLink href="/admin" className="secondary-button">
          Back to overview
        </ButtonLink>
      </div>
    </div>
  );
}
