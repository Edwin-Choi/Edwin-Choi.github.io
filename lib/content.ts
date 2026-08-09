import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

// ---- Types describing the shape of the YAML data ----
export interface Social { label: string; url: string; }
export interface Fact { label: string; value: string; }
export interface SkillGroup { heading: string; items: string[]; }

export interface Job {
  title: string;
  company: string;
  location?: string;
  start: string;   // "<Month> <Year>", e.g. "Jan 2024"
  end: string;     // "<Month> <Year>" or "Present"
  description: string[];
}

export interface Content {
  profile: {
    name: string; brand: string; role: string; location: string;
    tagline_lead: string; tagline_accent: string; intro: string;
    socials: Social[];
  };
  about: { paragraphs: string[]; facts: Fact[]; };
  skills: SkillGroup[];
  contact: { heading: string; body: string; form_action?: string; };
}

export interface ProjectLink { label: string; url: string; }
export interface Project {
  id: string; title: string; summary: string;
  status?: string; tags?: string[]; links?: ProjectLink[]; featured?: boolean;
}

const dataDir = path.join(process.cwd(), "data");

function readYaml<T>(file: string): T {
  const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
  return yaml.load(raw) as T;
}

export function getContent(): Content {
  return readYaml<Content>("content.yaml");
}

export function getExperience(): Job[] {
  const { experience } = readYaml<{ experience: Job[] }>("experience.yaml");
  return experience;
}

// "Jan 2024" + "Present" -> "Jan 2024 to Present"
export function formatTenure(start: string, end: string): string {
  return `${start} to ${end}`;
}

export function getProjects(): Project[] {
  const { projects } = readYaml<{ projects: Project[] }>("projects.yaml");
  // Featured projects first, otherwise preserve authored order.
  return [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );
}
