import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export type HeroVideo = {
  src: string;
  poster: string;
  label: string;
};

export type SiteContent = {
  name: string;
  title: string;
  headshot: string;
  heroVideo?: HeroVideo;
  headline: string;
  subheadline: string;
  meta: { title: string; description: string; url: string };
  nav: Array<{ label: string; href: string }>;
  ctas: {
    resume: { label: string; href: string };
    conversation: { label: string; href: string };
    experience: { label: string; href: string };
  };
  sections: Record<string, string>;
  experienceIntro: string;
  footer: { copyright: string; tagline: string };
};

export type ContactContent = {
  title: string;
  intro: string;
  supporting: string;
  submitLabel: string;
  submittingLabel: string;
  fields: {
    name: string;
    email: string;
    role: string;
    roleOptional: string;
    rolePlaceholder: string;
    message: string;
    messagePlaceholder: string;
  };
  successMessage: string;
  configErrorMessage: string;
  sendErrorMessage: string;
};

export type ExpertiseItem = { title: string; description: string };

export type ExpertiseContent = {
  intro: string;
  items: ExpertiseItem[];
};

export type ResumeContent = {
  pdfPath: string;
  coverLetterPdfPath?: string;
  downloadLabel: string;
  coverLetterDownloadLabel?: string;
  intro: string;
  highlights: string[];
  tools?: string[];
};

export type ExperienceRole = {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type ExperienceContent = {
  intro: string;
  roles: ExperienceRole[];
};

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
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

export function getContactContent(): ContactContent {
  return readJson<ContactContent>(path.join(contentDir, "contact.json"));
}

export function getExperienceContent(): ExperienceContent {
  return readJson<ExperienceContent>(path.join(contentDir, "experience.json"));
}
