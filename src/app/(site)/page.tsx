import {
  getAboutContent,
  getContactContent,
  getExperienceContent,
  getExpertiseContent,
  getResumeContent,
  getSiteContent,
} from "@/lib/content";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResumeSection } from "@/components/sections/ResumeSection";

export default function HomePage() {
  const site = getSiteContent();
  const about = getAboutContent();
  const expertise = getExpertiseContent();
  const experience = getExperienceContent();
  const resume = getResumeContent();
  const contact = getContactContent();

  return (
    <>
      <HeroSection site={site} resume={resume} />
      <AboutSection title={site.sections.about} content={about} />
      <ExpertiseSection title={site.sections.expertise} content={expertise} />
      <ExperienceSection
        title={site.sections.experience}
        intro={site.experienceIntro}
        content={experience}
      />
      <ResumeSection title={site.sections.resume} content={resume} />
      <ContactSection content={contact} />
    </>
  );
}
