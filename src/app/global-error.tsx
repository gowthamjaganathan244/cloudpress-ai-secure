"use client";

import "./globals.css";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="recovery-page">
          <h1>CloudPress could not load</h1>
          <p>Try again, or reload the admin overview.</p>
          <div className="recovery-actions">
            <button className="primary-button" onClick={() => retry()}>
              Try again
            </button>
            {/* A full document load recovers even if the root router failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="secondary-button" href="/admin">
              Reload overview
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
