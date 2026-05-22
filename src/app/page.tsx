import {
  getAboutContent,
  getCaseStudies,
  getExpertiseContent,
  getResumeContent,
  getSiteContent,
} from "@/lib/content";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function HomePage() {
  const site = getSiteContent();
  const about = getAboutContent();
  const expertise = getExpertiseContent();
  const caseStudies = getCaseStudies();
  const resume = getResumeContent();

  return (
    <>
      <HeroSection site={site} resume={resume} />
      <AboutSection title={site.sections.about} content={about} />
      <ExpertiseSection title={site.sections.expertise} content={expertise} />
      <WorkSection title={site.sections.work} caseStudies={caseStudies} />
      <ResumeSection title={site.sections.resume} content={resume} />
      <ContactSection title={site.sections.contact} />
    </>
  );
}
