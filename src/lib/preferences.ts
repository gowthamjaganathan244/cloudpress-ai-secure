"use client";

import { useSyncExternalStore } from "react";

const preferenceEvent = "cloudpress-preferences";
export type ThemePreference = "system" | "light" | "dark";

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme =
    preference === "system"
      ? matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
}

function subscribe(listener: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const syncSystem = () => {
    if (document.documentElement.dataset.themePreference === "system")
      applyTheme("system");
    listener();
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key === "cloudpress-theme" || event.key === null) {
      const value = event.newValue;
      applyTheme(value === "dark" || value === "light" ? value : "system");
    }
    if (event.key === "cloudpress-sidebar" || event.key === null)
      document.documentElement.dataset.sidebar =
        event.newValue === "collapsed" ? "collapsed" : "expanded";
    listener();
  };
  window.addEventListener(preferenceEvent, listener);
  window.addEventListener("storage", syncStorage);
  media.addEventListener("change", syncSystem);
  return () => {
    window.removeEventListener(preferenceEvent, listener);
    window.removeEventListener("storage", syncStorage);
    media.removeEventListener("change", syncSystem);
  };
}

export function savePreference(key: "theme" | "sidebar", value: string) {
  if (key === "theme") applyTheme(value as ThemePreference);
  else document.documentElement.dataset.sidebar = value;
  try {
    localStorage.setItem(`cloudpress-${key}`, value);
  } catch {
    /* Preferences remain usable for this session. */
  }
  window.dispatchEvent(new Event(preferenceEvent));
}

export function useThemePreference() {
  return useSyncExternalStore(
    subscribe,
    () =>
      (document.documentElement.dataset.themePreference ??
        "system") as ThemePreference,
    () => "system" as ThemePreference,
  );
}

export function useSidebarCollapsed() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.sidebar === "collapsed",
    () => false,
  );
}
