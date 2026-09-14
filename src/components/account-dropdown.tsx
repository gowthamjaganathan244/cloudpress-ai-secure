"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return (
    <div
      className="account-dropdown"
      ref={container}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
        if (
          open &&
          ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
        ) {
          event.preventDefault();
          const links = Array.from(
            container.current!.querySelectorAll<HTMLAnchorElement>("a"),
          );
          const index = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? links.length - 1
                : (index + (event.key === "ArrowUp" ? -1 : 1) + links.length) %
                  links.length;
          links[next]?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="profile-button"
        type="button"
        aria-label="Demo account"
        aria-expanded={open}
        aria-controls="demo-account-panel"
        onClick={() => setOpen(!open)}
      >
        <span className="avatar" aria-hidden="true">
          DM
        </span>
        <span className="profile-copy">
          <strong>Demo user</strong>
          <small>Preview account</small>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <section
          id="demo-account-panel"
          className="account-panel"
          aria-label="Demo account details"
        >
          <strong>Demo identity</strong>
          <p>
            This is a local preview. No account is signed in, and no permissions
            are enforced.
          </p>
          <Link href="/admin/settings" onClick={() => setOpen(false)}>
            Settings <span>Planned</span>
          </Link>
          <Link href="/admin/users" onClick={() => setOpen(false)}>
            Users & roles <span>Planned</span>
          </Link>
        </section>
      )}
    </div>
  );
}
