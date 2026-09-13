"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="empty-state" role="alert"><h1>Unable to load this page</h1><p>Please try again.</p><button className="secondary-button" onClick={reset}>Try again</button></section>;
}
