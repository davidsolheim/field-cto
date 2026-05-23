import type { ContactContent } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  content: ContactContent;
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <Section id="contact">
      <ContactForm content={content} />
    </Section>
  );
}
