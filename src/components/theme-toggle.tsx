"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("cloudpress-theme", nextTheme);
  }

  return (
    <button aria-label="Toggle colour theme" className="icon-button" onClick={toggleTheme} type="button">
      <span className="theme-icon theme-icon-light"><Moon size={18} /></span>
      <span className="theme-icon theme-icon-dark"><Sun size={18} /></span>
    </button>
  );
}
