import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");
const workDir = path.join(contentDir, "work");

export type SiteContent = {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  meta: { title: string; description: string; url: string };
  nav: Array<{ label: string; href: string }>;
  ctas: {
    resume: { label: string; href: string };
    conversation: { label: string; href: string };
    work: { label: string; href: string };
  };
  sections: Record<string, string>;
  footer: { copyright: string; tagline: string };
};

export type ExpertiseItem = { title: string; description: string };

export type ExpertiseContent = {
  intro: string;
  items: ExpertiseItem[];
};

export type ResumeContent = {
  pdfPath: string;
  downloadLabel: string;
  intro: string;
  highlights: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  order: number;
  body: string;
};

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function parseMarkdownWithFrontmatter(raw: string): {
  data: Record<string, string | number>;
  content: string;
} {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  const end = raw.indexOf("---", 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 3).trim();
  const data: Record<string, string | number> = {};

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: string | number = line.slice(colonIndex + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (!Number.isNaN(Number(value))) {
      value = Number(value);
    }
    data[key] = value;
  }

  return { data, content };
}

export function getSiteContent(): SiteContent {
  return readJson<SiteContent>(path.join(contentDir, "site.json"));
}

export function getAboutContent(): string {
  return fs.readFileSync(path.join(contentDir, "about.md"), "utf8").trim();
}

export function getExpertiseContent(): ExpertiseContent {
  return readJson<ExpertiseContent>(path.join(contentDir, "expertise.json"));
}

export function getResumeContent(): ResumeContent {
  return readJson<ResumeContent>(path.join(contentDir, "resume.json"));
}

export function getCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(workDir).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(workDir, file), "utf8");
      const { data, content } = parseMarkdownWithFrontmatter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        tagline: String(data.tagline ?? ""),
        order: Number(data.order ?? 0),
        body: content,
      };
    })
    .sort((a, b) => a.order - b.order);
}
