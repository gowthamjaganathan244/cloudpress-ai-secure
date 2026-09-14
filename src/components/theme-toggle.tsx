"use client";

import { savePreference, useThemePreference } from "@/lib/preferences";

export function ThemeToggle() {
  const preference = useThemePreference();
  return (
    <label className="theme-select">
      <span className="sr-only">Colour theme</span>
      <select
        value={preference}
        onChange={(event) => savePreference("theme", event.target.value)}
      >
        <option value="system">System theme</option>
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
      </select>
    </label>
  );
}
