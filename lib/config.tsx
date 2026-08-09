// ============================================================
//  CENTRAL CONFIG — one import surface for the whole site.
//
//  - themes:   light + dark colour tokens for the blueprint theme.
//              Edit a value and the site restyles. globals.css
//              consumes these as CSS variables (var(--bg), etc.).
//  - fonts:    typeface tokens (shared across both themes).
//  - content / projects / experience: the site text, still sourced
//              from data/*.yaml and re-exported here so components
//              import everything from one place.
// ============================================================

import { getContent, getProjects, getExperience, formatTenure } from "@/lib/content";

// ---- Typography (same in both themes) ----
export const fonts = {
  display: '"Fraunces", Georgia, "Times New Roman", serif',
  sans: '"IBM Plex Sans", -apple-system, "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
};

// ---- Colour tokens ----
// light = architect's drafting paper (graphite on white, blue accent)
// dark  = classic blueprint (pale ink on deep navy, cyan accent)
export const themes = {
  light: {
    bg: "#f3f5f9",
    panel: "#ffffff",
    ink: "#151f2d",
    muted: "#586a80",
    faint: "#93a2b5",
    line: "#d2dbe6",
    grid: "rgba(30,86,200,0.06)",
    "grid-strong": "rgba(30,86,200,0.12)",
    accent: "#1e56c8",
    "accent-ink": "#12409e",
    "accent-soft": "rgba(30,86,200,0.10)",
    shadow: "rgba(21,45,95,0.10)",
  },
  dark: {
    bg: "#081019",
    panel: "#0d1a2a",
    ink: "#d6e6f7",
    muted: "#879ebc",
    faint: "#566d8c",
    line: "#1d2f47",
    grid: "rgba(94,166,255,0.07)",
    "grid-strong": "rgba(94,166,255,0.16)",
    accent: "#5aa8ff",
    "accent-ink": "#9fcbff",
    "accent-soft": "rgba(90,168,255,0.14)",
    shadow: "rgba(0,0,0,0.5)",
  },
};

const toVars = (t: Record<string, string>) =>
  Object.entries(t)
    .map(([k, v]) => `--${k}:${v};`)
    .join("");

// Default light; dark via manual toggle OR system preference (unless
// the visitor has explicitly forced light). Manual choice wins both ways.
const themeCss = [
  `:root{${toVars(themes.light)}--display:${fonts.display};--sans:${fonts.sans};--mono:${fonts.mono};}`,
  `:root[data-theme="dark"]{${toVars(themes.dark)}}`,
  `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${toVars(themes.dark)}}}`,
].join("");

// Runs before first paint to stop a light/dark flash on load.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

// Injects the theme tokens into :root. Drop <ThemeStyle /> in the head.
export function ThemeStyle() {
  return <style dangerouslySetInnerHTML={{ __html: themeCss }} />;
}

// ---- Content (source of truth: data/*.yaml) ----
export const content = getContent();
export const projects = getProjects();
export const experience = getExperience();

export { formatTenure };
