"use client";

import { useEffect, useState } from "react";

// Small client control that flips :root[data-theme] and remembers the choice.
// Colours are handled entirely in CSS; this only sets the attribute.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const initial =
      attr === "dark" || attr === "light"
        ? attr
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — ignore */
    }
    setTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="tt-mark" aria-hidden="true">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="tt-label">{theme}</span>
    </button>
  );
}
