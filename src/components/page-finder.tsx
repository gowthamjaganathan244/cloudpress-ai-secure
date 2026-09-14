"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { adminHref, adminPages } from "@/lib/admin-navigation";
import { Modal } from "@/components/ui/modal";

export function PageFinder({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = adminPages.filter((page) =>
    `${page.label} ${page.group}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const active = results[selected];
  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    document
      .getElementById(`page-option-${selected}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected, query]);

  function navigate(slug: string) {
    onClose();
    router.push(adminHref(slug));
  }

  return (
    <Modal title="Find a page" id="page-finder-title" onClose={onClose}>
      <p className="dialog-description" id="finder-help">
        Navigate admin pages. Planned pages are marked below.
      </p>
      <input
        ref={input}
        className="finder-input"
        role="combobox"
        aria-label="Find a page"
        aria-describedby="finder-help"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls="page-results"
        aria-activedescendant={active ? `page-option-${selected}` : undefined}
        value={query}
        placeholder="Type a page name…"
        onChange={(event) => {
          setQuery(event.target.value);
          setSelected(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (results.length)
              setSelected(
                (index) =>
                  (index +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    results.length) %
                  results.length,
              );
          }
          if (event.key === "Enter" && active) {
            event.preventDefault();
            navigate(active.slug);
          }
        }}
      />
      <div
        className="finder-results"
        role="listbox"
        aria-label="Admin pages"
        id="page-results"
      >
        {results.map((page, index) => (
          <button
            key={page.slug}
            type="button"
            role="option"
            aria-selected={selected === index}
            id={`page-option-${index}`}
            tabIndex={-1}
            onMouseMove={() => setSelected(index)}
            onClick={() => navigate(page.slug)}
          >
            <span>
              {page.label}
              <small>{page.group}</small>
            </span>
            <span className="planned-badge">
              {page.slug ? "Planned" : "Demo"}
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="finder-hint">
        {results.length
          ? `${results.length} pages · ↑ ↓ to select · Enter to open · Esc to close`
          : "No matching pages. Try another page name."}
      </p>
    </Modal>
  );
}
